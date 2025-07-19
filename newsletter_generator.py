import argparse
import datetime as dt
import os
import re
import textwrap
from typing import List, Dict

import feedparser
from dateutil import tz

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# You can customise or extend these feeds to any other sources your audience
# cares about.  Google News RSS feeds offer simple keyword-based tracking that
# does not require API keys.
FEEDS: Dict[str, str] = {
    "Accounting": "https://news.google.com/rss/search?q=accounting+OR+accountancy&hl=en-US&gl=US&ceid=US:en",
    "Audit": "https://news.google.com/rss/search?q=audit+industry&hl=en-US&gl=US&ceid=US:en",
    "Tax": "https://news.google.com/rss/search?q=tax+regulations+OR+tax+legislation&hl=en-US&gl=US&ceid=US:en",
}

DEFAULT_OUTPUT_DIR = "newsletters"
SUMMARY_SENTENCES = 2  # number of sentences to keep from the RSS summary

# ---------------------------------------------------------------------------
# Utility helpers
# ---------------------------------------------------------------------------

def first_sentences(text: str, max_sentences: int = SUMMARY_SENTENCES) -> str:
    """Return the first *max_sentences* sentences from *text*.

    Sentences are detected by a very naive period split; this keeps dependencies
    light.  For production use consider spaCy or NLTK.
    """
    # Remove newlines for easier splitting
    clean = re.sub(r"\s+", " ", text).strip()
    parts = re.split(r"(?<=[.!?])\s+", clean)
    return " ".join(parts[:max_sentences])


def parse_month(value: str) -> dt.datetime:
    """Parse a YYYY-MM string into a timezone-aware start-of-month datetime."""
    try:
        year, month = map(int, value.split("-"))
        return dt.datetime(year, month, 1, tzinfo=tz.UTC)
    except Exception as exc:
        raise argparse.ArgumentTypeError(
            "Month must be in YYYY-MM format (e.g. 2024-07)") from exc


def month_range(month_start: dt.datetime) -> (dt.datetime, dt.datetime):
    """Return datetime tuple (start, end) covering the calendar month."""
    if month_start.tzinfo is None:
        month_start = month_start.replace(tzinfo=tz.UTC)
    # compute next month start then subtract microsecond
    if month_start.month == 12:
        next_month = month_start.replace(year=month_start.year + 1, month=1)
    else:
        next_month = month_start.replace(month=month_start.month + 1)
    return month_start, next_month - dt.timedelta(seconds=1)


def within_range(entry_time_struct, start: dt.datetime, end: dt.datetime) -> bool:
    """Return True if *entry_time_struct* (time.struct_time) is between range."""
    if entry_time_struct is None:
        # Some feeds omit dates; keep them to avoid missing big news
        return True
    entry_dt = dt.datetime.fromtimestamp(
        dt.datetime(*entry_time_struct[:6]).timestamp(), tz=tz.UTC)
    return start <= entry_dt <= end


# ---------------------------------------------------------------------------
# Core generator
# ---------------------------------------------------------------------------

def fetch_feed_items(category: str, url: str, date_start: dt.datetime, date_end: dt.datetime):
    """Yield (title, link, summary) tuples for items inside the date range."""
    feed = feedparser.parse(url)
    for entry in feed.entries:
        if within_range(getattr(entry, "published_parsed", None), date_start, date_end):
            title = entry.title
            link = entry.link
            summary = first_sentences(getattr(entry, "summary", ""))
            yield title, link, summary


def build_newsletter(month_start: dt.datetime, output_dir: str = DEFAULT_OUTPUT_DIR) -> str:
    os.makedirs(output_dir, exist_ok=True)
    date_start, date_end = month_range(month_start)
    file_name = f"newsletter_{date_start.strftime('%Y_%m')}.md"
    path = os.path.join(output_dir, file_name)

    lines: List[str] = []
    lines.append(f"# Monthly Newsletter – {date_start.strftime('%B %Y')}")
    lines.append("")
    lines.append("Greetings, colleagues!  Below you'll find the key developments "
                 "in accounting, audit, and tax over the past month.  Feel free "
                 "to copy-edit, reorganise, or augment these notes before "
                 "circulation.")
    lines.append("")

    for category, url in FEEDS.items():
        items = list(fetch_feed_items(category, url, date_start, date_end))
        if not items:
            continue
        lines.append(f"## {category}")
        lines.append("")
        for title, link, summary in items:
            bullet = f"- **{title}** — {summary} ([link]({link}))"
            wrapped = textwrap.fill(bullet, subsequent_indent="  ", width=100)
            lines.append(wrapped)
        lines.append("")

    with open(path, "w", encoding="utf-8") as fp:
        fp.write("\n".join(lines))

    return path


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Generate monthly newsletter for accounting, audit & tax.")
    parser.add_argument("--month", type=parse_month, default=None,
                        help="Target month in YYYY-MM format (defaults to previous calendar month)")
    parser.add_argument("--output-dir", default=DEFAULT_OUTPUT_DIR,
                        help="Directory to write newsletter markdown file")
    args = parser.parse_args()

    if args.month is None:
        today = dt.datetime.now(tz=tz.UTC)
        # previous month
        first_day_current_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        args.month = first_day_current_month - dt.timedelta(days=1)
        args.month = args.month.replace(day=1)

    path = build_newsletter(args.month, args.output_dir)
    print(f"Newsletter written to {path}")


if __name__ == "__main__":
    main()
## Monthly Newsletter Generator for Accounting, Audit & Tax Professionals

This small utility fetches the most relevant news from public RSS feeds (Google News keyword feeds by default) and assembles a ready-to-edit Markdown newsletter for the previous month.  The goal is to save you hours of manual research and copy-and-paste work.

### Features

* Covers three key domains: Accounting, Audit, and Tax
* Automatically targets the previous calendar month (or pick any month with `--month`)
* Generates clean Markdown with **bold titles**, inline summaries, and source links
* Feed list can be customised in `newsletter_generator.py` – add as many as you like
* Lightweight: only two pure-Python dependencies (`feedparser`, `python-dateutil`)

### Installation

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Usage

Generate the newsletter for the previous month (default):

```bash
python newsletter_generator.py
```

Generate the newsletter for a specific month:

```bash
python newsletter_generator.py --month 2024-07
```

You will find a file named like `newsletters/newsletter_2024_07.md`.  Open it in your Markdown editor, review the content, adjust summaries, and send it to your mailing list or export as PDF.

### Customising Feeds

Open `newsletter_generator.py` and edit the `FEEDS` dictionary.  You can replace Google News RSS URLs with industry journals, government updates, or paid data sources—anything that offers an RSS feed.

### Next Improvements

* Integrate an LLM-based summariser (e.g. OpenAI, Hugging Face) for richer abstracts
* Send the newsletter automatically via email or a service like Mailchimp/Postmark
* Cache retrieved articles to accelerate repeated runs during editing
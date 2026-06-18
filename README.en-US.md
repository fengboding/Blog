# Blog

A single-page blog application with multi-locale support, theme switching, and markdown rendering.

## Features

- **Multi-locale**: Full i18n for all UI elements — English, 中文
- **Theme**: Light/Dark with auto-detection
- **Markdown**: Rendered with syntax highlighting and code copy button
- **Search**: Filter posts by title/description/tags
- **Tag filter**: AND logic — select multiple tags to narrow results
- **Tag marquee**: Overflowing tags animate with a continuous marquee, pause on hover
- **Pagination**: 6 posts per page
- **Post navigation**: Previous/Next buttons show post titles; hidden when no related post
- **Responsive**: Mobile and desktop friendly
- **Reading progress**: Circular progress indicator on post detail pages; click to scroll to top
- **Loading overlay**: Dismiss on wheel or touch only — prevents accidental dismissal
- **Toast notifications**: Frosted glass style, bottom-right placement, colored left border accent
- **About page**: Markdown-based about page rendered from `about.md`
- **Config-driven**: Site configuration via `data/config/config.json`

## Usage

### Add posts

Create markdown files in `data/posts/` with frontmatter:

```md
---
title: Your Post Title
date: 2025-01-15
description: A short description
tags: [tag1, tag2]
---

Post content here...
```

### Configuration

Edit `data/config/config.json` to configure your site:

```json
{
    "siteTitle": {
        "en-US": "Blog",
        "zh-CN": "博客"
    },
    "siteDesc": {
        "en-US": "Exploring ideas, code, and creativity",
        "zh-CN": "探索想法、代码与创意"
    },
    "github": "https://github.com/your-username",
    "email": "hello@example.com",
    "about": "data/config/about.md"
}
```

### About page

Create `data/config/about.md` with your about content in markdown format.

### Build

```bash
node build.js
```

Generates `data/posts.json` and `data/tags.json` from markdown files.

### Serve locally

```bash
npx serve .
```

### Locales

| Code   | Language |
|--------|----------|
| en-US  | English  |
| zh-CN  | 简体中文  |

Language is detected from the browser or localStorage. Switch via the language toggle in the header.

### Theme

Theme auto-detects `prefers-color-scheme`. Toggle manually with the theme button. Choice is saved to localStorage.

## Project structure

```
├── index.html          # Single-page application
├── build.js            # Build script (zero dependencies)
├── package.json
├── data/
│   ├── config/           # Site configuration
│   │   ├── config.json   # Configuration file
│   │   └── about.md      # About page content
│   ├── posts/            # Markdown posts
│   ├── assets/           # Images and static assets
│   ├── posts.json        # Generated post index
│   └── tags.json         # Generated tag index
└── .github/workflows/
    ├── ci.yml            # CI — runs build on push/PR
    └── deploy.yml        # GitHub Pages deployment
```

# DARKGRADE

Dark, cinematic, single-page product landing site for DARKGRADE. Local-first AI for creative professionals.

## Background Video

The fixed, 100vh full-screen background video mechanism is configured with:
- Active video source: `https://v1.pinimg.com/videos/mc/720p/32/22/b6/3222b64b7d66ea2efafe1ecaecb3f3ca.mp4`
- Local high-speed cache: `/public/bg/loop.mp4`
- Frame-matched fallback poster: `/public/bg/poster.jpg`

The background is fixed to 100vh, automatically loops, scales responsively (`object-fit: cover`), and darkens via scroll-driven `--scrim` opacity (0.15 in hero up to ~0.74 as you scroll) to ensure perfect text contrast and legibility.

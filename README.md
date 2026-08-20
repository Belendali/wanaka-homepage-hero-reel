# Wanaka Homepage — First-time clarity v2

1:1 rebuild of the Figma frame
`PWtgAaGdl6znpuQykrnIbb / 46850:57513` (page **08202026**, 1920 × 7817).

The three frames in that Figma section are the same page with three different
hero clips, so this demo folds them into one page whose **hero video
auto-switches** — which is the point of the demo.

## Run

```bash
python3 -m http.server 8461 --directory ~/wanaka-homepage-demo
```

Then open <http://localhost:8461>. (Also registered in `~/.claude/launch.json`
as `wanaka-homepage`.)

## Hero video reel

- `assets/video/homepage-hero-1920x800.mp4` → **Racing**
- `assets/video/homepage-hero-building-1920x800.mp4` → **Building**
- `assets/video/homepage-hero-combat-1920x800.mp4` → **Combat**

Each clip is ~5.0 s. Per cycle (~6.0 s):

1. The incoming clip enters **frozen on frame 0** and fades up over 900 ms.
2. It stays frozen on that first frame for another **500 ms** at full opacity,
   so the opening frame actually reads before anything moves.
3. It plays for `duration − 900 ms`, then crossfades out — the outgoing clip
   reaches its last frame exactly as it disappears, so there is no loop seam.

Only the visible clip plays; the others are paused and rewound to 0. Tune
`FADE`, `FIRST_HOLD` and `MIN_PLAY` at the top of `app.js` (`FADE` must stay in
sync with the `.hero-video` transition in `styles.css`).

The floating panel bottom-right is **demo chrome, not part of the design**: a
progress bar for the current clip plus manual buttons. Delete `#hud` from
`index.html` (and its rules in `styles.css`) for a clean screen recording.

## Fidelity notes

- The page is laid out at the design's own 1920 px coordinates and scaled to
  the viewport with `transform: scale(innerWidth / 1920)`, so proportions stay
  exact at any window size.
- Backdrop blurs, the 400 → 800 px hero gradient, the four blurred glow slabs
  behind the CTA, and the 32 px dot pattern (4 px white dot @ 7.2 %) are all
  taken from the Figma fills rather than eyeballed.
- Text, spacing and colors are rebuilt in HTML/CSS. Complex illustrations —
  the Studio mock-up, the game-card art, and the nine feature-card visuals —
  are 2× PNG exports of their Figma nodes, since they are artwork rather than
  layout.
- Fonts come from Google Fonts: Roboto, Poppins, Inter, Bitcount Grid Single.

## Layout map (design px, from the top of the frame)

| y | section |
|---|---|
| 0 | hero video (1920 × 800) |
| 6 | floating header |
| 468 | main container starts |
| 568 | H1 + prompt box |
| 982 | Build with AI. Stay in control. + Studio shot |
| 1978 | Play a world. Remix it into your own. |
| 2638 | Everything you need… (9 feature cards) |
| 4658 | Start making games for free (pricing) |
| 5713 | Build alongside creators |
| 5971 | FAQ |
| 6843 | CTA |
| 7539 | footer |

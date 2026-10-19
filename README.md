# Wanaka Homepage — First-time clarity v2

1:1 rebuild of the Figma frame
`PWtgAaGdl6znpuQykrnIbb / 46850:57513` (page **08202026**, 1920 × 7817).

The three frames in that Figma section are the same page with three different
hero clips, so this demo folds them into one page whose **hero video
auto-switches** — which is the point of the demo.

**Live demo → <https://belendali.github.io/wanaka-homepage-hero-reel/>**

## Run locally

```bash
python3 -m http.server 8461 --directory ~/wanaka-homepage-demo
```

Then open <http://localhost:8461>. (Also registered in `~/.claude/launch.json`
as `wanaka-homepage`.)

## Hero video reel

| # | clip | file | source size |
|---|---|---|---|
| 1 | Racing | `homepage-hero-1920x800.mp4` | 1920×800 |
| 2 | Combat | `homepage-hero-combat-1920x800.mp4` | 1920×800 |
| 3 | Forest | `homepage-hero-forest-1472x608.mp4` | 1472×608 |
| 4 | Graveyard | `homepage-hero-graveyard-1472x608.mp4` | 1472×608 |
| 5 | Building | `homepage-hero-building-1920x800.mp4` | 1920×800 |
| 6 | Fishing | `homepage-hero-fishing-1920x800.mp4` | 1920×800 |
| 7 | Sushi | `homepage-hero-sushi-1920x800.mp4` | 1920×800 |
| 8 | Cavern | `homepage-hero-cavern-1472x608.mp4` | 1472×608 |

`homepage-hero-parkour-1920x800.mp4` is still in the folder but out of the
rotation. The 1472×608 clips are 2.42:1 against the hero's 2.40:1, so
`object-fit: cover` trims under 1 % off the sides; they do upscale to fill
1920×800, which is visible on a large display.

Clips are 5.0 s or 6.0 s; the reel reads each one's own duration. Per cycle:

1. The incoming clip enters **frozen on frame 0** and fades up over 900 ms.
2. It stays frozen on that first frame for another **500 ms** at full opacity,
   so the opening frame actually reads before anything moves.
3. It plays for `duration − 900 ms`, then crossfades out — the outgoing clip
   reaches its last frame exactly as it disappears, so there is no loop seam.

Only the visible clip plays; the others are paused and rewound to 0. Tune
`FADE`, `FIRST_HOLD` and `MIN_PLAY` at the top of `app.js` (`FADE` must stay in
sync with the `.hero-video` transition in `styles.css`).

Adding a clip means one `<video class="hero-video" data-label="…">` in
`index.html` plus a matching `#hudRow` button — the reel reads its length and
order from the DOM. Reordering is just moving those two lines.

Only the first clip carries `preload="auto"`. The rest start at
`preload="none"` and are pulled down `LOOKAHEAD` clips ahead of wherever the
reel is, so eight clips never cost 43 MB on first paint — one rotation caches
everything. A switch also refuses to cut to a clip with no decoded frame yet;
it holds the clip that's up and retries, so a slow connection stalls on a real
frame instead of blanking the hero.

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

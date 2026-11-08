# Wellspring Writes — One-Page Website

A one-page refresh of [wellspringwrites.com](https://www.wellspringwrites.com/) for Becky's fine lettering studio (pointed-pen calligraphy, engraving, foiling, wax seals, live event work).

Source doc: [Website Refresh (Google Doc)](https://docs.google.com/document/d/1QbinNnZyPiSvJGM06on8qWjcM6NWzyMpwNlUbv4wnAc/edit)

## Folder structure

```
wellspring-writes/
├── README.md                 ← you are here
├── docs/
│   ├── content-brief.md      ← Becky's words, goals, inspiration sites, open questions
│   ├── best-practices.md     ← research: what calligraphy/engraving sites need
│   ├── form-setup.md         ← connecting the inquiry form to Google Sheets
│   └── instagram-setup.md    ← turning on the live Instagram feed
├── apps-script/
│   └── Code.gs               ← Google Apps Script that saves form submissions to the sheet
├── images/
│   ├── logo/                 ← brand mark
│   ├── about/                ← Becky's headshot (from the current About page)
│   ├── client-logos/         ← 12 brand logos from the current About page
│   └── portfolio/            ← work photos, numbered in the order they appear in the doc
└── site/                     ← the one-page site (deploy this folder as-is)
    ├── index.html, styles.css, script.js
    └── img/                  ← web-sized copies of the images above
```

## The site

**Live preview:** https://hi-kny.github.io/becki/ (GitHub Pages, redeploys on every push to `main`)

Plain HTML/CSS/JS with no build step. To preview it locally, run `python3 -m http.server --directory site` and open http://localhost:8000.

- **Placeholders:** anything Becky still needs to supply is highlighted yellow (class `tbd`). Search `tbd` in `index.html` to find them all. Remove the highlight style in `styles.css` before launch.
- **Inquiry form:** submissions go to the [Contact Form Google Sheet](https://docs.google.com/spreadsheets/d/1pi5QcrqqstRHxXLGhTMOO6-UJ8nNWSWP1cc5HX24agk/edit) through `apps-script/Code.gs`. Works on any host. One-time setup steps are in [docs/form-setup.md](docs/form-setup.md).

## Image inventory

All 17 images from the Google Doc, at original resolution (~2000px on the long edge).

| File | What it shows | Shape | Possible use |
|---|---|---|---|
| `logo/wellspring-writes-logo.png` | WW flourish monogram + wordmark, black on white | Portrait | Header / hero |
| `01-wine-bottle-engraving-lover` | Engraved Pinot Noir bottle, "you're my… Lover" | Portrait | Engraving / gifts |
| `02-wine-bottle-engraving-love-you-3000` | Engraved red wine, "love you 3000!" | Portrait | Engraving / gifts |
| `03-pressed-flower-love-card` | Handmade card, pressed flowers, red "Love" script | Portrait | Stationery |
| `04-monkey47-gin-bottle-engraving` | Gin bottle engraved "Jimmy Fallon" | Portrait | Engraving / notable clients |
| `05-serum-bottles-personalized-names` | Ring of black serum bottles, each with a name | Square | Brand activations |
| `06-handmade-paper-vows-floral` | Close-up, handmade deckled paper, floral illustration | Landscape | Hero / texture |
| `07-envelope-addressing-vintage-stamps` | Addressed envelope with vintage stamps | Portrait | Envelope addressing |
| `08-thank-you-card-silver-foil-navy` | Silver foil "Thank You" on navy | Landscape | Foiling |
| `09-thank-you-card-gold-foil-cream` | Gold foil "Thank You" on cream | Landscape | Foiling |
| `10-wax-seal-dried-flowers` | Navy wax seal with dried florals | Portrait | Details |
| `11-vow-scroll-floral-border` | Long-form script with gold-accent floral corner | Portrait | Vows / keepsakes |
| `12-place-cards-gold-white-ink` | Ochre place cards, white ink names | Portrait | Weddings / events |
| `13-wax-seals-gold-navy-envelopes` | Rows of gold seals on navy envelopes | Landscape | Large-scale events |
| `14-place-cards-deckled-edge` | Deckled cream place cards, burgundy ink | Landscape | Weddings / events |
| `15-agate-place-cards` | Blue agate slices lettered with names | Landscape | Weddings / events |
| `16-envelopes-navy-gold-ink-butterfly-stamps` | Navy envelopes, gold ink, butterfly stamps | Portrait | Envelope addressing |

Visual palette pulled from the photos: white marble, cream/handmade paper, deep navy, antique gold, burgundy. Pairs well with the black monogram.

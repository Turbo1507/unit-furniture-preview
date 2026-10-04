# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Open decision (Босс 03.10: «пока не знаю, надо уточнить»). Two confirmed candidate groups, served as two equal paths until the owner decides:
- private owners and investors furnishing a villa, house or apartment in Bali (often owners of UNIT. properties);
- professionals furnishing a property: designers, architects, developers, hotels and restaurants (catalog copy: «Готовые интерьерные решения для дизайнеров, архитекторов и застройщиков»).

## Product Purpose

UNIT.FURNITURE is the furniture brand of the UNIT. group: designer furniture of its own production in Bali, plus complete interior furnishing for private and commercial properties. The site lets a visitor browse the 2026 collection, collect models into a request list with quantities, and send one inquiry. Success = a qualified inquiry with chosen models, quantities and property context.

## Positioning

Own production in Bali inside a developer group: the same furniture is used in UNIT.'s own villas and hotels, so it is proven in the tropical climate. Ready models can be adapted in size, colour, fabric and furnishing scope.

## Operating Context

No prices online: cost is given on request after the brief. Order process (catalog): consultation → selection → quote → production → delivery and installation. Customers send models, a floor plan or references. Climate: high humidity, sun, intensive daily use.

## Capabilities and Constraints

- Static site on GitHub Pages (Turbo1507/unit-furniture-preview), RU + EN runtime switch.
- Catalog data: `js/data.js`, source Figma page «Каталог» (collection 2026): 28 models, lines Awan / Axis / Reason; categories chairs, beds, armchairs & poufs, sofas, nightstands, outdoor sofas, sun loungers, pillows. Dimensions H × W × D mm; some models have none.
- Request form does NOT send anywhere yet (Telegram bot postponed by owner); needs honest errors and a success state.
- Undecided / not to invent: prices, lead times in weeks, warranty terms, MOQ, delivery cost, payment terms, real phone number (+62 812 3456 7890 looks like a placeholder).

## Brand Commitments

- Brand book: White #FFFFFF, Graphite #3A3A3A, Soft Stone #F0F0F0, Interlace #BEBEBC, Deep Real Blue #1B1FEA for accents only. Helvetica Neue. Left alignment. No visual noise, no decoration, no shadows under text.
- Owner: overall site design follows Unit Space City (structure, rhythm, components, presentation); colours and type from this brand book.
- Wordmark «UNIT.» weight 500 + tail 400, everywhere. No italics. No small tracked uppercase labels. No magnetic buttons. Lead ≤ 2 lines. No hanging short words (RU and EN). 8px spacing scale.

## Evidence on Hand

- Catalog slides, studio product shots and lifestyle photos: `assets/c26/` (p-*, life-*), production photos `production-1/2.jpg`, materials `mat-*`, climate `climate-1..3`, design `design-1/2`.
- Texts RU+EN: `../refs/catalog-2026-10/catalog-db.json`.
- Projects pr1–pr5 have real catalog photos; pr6–pr8 (commercial) are placeholders.
- Absent: testimonials, client names, prices, lead times, warranty.

## Product Principles

1. Show the furniture and the workshop, not mood: every image should be the actual product or production.
2. Never invent commercial facts; say honestly what is answered after the brief.
3. One path to one inquiry: every model, quantity and note ends up in the same request.
4. Equal footing for «for my home» and «for a property» until the audience is decided.

## Accessibility & Inclusion

WCAG AA contrast (4.5:1 body, 3:1 large), touch targets ≥ 44px on mobile, keyboard focus visible, prefers-reduced-motion respected.

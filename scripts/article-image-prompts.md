# New article images — prompts

The 34 article hero images are really only ~14 distinct pictures. These 19 articles reuse another article's picture and need their own. The other 15 keep theirs.

**Settings:** 16:9 landscape (1920x1080 or larger), PNG/JPG. No text, logos or watermarks in the image.

**Style (append to every prompt):**
`photorealistic industrial product photography, dark moody studio, black matte stone table, soft cool rim light with warm accents, brass and brushed-steel details, shallow depth of field, high detail, 16:9, no text, no logos, no watermark`

Save each result as `<slug>.png` in one folder, then give me that folder. I will convert them (`scripts/import-article-image.mjs`), update every page and the slider data, rebuild and audit.

| # | slug | Currently shares picture with | Prompt (before the style line) |
|---|------|-------------------------------|-------------------------------|
| 1 | decor-color-match | decorative, matte-vs-gloss, pvd-color-durability, pvd-colors | A designer's sample set of four PVD finishes (champagne gold, rose gold, smoke grey, matte black) laid beside a walnut veneer, a marble tile and a fabric swatch under a warm spotlight |
| 2 | decorative | same group | Row of premium decorative hardware (cabinet knobs, pulls, a lamp base) in gold, rose gold and smoke finishes on dark stone, elegant composition |
| 3 | matte-vs-gloss | same group | Two identical metal plates side by side under one light: left a matte brushed gold (soft diffuse light), right a mirror-gloss gold with sharp reflections |
| 4 | pvd-color-durability | same group | Close-up of a gold PVD plate under a fine abrasion test with a stylus, a salt-spray test sample beside it, a gloved hand |
| 5 | electrostatic-powder-coating-guide | electrophoretic-ecoat, industrial, plating-defects | Operator in protective gear spraying powder coat onto hanging metal brackets with an electrostatic gun in a booth, fine powder cloud lit from behind |
| 6 | industrial | same group | Wide view of an industrial coating workshop: racks of metal parts, a vacuum PVD chamber in the background, dramatic clean lighting |
| 7 | plating-defects-peeling-blisters | same group | Macro of a chrome-plated part with a peeling, blistered, dull patch exposing the layer beneath, a jeweller's loupe next to it |
| 8 | polishing-brass-parts | polishing-before-pvd | A brass part being buffed on a polishing wheel, compound dust glowing gold, gloved hands holding the part |
| 9 | pvd-fingerprint-cleaning | pvd-care | Fingerprint smudges clearly visible on a glossy black PVD handle, a microfiber cloth and a small spray bottle beside it |
| 10 | pvd-quote-guide | pvd-color-consistency-qc, surface-preparation | Desk with a technical drawing (no readable text), calipers, calculator, notebook and three sample parts, as when preparing a coating quote |
| 11 | pvd-door-handles-luxury-finish | same group | A luxury door handle in brushed gold PVD on a dark wooden door, close-up, soft side light |
| 12 | conductive-vs-insulative-for-pvd | same group | A metal part and a plastic part side by side on a PVD chamber fixture, a multimeter probe touching the metal part |
| 13 | decorative-vs-hard-chrome | pvd-faucets | Split composition: left a shiny decorative chrome faucet, right a heavy industrial hard-chrome piston rod, on a dark surface |
| 14 | traditional-plating-nickel-chrome | pvd-faucets | A rack of parts being lifted out of a nickel plating tank, rising steam, bright solution, industrial plating line |
| 15 | pvd-on-zinc-galvanized | nickel-chrome-on-zamak | Galvanized steel and zinc-alloy brackets and bolts with matte grey zinc finish beside one freshly PVD-coated sample, clean prep area |
| 16 | architectural-coating | pvd-on-abs-plastic | Architectural hardware (aluminium window handle, door pull, profile samples) in bronze and black finishes with a blurred modern building facade behind |
| 17 | pvd-on-pp-plastic | pvd-on-glass-crystal | Grey and white polypropylene plastic parts (caps, trim pieces) beside chrome-look metallised samples, faint plasma glow |
| 18 | pvd-vs-ceramic | mirror-vs-satin-polish | Two metal samples side by side: one with water beading on a ceramic coating, one with a gold PVD finish |
| 19 | quality-tests | pvd-defects-streaks-pinhole | A coating thickness gauge measuring a plated part, a cross-hatch adhesion test grid on a coated plate, a salt-spray cabinet blurred behind |

Kept as they are (unique picture): anodizing-aluminum-luxury-finish, other-coating-methods-phoretic-anodizing-thermal-spray, pvd-coating, pvd-colors, electrophoretic-ecoat-phoretic-guide, polishing-before-pvd, pvd-care, pvd-faucets, nickel-chrome-on-zamak, pvd-on-abs-plastic, pvd-on-glass-crystal, mirror-vs-satin-polish, pvd-defects-streaks-pinhole, pvd-color-consistency-qc, surface-preparation.

Other places (not articles): the karaj/ and tehran/ service pages all show the same `portfolio-1/2/3` photos.

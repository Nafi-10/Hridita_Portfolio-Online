# Hridita Haq — Fashion Designer

A single-page fashion portfolio with an ivory introduction, an animated editorial Collections section using original photographs, an editorial About section, an interactive creative-process journal, and a cinematic blog. Remaining sections will follow their own supplied references.

## Preview

Run `npm run dev` from this directory and open http://127.0.0.1:4173. No dependencies or build step required. `npm run check` checks browser-script syntax.

## Edit

- `dist/index.html`: introduction, navigation, Collections markup, and dialogs.
- `dist/styles.css`: colors, typography, responsive layouts, and animations.
- `dist/app.js`: mobile navigation, upcoming-section dialogs, and pointer motion.
- `dist/collections.css`: compact editorial compositions, paired thumbnail rows, single-slide entrance animations, and responsive controls.
- `dist/collection-looks.js`: five selected looks, image identifiers, descriptive draft titles, captions, and photo credits.
- `dist/collections.js`: five-look slideshow, autoplay, keyboard controls, drag/swipe, and links to editorial look pages.
- `dist/about.css`: three-panel portrait composition, introduction, signature, and responsive About layout.
- `dist/about.js`: one-time scroll reveals with reduced-motion support and a visible no-JavaScript fallback.
- `dist/process.css`: seven editorial studio chapters, layered transitions, and responsive art direction.
- `dist/process.js`: chapter selection, keyboard and swipe controls, playback, and links to the study pages.
- `scripts/study-content.json`: editable headings, observations, captions, and steps for all seven atelier studies.
- `scripts/build-studies.cjs`: generates the seven static `dist/study-*.html` pages; run `npm run build:studies` after content edits.
- `dist/study.css` and `dist/study.js`: individual journal compositions, selectable details, fabric samples, and the photo contact sheet.
- `dist/blog.css`: cinematic story backdrop, floating portrait cards, expanding image transition, and article reader.
- `dist/blog.js`: four draft articles, story selection, keyboard/swipe controls, optional playback, and accessible reading dialogs.
- `dist/assets/`: self-hosted fonts and imagery.

The introduction uses the photograph supplied by the user on October 12, 2026, saved unchanged as `dist/assets/portrait-photo.png`. Its original photographer watermark remains in the file. At the user’s request, the introduction no longer displays the circular slogan, introduction index, or photography caption. Photographer credits remain with the original collection photographs. The arched framing and pointer animation are applied through CSS. No services, project history, availability, or contact information have been invented. Navigation to unfinished sections opens clearly labeled coming-soon dialogs. Replace those with section anchors as each section is built.

Motion respects the operating system’s reduced-motion preference. Dialogs support Escape, focus return, and native keyboard focus containment. Mobile navigation is a disclosure with accessible expanded state.

## Collections

The latest reference, `a7bd2780-aa5d-43ba-a0dc-1da118122e73.mp4`, shows alternating large model cutouts, two staggered photographs, large central typography, and vertical transitions. The Collections section uses five user-supplied original looks. Following the October 13 spacing review, its layout groups the title, description, and CTA on the left with a paired thumbnail row below and a large featured model on the right. The wider canvas and shorter desktop section reduce empty space. On mobile the content, model, and thumbnails stack without overlap. The previous six-look runway layout and fictional AI looks are no longer displayed.

Only the active slide is visible during the brief entrance animation, preventing overlapping titles and buttons. Existing autoplay, pause/play, keyboard and swipe navigation, and look-page links remain available. The gallery uses 16–17px descriptions, clear garment labels, numbered selection buttons, and labelled playback/navigation controls. Descriptions and editorial look pages use plain language and stronger contrast.

The main figures use ImageGen background extractions of the supplied photographs. The inset photographs and photo dialogs use byte-for-byte copies of the original files, including the Memory Mirage watermark on the first photograph. Editorial look titles and descriptions are draft labels based on visible clothing details, not verified collection names or claims about materials. File mappings and exact editing prompts are recorded in `collections-photo-provenance.md`.

Playback starts automatically while the gallery is visible, waits 7.5 seconds on each settled composition, then uses a 1.2-second vertical transition. Hover and manual selection preserve playback. Pause keeps it stopped until Play is pressed. Keyboard focus, a drag, a hidden tab, and transitions temporarily suspend the timer. Use the five pagination buttons, Previous/Next, Left/Right, Home/End, or a horizontal drag/swipe to navigate; vertical touch scrolling stays native. Rapid requests queue the final destination. Reduced-motion visitors start paused and see immediate changes. Selecting a photo or “View photo & details” opens its dedicated editorial look page.

On Windows, prepend the installed `C:\Program Files\Git\bin` to the environment PATH and set `TAR_OPTIONS=--force-local` when invoking the official Sites source helper. These settings allow its Bash packager to handle Windows archive paths.

## Creative process / Studio journal

The section after About follows the supplied video's horizontal editorial transitions, overlapping rectangular photographs, varied typography, and chapter counter. It intentionally excludes the screenshot's central cutout-model layout. Seven chapters cover Sketches, Mood boards, Fabric swatches, Pattern-making, Fittings, Photoshoot, and Crafts. The main Process navigation links to `#process`.

Choose a chapter, drag/swipe horizontally, or use Previous/Next. When the stage has keyboard focus, Left/Right and Home/End navigate. Inactive scenes are inert and hidden from assistive technology. Vertical touch scrolling stays native. Playback starts automatically and advances every 6.5 seconds while visible. Hover and manual chapter selection preserve playback; Pause keeps it stopped until Play is pressed. A drag, keyboard navigation, or hidden page temporarily suspends cycling. Reduced-motion preferences start playback paused, disable transitions, and pause playback when enabled.

“Explore the study” opens a dedicated journal page for each chapter. The seven compositions are a taped sketchbook, mood-board collage, selectable fabric samples, a paper pattern diagram, fitting annotations, an original-photo contact sheet, and an embroidery-hoop study. Buttons and image annotations reveal a focused observation and change the corresponding visual. The numbered chapter rail and Previous/Next links connect every page, with a return to the main atelier. All copy and navigation render without JavaScript; interactive controls progressively enhance the page. Mobile layouts place the artwork above the detail controls and notes. Reduced motion disables entry and selection transitions.

The process image sheets and accompanying generic descriptions are illustrative placeholders, not Hridita's actual process or designs. Replace them with her approved material. Both image sheets are displayed as separate photos using CSS cropping; no composite sheet is presented to visitors. Prompts, file paths, and quadrant mapping are in `process-provenance.md`. The Photoshoot study uses three original collection photographs, preserves the full selected frame, and shows the Memory Mirage credit for the blue-dress photograph. Its captions describe visible features, not an invented account of the shoot. The pattern diagram is an illustrative form study, explicitly not to scale or a cutting pattern.

## Blog / Notes on form

The blog follows the user's `02c77b5f-f25c-4302-8673-cc848d01cbed.mp4` reference: a large photographic backdrop, left-aligned featured story, and a rail of portrait cards. Selecting a card expands its photograph into the background while the remaining cards advance and the story text appears. The existing ivory and chocolate palette and Cormorant typography carry through the new section after the studio journal. Navigation links to `#blog`.

Four sample articles cover pleats, colour inspiration, texture, and finishing. Each opens in a reading dialog with Escape, a close button, and focus restoration. These are proposed editorial drafts, not attributed published writing or verified experiences of Hridita. All generated images are illustrative; replace the source sheet and drafts with approved material when available. See `blog-provenance.md` for the asset mapping and exact prompt.

Arrow buttons, Left/Right, Home/End, and horizontal drag/swipe select stories. The card rail has one keyboard tab stop to avoid focus on clipped cards. Playback starts automatically and advances every 6.5 seconds while the section is visible, after each transition. Hover and manual story selection preserve playback; Pause keeps it stopped until Play is pressed. A drag, keyboard navigation, hidden page, or open reader temporarily suspends cycling. Reduced-motion users start paused and see immediate selection changes; enabling reduced motion stops playback. No CMS, account, analytics, or external API is required.

VS Code Live Server is configured in `.vscode/settings.json` to serve `/dist` on port 5500 with automatic reload on save. The plain Node preview remains available at port 4173.

## Asset notes

The About introduction uses brief first-person draft copy, as authorized by the user. Only Hridita's name and fashion-designer role are confirmed; the creative approach is proposed copy to review, not a verified biography. No education, location, clients, awards, or career history are asserted. Replace the draft with her approved introduction when available. The About portrait uses the user's red-and-beige sari photograph, with its background removed using the built-in ImageGen tool. Three orange panels and a continuous face layer follow the supplied layout reference. The panel design is implemented with responsive CSS and SVG clipping; the cutout is a transparent PNG. Its exact editing prompt and source are recorded in `about-provenance.md`.

Fonts: Cormorant Garamond, DM Sans, and Allura, downloaded from Google Fonts. The current portrait is user-supplied. Its provenance and the retired AI placeholder's generation prompt are in `asset-provenance.md`.

The current Collections assets and prompts are in `collections-photo-provenance.md`. `collections-provenance.md` documents the retired AI placeholders.

## Editorial look pages and full collection

The “View full list” link sits between Previous and Next in the animated Collections controls. `dist/collection.html` follows the supplied boutique reference with a soft blush hero, design-detail strip, five-photo grid, and an About feature. Every card links to the corresponding look. No shop, prices, shipping, or purchase claims are included.

Each `dist/look-*.html` page follows the supplied editorial layout: large serif heading, the existing model cutout, a “The look” panel, a palette, and two close-ups cropped in CSS from the original photograph. The original can be expanded below the study. Previous/Next wrap through all five looks, alongside a full-list link and portfolio return links. All page content and navigation work without JavaScript.

Edit `scripts/lookbook-details.json` for detail captions, palette colours, and close-up positioning. `node scripts/build-lookbook.cjs` regenerates all six HTML pages from it and `dist/collection-looks.js`. Shared styling is in `dist/lookbook.css`. These descriptive editorial titles and notes remain draft copy based on the visible garments; no additional materials or accessories are asserted.

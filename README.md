# Hridita Haq — Fashion Designer

A single-page fashion portfolio with an ivory editorial introduction, a runway Collections section, an editorial About section, an interactive creative-process journal, and a cinematic blog. Remaining sections will follow their own supplied references.

## Preview

Run `npm run dev` from this directory and open http://127.0.0.1:4173. No dependencies or build step required. `npm run check` checks browser-script syntax.

## Edit

- `dist/index.html`: introduction, navigation, Collections markup, and dialogs.
- `dist/styles.css`: colors, typography, responsive layouts, and animations.
- `dist/app.js`: mobile navigation, upcoming-section dialogs, and pointer motion.
- `dist/collections.css`: responsive runway depth, look details, and collection dialog layouts.
- `dist/collections.js`: six-look carousel data, autoplay, keyboard controls, drag/swipe, and details.
- `dist/about.css`: three-panel portrait composition, introduction, signature, and responsive About layout.
- `dist/about.js`: one-time scroll reveals with reduced-motion support and a visible no-JavaScript fallback.
- `dist/process.css`: seven editorial studio chapters, layered parallax transitions, responsive art direction, and the study dialog.
- `dist/process.js`: chapter selection, keyboard and swipe controls, optional playback, and study dialogs.
- `dist/blog.css`: cinematic story backdrop, floating portrait cards, expanding image transition, and article reader.
- `dist/blog.js`: four draft articles, story selection, keyboard/swipe controls, optional playback, and accessible reading dialogs.
- `dist/assets/`: self-hosted fonts and imagery.

The introduction uses the photograph supplied by the user on October 12, 2026, saved unchanged as `dist/assets/portrait-photo.png`. Its original photographer watermark remains in the file, and the caption credits Memory Mirage as shown in that watermark. The arched framing and pointer animation are applied through CSS. No services, project history, availability, or contact information have been invented. Navigation to unfinished sections opens clearly labeled coming-soon dialogs. Replace those with section anchors as each section is built.

Motion respects the operating system’s reduced-motion preference. Dialogs support Escape, focus return, and native keyboard focus containment. Mobile navigation is a disclosure with accessible expanded state.

## Collections

The supplied 6.71-second reference shows a fashion runway carousel: a large foreground model, increasingly small and faded previous looks on the left, and a garment-detail column on the right. This implementation follows that composition with 1-second depth transitions. The runway starts automatically and advances every 4.2 seconds while visible. Hovering or selecting a look keeps playback enabled. Pause stops it until Play is pressed. Playback temporarily waits during a drag, keyboard navigation, a hidden tab, or an open look dialog. Reduced-motion users start with autoplay disabled and see immediate look changes.

Six fictional concept looks are visibly labeled as AI imagery, not Hridita's actual designs. Replace the look data and transparent sheets with approved collection assets when supplied. Each three-model PNG is displayed using CSS background positioning without modifying the original generated asset. Use the dots, arrow buttons, left/right keys, or a horizontal drag/swipe to navigate. Vertical page scrolling stays native.

On Windows, prepend the installed `C:\Program Files\Git\bin` to the environment PATH and set `TAR_OPTIONS=--force-local` when invoking the official Sites source helper. These settings allow its Bash packager to handle Windows archive paths.

## Creative process / Studio journal

The section after About follows the supplied video's horizontal editorial transitions, overlapping rectangular photographs, varied typography, and chapter counter. It intentionally excludes the screenshot's central cutout-model layout. Seven chapters cover Sketches, Mood boards, Fabric swatches, Pattern-making, Fittings, Photoshoot, and Crafts. The main Process navigation links to `#process`.

Choose a chapter, drag/swipe horizontally, or use Previous/Next. When the stage has keyboard focus, Left/Right and Home/End navigate. Inactive scenes are inert and hidden from assistive technology. Vertical touch scrolling stays native. Playback starts automatically and advances every 6.5 seconds while visible. Hover and manual chapter selection preserve playback; Pause keeps it stopped until Play is pressed. A drag, keyboard navigation, hidden page, or open dialog temporarily suspends cycling. Reduced-motion preferences start playback paused, disable transitions, and pause playback when enabled. Each study dialog supports Escape and restores focus to its opener.

Images and accompanying generic descriptions are illustrative placeholders, not Hridita's actual process or designs. Replace them with her approved material. Both image sheets are displayed as separate photos using CSS cropping; no composite sheet is presented to visitors. Prompts, file paths, and quadrant mapping are in `process-provenance.md`.

## Blog / Notes on form

The blog follows the user's `02c77b5f-f25c-4302-8673-cc848d01cbed.mp4` reference: a large photographic backdrop, left-aligned featured story, and a rail of portrait cards. Selecting a card expands its photograph into the background while the remaining cards advance and the story text appears. The existing ivory and chocolate palette and Cormorant typography carry through the new section after the studio journal. Navigation links to `#blog`.

Four sample articles cover pleats, colour inspiration, texture, and finishing. Each opens in a reading dialog with Escape, a close button, and focus restoration. These are proposed editorial drafts, not attributed published writing or verified experiences of Hridita. All generated images are illustrative; replace the source sheet and drafts with approved material when available. See `blog-provenance.md` for the asset mapping and exact prompt.

Arrow buttons, Left/Right, Home/End, and horizontal drag/swipe select stories. The card rail has one keyboard tab stop to avoid focus on clipped cards. Playback starts automatically and advances every 6.5 seconds while the section is visible, after each transition. Hover and manual story selection preserve playback; Pause keeps it stopped until Play is pressed. A drag, keyboard navigation, hidden page, or open reader temporarily suspends cycling. Reduced-motion users start paused and see immediate selection changes; enabling reduced motion stops playback. No CMS, account, analytics, or external API is required.

VS Code Live Server is configured in `.vscode/settings.json` to serve `/dist` on port 5500 with automatic reload on save. The plain Node preview remains available at port 4173.

## Asset notes

The About introduction uses brief first-person draft copy, as authorized by the user. Only Hridita's name and fashion-designer role are confirmed; the creative approach is proposed copy to review, not a verified biography. No education, location, clients, awards, or career history are asserted. Replace the draft with her approved introduction when available. The About portrait uses the user's red-and-beige sari photograph, with its background removed using the built-in ImageGen tool. Three orange panels and a continuous face layer follow the supplied layout reference. The panel design is implemented with responsive CSS and SVG clipping; the cutout is a transparent PNG. Its exact editing prompt and source are recorded in `about-provenance.md`.

Fonts: Cormorant Garamond, DM Sans, and Allura, downloaded from Google Fonts. The current portrait is user-supplied. Its provenance and the retired AI placeholder's generation prompt are in `asset-provenance.md`.

The Collections asset prompts and provenance are in `collections-provenance.md`.

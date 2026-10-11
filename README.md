# Hridita Haq — Fashion Designer

A single-page fashion portfolio with an ivory editorial introduction, a video-referenced runway Collections section, and an editorial About section. Remaining sections will follow their own supplied references.

## Preview

Run `npm run dev` from this directory and open http://127.0.0.1:4173. No dependencies or build step required. `npm run check` checks browser-script syntax.

## Edit

- `dist/index.html`: introduction, navigation, Collections markup, and dialogs.
- `dist/styles.css`: colors, typography, responsive layouts, and animations.
- `dist/app.js`: mobile navigation, upcoming-section dialogs, and pointer motion.
- `dist/collections.css`: responsive runway depth, look details, and collection dialog layouts.
- `dist/collections.js`: six-look carousel data, autoplay, keyboard controls, drag/swipe, and details.
- `dist/about.css`: editorial studio image, introduction, signature, and responsive About layout.
- `dist/about.js`: one-time scroll reveals with reduced-motion support and a visible no-JavaScript fallback.
- `dist/process.css`: seven editorial studio chapters, layered parallax transitions, responsive art direction, and the study dialog.
- `dist/process.js`: chapter selection, keyboard and swipe controls, optional playback, and study dialogs.
- `dist/assets/`: self-hosted fonts and imagery.

The introduction contains an explicitly labeled AI-generated editorial placeholder, not a photo of Hridita. Replace it with her approved portrait and update the alt text and caption together. No services, project history, availability, or contact information have been invented. Navigation to unfinished sections opens clearly labeled coming-soon dialogs. Replace those with section anchors as each section is built.

Motion respects the operating system’s reduced-motion preference. Dialogs support Escape, focus return, and native keyboard focus containment. Mobile navigation is a disclosure with accessible expanded state.

## Collections

The supplied 6.71-second reference shows a fashion runway carousel: a large foreground model, increasingly small and faded previous looks on the left, and a garment-detail column on the right. This implementation follows that composition with 1-second depth transitions. The runway advances every 4.2 seconds while visible and pauses on hover, focus, manual navigation, a hidden tab, or an open look dialog. An explicit Play action resumes playback. Reduced-motion users start with autoplay disabled and see immediate look changes.

Six fictional concept looks are visibly labeled as AI imagery, not Hridita's actual designs. Replace the look data and transparent sheets with approved collection assets when supplied. Each three-model PNG is displayed using CSS background positioning without modifying the original generated asset. Use the dots, arrow buttons, left/right keys, or a horizontal drag/swipe to navigate. Vertical page scrolling stays native.

On Windows, prepend the installed `C:\Program Files\Git\bin` to the environment PATH and set `TAR_OPTIONS=--force-local` when invoking the official Sites source helper. These settings allow its Bash packager to handle Windows archive paths.

## Creative process / Studio journal

The section after About follows the supplied video's horizontal editorial transitions, overlapping rectangular photographs, varied typography, and chapter counter. It intentionally excludes the screenshot's central cutout-model layout. Seven chapters cover Sketches, Mood boards, Fabric swatches, Pattern-making, Fittings, Photoshoot, and Crafts. The main Process navigation links to `#process`.

Choose a chapter, drag/swipe horizontally, or use Previous/Next. When the stage has keyboard focus, Left/Right and Home/End navigate. Inactive scenes are inert and hidden from assistive technology. Vertical touch scrolling stays native. Optional Play advances every 6.5 seconds while visible, with pause on hover, focus, manual selection, a hidden page, or an open dialog. Playback starts paused; reduced-motion preferences disable transitions and pause playback when enabled. Each study dialog supports Escape and restores focus to its opener.

Images and accompanying generic descriptions are illustrative placeholders, not Hridita's actual process or designs. Replace them with her approved material. Both image sheets are displayed as separate photos using CSS cropping; no composite sheet is presented to visitors. Prompts, file paths, and quadrant mapping are in `process-provenance.md`.

## Assets

The About introduction uses brief first-person draft copy, as authorized by the user. Only Hridita's name and fashion-designer role are confirmed; the creative approach is proposed copy to review, not a verified biography. No education, location, clients, awards, or career history are asserted. Replace the draft with her approved introduction when available. The studio still life is labeled as an AI illustration, not her actual workspace. Its generation prompt is in `about-provenance.md`.

Fonts: Cormorant Garamond, DM Sans, and Allura, downloaded from Google Fonts. The portrait was created with built-in ImageGen; its prompt is in `asset-provenance.md`.

The Collections asset prompts and provenance are in `collections-provenance.md`.

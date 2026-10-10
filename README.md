# Hridita Haq — Fashion Designer

A single-page fashion portfolio with an ivory editorial introduction and a video-referenced runway Collections section. Remaining sections will follow their own supplied references.

## Preview

Run `npm run dev` from this directory and open http://127.0.0.1:4173. No dependencies or build step required. `npm run check` checks browser-script syntax.

## Edit

- `dist/index.html`: introduction, navigation, Collections markup, and dialogs.
- `dist/styles.css`: colors, typography, responsive layouts, and animations.
- `dist/app.js`: mobile navigation, upcoming-section dialogs, and pointer motion.
- `dist/collections.css`: responsive runway depth, look details, and collection dialog layouts.
- `dist/collections.js`: six-look carousel data, autoplay, keyboard controls, drag/swipe, and details.
- `dist/assets/`: self-hosted fonts and imagery.

The introduction contains an explicitly labeled AI-generated editorial placeholder, not a photo of Hridita. Replace it with her approved portrait and update the alt text and caption together. No services, project history, availability, or contact information have been invented. Navigation to unfinished sections opens clearly labeled coming-soon dialogs. Replace those with section anchors as each section is built.

Motion respects the operating system’s reduced-motion preference. Dialogs support Escape, focus return, and native keyboard focus containment. Mobile navigation is a disclosure with accessible expanded state.

## Collections

The supplied 6.71-second reference shows a fashion runway carousel: a large foreground model, increasingly small and faded previous looks on the left, and a garment-detail column on the right. This implementation follows that composition with 1-second depth transitions. The runway advances every 4.2 seconds while visible and pauses on hover, focus, manual navigation, a hidden tab, or an open look dialog. An explicit Play action resumes playback. Reduced-motion users start with autoplay disabled and see immediate look changes.

Six fictional concept looks are visibly labeled as AI imagery, not Hridita's actual designs. Replace the look data and transparent sheets with approved collection assets when supplied. Each three-model PNG is displayed using CSS background positioning without modifying the original generated asset. Use the dots, arrow buttons, left/right keys, or a horizontal drag/swipe to navigate. Vertical page scrolling stays native.

On Windows, prepend the installed `C:\Program Files\Git\bin` to the environment PATH and set `TAR_OPTIONS=--force-local` when invoking the official Sites source helper. These settings allow its Bash packager to handle Windows archive paths.

## Assets

Fonts: Cormorant Garamond, DM Sans, and Allura, downloaded from Google Fonts. The portrait was created with built-in ImageGen; its prompt is in `asset-provenance.md`.

The Collections asset prompts and provenance are in `collections-provenance.md`.

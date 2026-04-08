import type { CollectionConfig } from 'payload'

/**
 * Image size variants generated on every upload.
 *
 * All variants are converted to WebP for fast delivery.
 * Sizes are chosen to cover every use-case in the portfolio UI:
 *
 *  thumbnail  400×300   crop/cover  — admin list view, small card previews
 *  card       800×450   crop/cover  — project modal thumbnail (220 px tall slot)
 *  feature   1200×675   crop/cover  — large / hero displays (16:9)
 *  og        1200×630   crop/cover  — Open Graph / social sharing
 *
 * The original file is also kept as-is so the source is never discarded.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Show the thumbnail variant in the admin list view
    adminThumbnail: 'thumbnail',

    // Only allow image uploads (SVG excluded intentionally — sharp cannot resize it)
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],

    imageSizes: [
      // ── thumbnail ────────────────────────────────────────────────────────────
      // 400×300 · cover crop · WebP q80
      // Used for: admin panel list rows, small project card previews
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
          options: { quality: 80 },
        },
        admin: {
          disableListColumn: true,
          disableListFilter: true,
          disableGroupBy: true,
        },
      },

      // ── card ─────────────────────────────────────────────────────────────────
      // 800×450 · cover crop · WebP q82
      // Used for: project modal hero thumbnail slot (220 px rendered height)
      {
        name: 'card',
        width: 800,
        height: 450,
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
          options: { quality: 82 },
        },
        admin: {
          disableListColumn: true,
          disableListFilter: true,
          disableGroupBy: true,
        },
      },

      // ── feature ──────────────────────────────────────────────────────────────
      // 1200×675 · cover crop · WebP q85
      // Used for: large / hero display areas (16:9 aspect ratio)
      {
        name: 'feature',
        width: 1200,
        height: 675,
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
        admin: {
          disableListColumn: true,
          disableListFilter: true,
          disableGroupBy: true,
        },
      },

      // ── og ───────────────────────────────────────────────────────────────────
      // 1200×630 · cover crop · WebP q85
      // Used for: Open Graph / Twitter Card meta images
      {
        name: 'og',
        width: 1200,
        height: 630,
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
        admin: {
          disableListColumn: true,
          disableListFilter: true,
          disableGroupBy: true,
        },
      },
    ],
  },
}
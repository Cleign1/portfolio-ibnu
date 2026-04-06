import type { GlobalConfig } from 'payload'

export const HeroGlobal: GlobalConfig = {
  slug: 'hero',
  label: 'Hero Section',
  admin: {
    group: 'Portfolio Sections',
    description: 'Controls the hero/landing section of the portfolio.',
    // Live Preview — Payload embeds /preview/hero in an iframe and streams
    // postMessage updates so every field change reflects instantly.
    livePreview: {
      url: ({ req }) => {
        const baseURL = req?.headers?.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
        return `${baseURL}/preview/hero`
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    preview: (_, { req }) => {
      const baseURL = req?.headers?.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
      return `${baseURL}/preview/hero`
    },
  },
  versions: {
    max: 50,
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    // ─── Layout ────────────────────────────────────────────────────────────
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      required: true,
      defaultValue: 'withPhoto',
      options: [
        { label: 'Photo Right (default)', value: 'withPhoto' },
        { label: 'Centered (no photo)', value: 'centered' },
      ],
      admin: {
        description: 'Choose whether to display the profile photo alongside the content.',
      },
    },

    // ─── Identity ──────────────────────────────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          required: true,
          defaultValue: 'Alex',
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Last Name',
          required: true,
          defaultValue: 'Chen',
        },
      ],
    },
    {
      name: 'role',
      type: 'text',
      label: 'Job Title / Role',
      required: true,
      defaultValue: 'Product Designer & Frontend Developer',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Short Bio',
      required: true,
      defaultValue:
        'I design and build thoughtful digital products that solve real problems. Currently crafting user experiences at early-stage startups, with a focus on design systems and frontend architecture.',
    },

    // ─── Status Badge ──────────────────────────────────────────────────────
    {
      name: 'availableForWork',
      type: 'checkbox',
      label: 'Show "Available for work" badge',
      defaultValue: true,
    },

    // ─── CTAs ──────────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Call-to-Action Buttons',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'ctaLabel',
              type: 'text',
              label: 'Primary CTA Label',
              defaultValue: 'View my work',
            },
            {
              name: 'ctaTarget',
              type: 'text',
              label: 'Primary CTA Target (anchor or URL)',
              defaultValue: '#projects',
            },
          ],
        },
        {
          name: 'cvUrl',
          type: 'text',
          label: 'CV / Résumé URL',
          admin: {
            placeholder: 'https://...',
          },
        },
      ],
    },

    // ─── Social Links ──────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Social Links',
      fields: [
        {
          name: 'github',
          type: 'text',
          label: 'GitHub URL',
          admin: { placeholder: 'https://github.com/...' },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
          admin: { placeholder: 'https://linkedin.com/in/...' },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Contact Email',
          admin: { placeholder: 'you@example.com' },
        },
      ],
    },

    // ─── Photo ─────────────────────────────────────────────────────────────
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
      admin: {
        description: 'Only shown when layout is set to "Photo Right".',
        condition: (data) => data?.layout === 'withPhoto',
      },
    },
  ],
}

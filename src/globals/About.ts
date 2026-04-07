import type { GlobalConfig, Block } from 'payload'

const TextBlock: Block = {
  slug: 'text',
  labels: {
    singular: 'Text Block',
    plural: 'Text Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'isQuote',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'colSpan2',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Span 2 columns in the grid layout',
      },
    },
  ],
}

const InfoCardBlock: Block = {
  slug: 'infoCard',
  labels: {
    singular: 'Info Card',
    plural: 'Info Cards',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'Currently building',
    },
    {
      name: 'value',
      type: 'text',
      required: true,
    },
    {
      name: 'colSpan2',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

const TagsCardBlock: Block = {
  slug: 'tagsCard',
  labels: {
    singular: 'Tags Card',
    plural: 'Tags Cards',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'Open to',
    },
    {
      name: 'tags',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'colSpan2',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

const MediaCardBlock: Block = {
  slug: 'mediaCard',
  labels: {
    singular: 'Media Card',
    plural: 'Media Cards',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'Last played',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'colSpan2',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export const AboutGlobal: GlobalConfig = {
  slug: 'about',
  label: 'About Section',
  admin: {
    livePreview: {
      url: ({ req }) => {
        const baseURL =
          req?.headers?.get('origin') ??
          process.env.NEXT_PUBLIC_APP_URL ??
          'http://localhost:3000'
        return `${baseURL}/preview/about`
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    preview: (_, { req }) => {
      const baseURL =
        req?.headers?.get('origin') ??
        process.env.NEXT_PUBLIC_APP_URL ??
        'http://localhost:3000'
      return `${baseURL}/preview/about`
    },
  },
  versions: {
    max: 50,
    drafts: { autosave: true, schedulePublish: true },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'A bit about me',
    },
    {
      name: 'bentoBlocks',
      type: 'blocks',
      blocks: [TextBlock, InfoCardBlock, TagsCardBlock, MediaCardBlock],
    },
  ],
}

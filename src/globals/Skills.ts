import type { GlobalConfig, Block } from 'payload'

const SkillCategoryBlock: Block = {
  slug: 'skillCategory',
  labels: {
    singular: 'Skill Category',
    plural: 'Skill Categories',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'FRONTEND',
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        {
          name: 'skill',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const SkillsGlobal: GlobalConfig = {
  slug: 'skills',
  label: 'Skills Section',
  admin: {
    livePreview: {
      url: ({ req }) => {
        const baseURL =
          req?.headers?.get('origin') ??
          process.env.NEXT_PUBLIC_APP_URL ??
          'http://localhost:3000'
        return `${baseURL}/preview/skills`
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
      return `${baseURL}/preview/skills`
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
      defaultValue: 'What I work with',
    },
    {
      name: 'skillsBlocks',
      type: 'blocks',
      blocks: [SkillCategoryBlock],
    },
  ],
}

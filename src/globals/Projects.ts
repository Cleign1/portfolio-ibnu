import type { GlobalConfig, Block } from 'payload'

const ProjectItemBlock: Block = {
  slug: 'projectItem',
  labels: {
    singular: 'Project Item',
    plural: 'Project Items',
  },
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
      defaultValue: '01',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'caseStudy',
      type: 'group',
      fields: [
        { name: 'problem', type: 'text', required: true },
        { name: 'built', type: 'text', required: true },
        { name: 'result', type: 'text', required: true },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        { name: 'tag', type: 'text', required: true },
      ],
    },
    {
      name: 'githubUrl',
      type: 'text',
    },
    {
      name: 'liveUrl',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData) => Boolean(siblingData?.featured),
      },
    },
  ],
}

export const ProjectsGlobal: GlobalConfig = {
  slug: 'projects',
  label: 'Projects Section',
  admin: {
    livePreview: {
      url: ({ req }) => {
        const baseURL =
          req?.headers?.get('origin') ??
          process.env.NEXT_PUBLIC_APP_URL ??
          'http://localhost:3000'
        return `${baseURL}/preview/projects`
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
      return `${baseURL}/preview/projects`
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
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'PROJECTS',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Selected work',
    },
    {
      name: 'projectsBlocks',
      type: 'blocks',
      blocks: [ProjectItemBlock],
    },
  ],
}

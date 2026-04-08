import type { GlobalConfig, Block } from 'payload'

// ─── Blocks ───────────────────────────────────────────────────────────────────

/**
 * ProjectItem block — a single project card.
 * Supports featured flag, thumbnail, tags, STAR case study, and links.
 */
const ProjectItemBlock: Block = {
  slug: 'projectItem',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  fields: [
    // ── Identity ────────────────────────────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Display Number',
          required: true,
          defaultValue: '01',
          admin: {
            width: '33%',
            description: 'Shown on the list row (e.g. 01, 02 …)',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured project',
          defaultValue: false,
          admin: {
            width: '33%',
            description: 'Highlighted with a "Featured" badge and thumbnail preview.',
          },
        },
        {
          name: 'displayOrder',
          type: 'number',
          label: 'Display Order',
          defaultValue: 0,
          admin: {
            width: '33%',
            description: 'Lower numbers appear first in the list.',
          },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Project Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
      required: true,
      admin: {
        description: 'One or two sentences shown beneath the title on the list row.',
      },
    },

    // ── Thumbnail (featured only) ────────────────────────────────────────
    {
      name: 'thumbnail',
      type: 'upload',
      label: 'Thumbnail Image',
      relationTo: 'media',
    },

    // ── STAR Case Study ──────────────────────────────────────────────────
    {
      name: 'caseStudy',
      type: 'group',
      label: 'STAR Case Study',
      admin: {
        description:
          'Shown inside the project modal. Each section can be a full paragraph.',
      },
      fields: [
        {
          name: 'situation',
          type: 'textarea',
          label: 'Situation — context & background',
          required: true,
          admin: {
            description: 'Describe the situation or context you were working in.',
          },
        },
        {
          name: 'task',
          type: 'textarea',
          label: 'Task — your responsibility',
          required: true,
          admin: {
            description: 'What was your specific role or goal?',
          },
        },
        {
          name: 'action',
          type: 'textarea',
          label: 'Action — what you did',
          required: true,
          admin: {
            description: 'Describe the steps you took and decisions you made.',
          },
        },
        {
          name: 'result',
          type: 'textarea',
          label: 'Result — measurable outcome',
          required: true,
          admin: {
            description: 'What was the outcome? Include numbers where possible.',
          },
        },
      ],
    },

    // ── Tags ─────────────────────────────────────────────────────────────
    {
      name: 'tags',
      type: 'array',
      label: 'Tech Tags',
      admin: {
        description: 'Technology or tool labels shown as small badges.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          label: 'Tag',
        },
      ],
    },

    // ── Links ────────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Links',
      fields: [
        {
          name: 'githubUrl',
          type: 'text',
          label: 'GitHub Repository URL',
          admin: { placeholder: 'https://github.com/you/repo' },
        },
        {
          name: 'liveUrl',
          type: 'text',
          label: 'Live App / Demo URL',
          admin: { placeholder: 'https://your-app.com' },
        },
      ],
    },
  ],
}

// ─── Global ───────────────────────────────────────────────────────────────────

export const ProjectsGlobal: GlobalConfig = {
  slug: 'projects',
  label: 'Projects Section',
  admin: {
    group: 'Portfolio Sections',
    description: 'Manage the "Selected work" projects section — add, reorder, and edit projects.',
    livePreview: {
      url: ({ req }) => {
        const baseURL =
          req?.headers?.get('origin') ??
          process.env.NEXT_PUBLIC_APP_URL ??
          'http://localhost:3000'
        return `${baseURL}/preview/projects`
      },
      breakpoints: [
        { label: 'Mobile',  name: 'mobile',  width: 375,  height: 667  },
        { label: 'Tablet',  name: 'tablet',  width: 768,  height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900  },
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

  // ── Versioning + drafts ───────────────────────────────────────────────
  versions: {
    max: 50,
    drafts: {
      autosave: {
        interval: 800, // ms — debounce autosave
      },
      schedulePublish: true,
    },
  },

  // ── Access ────────────────────────────────────────────────────────────
  access: {
    read: () => true, // public read so the frontend can fetch
  },

  // ── Fields ────────────────────────────────────────────────────────────
  fields: [
    // ── Section header ──────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Section Header',
      admin: {
        initCollapsed: false,
        description: 'Controls the heading text displayed above the project list.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Eyebrow Label',
              required: true,
              defaultValue: 'PROJECTS',
              admin: {
                width: '50%',
                description: 'Small mono label above the title (e.g. PROJECTS).',
              },
            },
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
              required: true,
              defaultValue: 'Selected work',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'viewAllUrl',
          type: 'text',
          label: '"View all projects" link',
          admin: {
            placeholder: 'https://github.com/you?tab=repositories',
            description: 'Leave blank to hide the "View all projects" link.',
          },
        },
      ],
    },

    // ── Layout toggle ────────────────────────────────────────────────────
    {
      name: 'layout',
      type: 'select',
      label: 'List Layout',
      required: true,
      defaultValue: 'list',
      options: [
        { label: 'Minimal list (default)',       value: 'list'    },
        { label: 'Grid (2 columns)',              value: 'grid'    },
        { label: 'Featured first + list below',  value: 'feature' },
      ],
      admin: {
        description:
          'Controls how projects are rendered on the frontend. "Minimal list" mirrors the Figma design.',
      },
    },

    // ── Projects ─────────────────────────────────────────────────────────
    {
      name: 'projectsBlocks',
      type: 'blocks',
      label: 'Projects',
      blocks: [ProjectItemBlock],
      admin: {
        description: 'Add and reorder projects. Drag rows to change display order.',
        initCollapsed: false,
      },
    },
  ],
}

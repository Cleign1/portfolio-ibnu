import { Block, GlobalConfig } from 'payload'

export const RelevantExperienceItemBlock: Block = {
	slug: 'relevantExperienceItem',
	labels: {
		singular: 'Relevant Experience',
		plural: 'Relevant Experiences',
	},
	fields: [
		{
			name: 'company',
			type: 'text',
			required: true,
		},
		{
			name: 'role',
			type: 'text',
			required: true,
		},
		{
			name: 'dates',
			type: 'text',
			required: true,
		},
		{
			name: 'context',
			type: 'text',
		},
		{
			name: 'bullets',
			type: 'array',
			fields: [
				{
					name: 'bullet',
					type: 'text',
					required: true,
				},
			],
		},
		{
			name: 'tags',
			type: 'array',
			fields: [
				{
					name: 'tag',
					type: 'text',
					required: true,
				},
			],
		},
	],
}

export const RelevantExperienceGlobal: GlobalConfig = {
	slug: 'relevantExperience',
	label: 'Relevant Experience Section',
	admin: {
		livePreview: {
			url: ({ req }) => {
				const baseURL =
					req?.headers?.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
				return `${baseURL}/preview/relevant_experience`
			},
			breakpoints: [
				{ label: 'Mobile', name: 'mobile', width: 375, height: 667 },
				{ label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
				{ label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
			],
		},
		preview: (_, { req }) => {
			const baseURL =
				req?.headers?.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
			return `${baseURL}/preview/relevant_experience`
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
			defaultValue: "Where I've worked",
		},
		{
			name: 'relevantexperienceBlocks',
			type: 'blocks',
			blocks: [RelevantExperienceItemBlock],
		},
	],
}

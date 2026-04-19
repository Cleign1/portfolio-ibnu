import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { s3Storage } from '@payloadcms/storage-s3'
import { resendAdapter } from '@payloadcms/email-resend'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HeroGlobal } from './globals/Hero'
import { AboutGlobal } from './globals/About'
import { ExperienceGlobal } from './globals/Experience'
import { SkillsGlobal } from './globals/Skills'
import { ProjectsGlobal } from './globals/Projects'
import { RelevantExperienceGlobal } from './globals/RelevantExperience'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_APP_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  globals: [HeroGlobal, AboutGlobal, RelevantExperienceGlobal, ExperienceGlobal, SkillsGlobal, ProjectsGlobal],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename
            const safeKey = key
              .split('/')
              .map((segment) => encodeURIComponent(segment))
              .join('/')
            const baseURL = (process.env.R2_PUBLIC_URL || '').replace(/\/$/, '')
            return `${baseURL}/portfolio-ibnu/${safeKey}`
          },
        },
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || '',
    defaultFromAddress: process.env.EMAIL_FROM || '',
    defaultFromName: process.env.EMAIL_FROM_NAME || '',
  }),
})

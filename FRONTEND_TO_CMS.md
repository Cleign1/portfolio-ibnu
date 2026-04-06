# Frontend to Payload CMS Migration Guide

This guide provides a clear, step-by-step process for taking an existing static or hard-coded frontend component and converting it to be fully managed by Payload CMS with real-time Live Preview. You can use this process for any section of your site, just like we did for the `Hero` component.

---

## Step 1: Define the Payload Schema

First, map out the static content in your component (text, images, toggles) into Payload CMS fields. This is usually done by creating a **Global Config** (for singletons like a Hero or Footer) or a **Collection Config** (for recurring items like Projects or Posts).

1. Create a new file for your schema in `src/globals/` (or `src/collections/`).
2. Add your fields.
3. Configure **Live Preview** in the `admin` settings to point to a preview URL.

### Example: `src/globals/MySection.ts`

```typescript
import type { GlobalConfig } from 'payload'

export const MySectionGlobal: GlobalConfig = {
  slug: 'my-section',
  label: 'My Section',
  admin: {
    // Enable Live Preview in the Admin Panel
    livePreview: {
      url: ({ req }) => {
        const baseURL = req?.headers?.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
        return `${baseURL}/preview/my-section`
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    // The link the "Preview" button will open
    preview: (_, { req }) => {
      const baseURL = req?.headers?.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
      return `${baseURL}/preview/my-section`
    },
  },
  versions: {
    max: 50,
    drafts: { autosave: true, schedulePublish: true },
  },
  access: {
    read: () => true, // Ensure it can be read
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Default Title',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    // Add checkboxes, relationships to media, etc.
  ],
}
```

## Step 2: Register the Schema

Once your schema is created, tell Payload about it by adding it to your main configuration file.

1. Open `src/payload.config.ts`.
2. Import your new config.
3. Add it to the `globals` (or `collections`) array.

```typescript
import { MySectionGlobal } from './globals/MySection'

export default buildConfig({
  // ... other config
  globals: [
    // ... existing globals
    MySectionGlobal,
  ],
})
```

## Step 3: Generate TypeScript Types

Payload automatically generates TypeScript interfaces based on your schema. You must run this command so your frontend has strongly-typed access to your new fields.

Run this terminal command:
```bash
npm run generate:types
# OR
pnpm generate:types
```

*This updates `src/payload-types.ts` to include your new `MySection` interface.*

---

## Step 4: Create the Live Preview Client Component

In order to see live updates in the Payload Admin Panel *as you type*, you need a client-side wrapper that uses Payload's `useLivePreview` hook.

1. Create your component in `src/app/(frontend)/components/MySectionPreviewClient.tsx`.
2. Ensure you have `'use client'` at the very top.
3. Pass `initialData` to `useLivePreview` to handle the first render, and render your UI using the returned `data`.

### Example: `src/app/(frontend)/components/MySectionPreviewClient.tsx`

```tsx
'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { MySection } from '@/payload-types'

interface Props {
  initialData: MySection;
  serverURL: string;
}

export function MySectionPreviewClient({ initialData, serverURL }: Props) {
  // Hook listens to messages from the Payload Admin iframe
  const { data } = useLivePreview<MySection>({
    initialData,
    serverURL,
    depth: 1, // Depth to resolve relationships (e.g., Media)
  })

  // Optional: Provide fallbacks in case data hasn't been saved to DB yet
  const safeData: MySection = {
    ...data,
    title: data?.title || 'Default Title',
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold">{safeData.title}</h1>
        {safeData.description && (
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {safeData.description}
          </p>
        )}
      </div>
    </section>
  )
}
```

---

## Step 5: Create the Preview Route

This isolated route is specific for the Payload UI to embed in its internal `<iframe>`. It fetches the data from the Payload Local API and passes it to your preview client component.

1. Create a dynamic/static Next.js route, e.g., `src/app/(frontend)/preview/my-section/page.tsx`.

### Example: `src/app/(frontend)/preview/my-section/page.tsx`

```tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { MySectionPreviewClient } from '@/app/(frontend)/components/MySectionPreviewClient'

export default async function MySectionPreviewRoute() {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch from DB. Uses draft: true to ensure draft changes appear in the preview
  const initialData = await payload.findGlobal({
    slug: 'my-section',
    draft: true,
  })

  // Derive Server URL without trailing slash
  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return (
    <div className="preview-container bg-white dark:bg-black">
      <MySectionPreviewClient 
        initialData={initialData} 
        serverURL={serverURL} 
      />
    </div>
  )
}
```

---

## Step 6: Render in Your Main Application Layout

Now that Live Preview is set up, you can integrate this exact same pattern into your main application pages (e.g., your actual homepage `/app/(frontend)/(pages)/page.tsx`).

### Example: Your actual page (Server Component)

```tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { MySectionPreviewClient } from '@/app/(frontend)/components/MySectionPreviewClient'
import { draftMode } from 'next/headers'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = draftMode()

  // Always use the Local API to fetch details directly from Postgres/Database
  const mySectionData = await payload.findGlobal({
    slug: 'my-section',
    draft: isDraftMode, // Load drafts only if user is logged into admin and previewing
  })

  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return (
    <main>
      {/* Either use the pure static component, OR reuse the Client component so the real page is reactive to the CMS */}
      <MySectionPreviewClient 
        initialData={mySectionData} 
        serverURL={serverURL} 
      />
    </main>
  )
}
```

## Bonus Tips & Checks
- **Media Optimization:** When loading images in your component, check if `photo` is fully populated. It might be a string (ID) or an object (Media). Refer to the `HeroPreviewClient.tsx` pattern to see how Blob URLs from the Live Preview handles image sources.
- **Dark Mode:** If your frontend uses themes, handle them explicitly in the preview mode (for example, by forcing `class="dark"` into the `html` element upon mounting).
- **Access Control:** Do not pass the `user` flag into `findGlobal` inside public routes without `overrideAccess: false`, otherwise you could bypass authentication maliciously. Default behaviour inside `(frontend)` is to just read what is publicly available.

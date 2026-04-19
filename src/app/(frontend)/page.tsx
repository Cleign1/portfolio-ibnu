import { PageShell } from './components/PageShell'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Footer } from './components/Footer'
import { RelevantExperience } from './components/RelevantExperience'

/**
 * Homepage — Server Component.
 *
 * PageShell (Client) owns all interactive orchestration: navigation state,
 * terminal overlay, scroll animations. All section components remain RSCs and
 * are passed as children so they are never pulled into the client bundle.
 *
 * Skills section: add <Skills /> here once the component is ported.
 */
export default function HomePage() {
  return (
    <PageShell>
      <div id="hero">
        <Hero />
      </div>
      <About />
      <Experience />
      <RelevantExperience />
      <Skills />
      <Projects />
      <Footer />
    </PageShell>
  )
}

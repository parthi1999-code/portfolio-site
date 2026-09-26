import { useRef } from 'react'
import AboutText from '../components/AboutText.jsx'
import Traces from '../components/Traces.jsx'
import ScrambleText from '../components/ScrambleText.jsx'
import Reveal from '../components/Reveal.jsx'

const BIO =
  'Product Designer with 3+ years designing end-to-end across enterprise SaaS and consumer-facing digital products, from user research and interaction design through high-fidelity prototyping, pixel-perfect UI, and developer handoff. Built and scaled design systems for fast-moving product teams, and designed consumer content experiences for a digital publishing platform. Proactive owner of ambiguous problems, a close collaborator with PMs and engineers, and detail-obsessed about craft, interaction, and aesthetics.'

const SKILLS = [
  'User Research',
  'Interaction Design',
  'High-Fidelity Prototyping',
  'UI Design',
  'Design Systems',
  'Developer Handoff',
]

export default function About() {
  const scrambleRefs = useRef([])

  return (
    <article className="page about">
      <section className="about__hero">
        <Traces />
        <AboutText text={BIO} />
      </section>
      <section className="about__skills">
        <Reveal as="h2" className="about__skills-label" blur duration={0.9}>
          Skills
        </Reveal>
        <ul className="about__skills-list">
          {SKILLS.map((skill, i) => (
            <Reveal
              key={skill}
              as="li"
              y={16}
              duration={0.7}
              delay={i * 0.08}
              onMouseEnter={() => scrambleRefs.current[i]?.start()}
              onMouseLeave={() => scrambleRefs.current[i]?.reset()}
            >
              <ScrambleText ref={(el) => (scrambleRefs.current[i] = el)} text={skill} />
            </Reveal>
          ))}
        </ul>
      </section>
    </article>
  )
}

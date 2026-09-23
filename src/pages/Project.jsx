import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects.js'
import { slugifyHeading } from '../components/CaseStudyNav.jsx'
import Reveal from '../components/Reveal.jsx'
import ImageMarquee from '../components/ImageMarquee.jsx'
import GlowLines from '../components/GlowLines.jsx'
import ScrambleText from '../components/ScrambleText.jsx'
import CtaArrow from '../components/CtaArrow.jsx'
import NotFound from './NotFound.jsx'

function richText(text) {
  if (!text) return text
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}

function ProjectBlock({ block }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="project__block-paragraph">
          {block.bold ? (
            <>
              <strong>{block.bold}</strong>
              {block.text}
            </>
          ) : (
            richText(block.text)
          )}
        </p>
      )
    case 'feature':
      return (
        <div className="project__feature">
          <h3 className="project__feature-heading">{block.heading}</h3>
          <p className="project__feature-text">{block.text}</p>
        </div>
      )
    case 'list':
      return (
        <ul className="project__block-list">
          {block.items.map((item) => (
            <li key={item}>{richText(item)}</li>
          ))}
        </ul>
      )
    case 'image':
      return (
        <figure className="project__block-image">
          <img src={block.src} alt={block.alt || ''} loading="lazy" decoding="async" />
        </figure>
      )
    case 'video':
      return (
        <figure className="project__block-image">
          <video
            src={block.src}
            autoPlay
            muted
            loop
            playsInline
            aria-label={block.alt || ''}
          />
        </figure>
      )
    case 'stats':
      return (
        <div className="project__stats">
          {block.items.map((item) => (
            <div key={item.stat} className="project__stat">
              <div className="project__stat-number">{item.stat}</div>
              <div className="project__stat-label">{item.label}</div>
            </div>
          ))}
          {block.note && <p className="project__note">{block.note}</p>}
        </div>
      )
    case 'note':
      return <p className="project__note">{block.text}</p>
    case 'marquee':
      return <ImageMarquee images={block.images} speed={block.speed} variant={block.variant} />
    case 'subhead':
      return <h3 className="project__block-subhead">{block.text}</h3>
    case 'table':
      return (
        <div className="project__table-wrap">
          <table className="project__table">
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

function SectionBody({ section }) {
  return (
    <>
      {!section.hideHeading && <h2 className="project__section-label">{section.heading}</h2>}
      <div className="project__section-content">
        {section.subheading && (
          <p className="project__section-subheading">{section.subheading}</p>
        )}
        {section.blocks
          ? section.blocks.map((block, i) => <ProjectBlock key={i} block={block} />)
          : <p>{section.body}</p>}
      </div>
    </>
  )
}

export default function Project() {
  const { slug } = useParams()
  const nextScrambleRef = useRef(null)
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <NotFound />

  const list = projects.filter((p) => p.cover)
  const listIndex = list.findIndex((p) => p.slug === project.slug)
  const indexLabel = String(listIndex >= 0 ? listIndex + 1 : 1).padStart(2, '0')
  const next = listIndex >= 0 ? list[(listIndex + 1) % list.length] : null

  return (
    <article className="page project">
      <div className="project__inner">
        <Link to="/" className="back-link">&larr; Back to home</Link>
        <header className="project__header">
          <div className="project__title-row">
            <h1>{project.title}</h1>
            <span className="project__index" aria-hidden="true">{indexLabel}</span>
          </div>
          <p className="project__tagline">{project.tagline}</p>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="project__live-link"
            >
              Visit Live Site ↗
            </a>
          )}
          <dl className="project__meta">
            {project.role && (
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            {project.duration && (
              <div>
                <dt>Duration</dt>
                <dd>{project.duration}</dd>
              </div>
            )}
            {project.tags && project.tags.length > 0 && (
              <div>
                <dt>Focus</dt>
                <dd>{project.tags.join(', ')}</dd>
              </div>
            )}
          </dl>
        </header>

        {project.cover ? (
          <Reveal as="img" className="project__cover" src={project.cover} alt="" />
        ) : null}

        {project.overview && <p className="project__overview">{project.overview}</p>}

        {project.sections.map((section, idx) => {
          if (section.layout === 'row') {
            return (
              <div key={idx} className="project__row">
                {section.items.map((item) => (
                  <Reveal
                    key={item.heading}
                    as="section"
                    id={slugifyHeading(item.heading)}
                    className="project__section project__section--col"
                  >
                    <SectionBody section={item} />
                  </Reveal>
                ))}
              </div>
            )
          }
          return (
            <Reveal
              key={section.heading}
              as="section"
              id={slugifyHeading(section.heading)}
              className={`project__section${section.hideHeading ? ' project__section--full' : ''}`}
            >
              <SectionBody section={section} />
            </Reveal>
          )
        })}

        {next && (
          <Reveal as="div" className="project__next">
            <span className="project__next-label">
              Next case <span className="dim">[ {next.title.toUpperCase()} ]</span>
            </span>
            <Link
              to={`/work/${next.slug}`}
              className="project__next-btn"
              onMouseEnter={() => nextScrambleRef.current?.start()}
              onMouseLeave={() => nextScrambleRef.current?.reset()}
            >
              <GlowLines />
              <ScrambleText ref={nextScrambleRef} text="See the next case" />
              <span className="project__next-arrow" aria-hidden="true">
                <CtaArrow />
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  )
}

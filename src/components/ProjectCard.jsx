import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <Link to={`/work/${project.slug}`} className="card">
      <div className="card__cover" aria-hidden="true">
        {project.cover ? <img src={project.cover} alt="" loading="lazy" decoding="async" /> : null}
      </div>
      <div className="card__body">
        <span className="card__label">{project.cardLabel || project.title}</span>
        <h3>{project.cardHeadline || project.tagline}</h3>
      </div>
    </Link>
  )
}

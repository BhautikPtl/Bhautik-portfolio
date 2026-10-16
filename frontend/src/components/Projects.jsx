import React, { useEffect, useRef, useState } from 'react';
import { BACKEND_URL, projectsAPI } from '../utils/api';
import { Github, ExternalLink } from 'lucide-react';

const getImageUrl = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `${BACKEND_URL}${image}`;
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await projectsAPI.getAll();
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          el.querySelectorAll('.reveal').forEach(r => r.classList.add('in'));
        }
      }),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [projects]);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="kicker">Work</p>
          <h2>Selected projects &amp; builds.</h2>
          <p>
            A hand-picked selection of real-world projects — from full-stack web apps to API-driven
            platforms built with the MERN stack.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}
        >
          {projects.length > 0
            ? projects.map((project, index) => (
              <ProjectRow key={project._id} project={project} index={index} />
            ))
            : [1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                style={{
                  height: 80,
                  background: 'var(--panel)',
                  borderRadius: 14,
                  border: '1px solid var(--line)',
                  opacity: 0.5,
                }}
              />
            ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #projects .wrap > div[style*="grid"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          #projects .wrap > div[style*="grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

const ProjectRow = ({ project, index }) => {
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];

  return (
    <div
      className="project-card reveal"
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      {project.image && (
        <img
          src={getImageUrl(project.image)}
          alt={project.title}
          loading="lazy"
          className="project-card-image"
        />
      )}
      <div className="project-card-content">
        <div className="work-name">{project.title}</div>
        <p className="project-card-description">{project.description}</p>
        <span className="work-url">
          {techStack.slice(0, 3).join(' · ')}
        </span>
      </div>
      <div className="project-card-actions">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--dim)',
              transition: '.2s',
              display: 'flex',
              alignItems: 'center',
            }}
            title="GitHub"
            onMouseEnter={e => e.currentTarget.style.color = 'var(--txt)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
            onClick={e => e.stopPropagation()}
          >
            <Github size={16} />
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--dim)',
              transition: '.2s',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Live"
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
            onClick={e => e.stopPropagation()}
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default Projects;

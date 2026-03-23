import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Container, GradientText, Section } from '../../components/ui/Button';
import { fadeInUp } from '../../utils/animations';
import { projectsAPI } from '../../utils/api';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { Spinner } from '../../components/ui/Modal';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await projectsAPI.getById(id);
        setProject(res.data);
      } catch (error) {
        console.error('Error fetching project:', error);
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  if (loading) {
    return <div className="bg-space-darker min-h-screen pt-24 flex items-center justify-center"><Spinner size="lg" /></div>;
  }

  if (!project) {
    return <div className="bg-space-darker min-h-screen pt-24 text-center text-gray-400">Project not found</div>;
  }

  return (
    <div className="bg-space-darker min-h-screen pt-24">
      <Section>
        <Container>
          <motion.button
            onClick={() => navigate('/projects')}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-electric-blue hover:text-neon-purple transition mb-8"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={project.image}
              alt={project.name}
              className="w-full h-96 object-cover rounded-2xl mb-8"
            />

            <h1 className="text-5xl font-bold text-white mb-4">
              <GradientText>{project.name}</GradientText>
            </h1>

            <p className="text-xl text-gray-400 mb-8">{project.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-space-dark/40 border border-neon-purple/20 rounded-xl p-6">
                <h3 className="text-electric-blue font-bold mb-4">Technologies</h3>
                <ul className="space-y-2 text-gray-300">
                  {project.technologies?.map((tech, idx) => (
                    <li key={idx}>• {tech}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-space-dark/40 border border-neon-purple/20 rounded-xl p-6">
                <h3 className="text-electric-blue font-bold mb-4">Duration</h3>
                <p className="text-gray-300">{project.duration || 'N/A'}</p>
              </div>

              <div className="bg-space-dark/40 border border-neon-purple/20 rounded-xl p-6">
                <h3 className="text-electric-blue font-bold mb-4">Status</h3>
                <p className="text-gray-300">{project.status || 'Completed'}</p>
              </div>
            </div>

            {project.features && (
              <>
                <h2 className="text-3xl font-bold text-white mb-6">
                  <GradientText>Features</GradientText>
                </h2>
                <ul className="space-y-3 mb-12">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-300">
                      <span className="text-electric-blue">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="flex gap-4">
              {project.githubLink && (
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-semibold transition-all duration-300 rounded-lg flex items-center gap-2 bg-electric-blue hover:shadow-glow-blue text-white px-6 py-3 text-base"
                >
                  <Github size={20} />
                  View Code
                </motion.a>
              )}
              {project.liveLink && (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-semibold transition-all duration-300 rounded-lg flex items-center gap-2 border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-6 py-3 text-base"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </motion.a>
              )}
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
};

export default ProjectDetailPage;

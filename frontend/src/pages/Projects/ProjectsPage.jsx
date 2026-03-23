import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button, Container, GradientText, Section } from '../../components/ui/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { ProjectCard, CertificateCard } from '../../components/ui/Cards';
import { projectsAPI, certificatesAPI } from '../../utils/api';
import { Spinner } from '../../components/ui/Modal';
import { useNavigate } from 'react-router-dom';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, certRes] = await Promise.all([
          projectsAPI.getAll(),
          certificatesAPI.getAll(),
        ]);
        setProjects(projRes.data);
        setCertificates(certRes.data);
      } catch (error) {
        console.error('Error fetching:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-space-darker min-h-screen pt-24 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-space-darker min-h-screen pt-24">
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              My <GradientText>Projects</GradientText>
            </h1>
            <p className="text-xl text-gray-400">
              Crafted with precision, built with passion
            </p>
          </motion.div>

          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg mb-4">No projects yet. Check back soon!</p>
              <Button onClick={() => navigate('/admin')}>Add Projects</Button>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, idx) => (
                <motion.div
                  key={project._id}
                  variants={fadeInUp}
                  onClick={() => navigate(`/project/${project._id}`)}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </Section>

      <Section id="certificates" className="py-20 bg-space-dark/50">
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-12 text-center"
          >
            My <GradientText>Certificates</GradientText>
          </motion.h2>

          {certificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No certificates yet.</p>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {certificates.map((cert) => (
                <CertificateCard
                  key={cert._id}
                  certificate={cert}
                  onClick={() => setSelectedCert(cert)}
                />
              ))}
            </motion.div>
          )}
        </Container>
      </Section>

      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full"
          >
            <img
              src={selectedCert.image}
              alt={selectedCert.issuer}
              className="w-full rounded-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

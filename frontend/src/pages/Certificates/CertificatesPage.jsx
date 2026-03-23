import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button, Container, GradientText, Section } from '../../components/ui/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { CertificateCard } from '../../components/ui/Cards';
import { certificatesAPI } from '../../utils/api';
import { Spinner } from '../../components/ui/Modal';

export const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await certificatesAPI.getAll();
        setCertificates(res.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
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
      <Section id="certificates">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              My <GradientText>Certificates</GradientText>
            </h1>
            <p className="text-xl text-gray-400">
              Professional certifications and achievements
            </p>
          </motion.div>

          {certificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg mb-4">No certificates added yet.</p>
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
                <motion.div
                  key={cert._id}
                  variants={fadeInUp}
                  onClick={() => setSelectedCert(cert)}
                >
                  <CertificateCard certificate={cert} />
                </motion.div>
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
            {selectedCert.image && (
              <img
                src={selectedCert.image}
                alt={selectedCert.issuer}
                className="w-full rounded-2xl"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

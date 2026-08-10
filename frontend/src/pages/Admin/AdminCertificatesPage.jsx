import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Container, Section } from '../../components/ui/Button';
import { certificatesAPI } from '../../utils/api';
import { Trash2, Edit2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { Modal } from '../../components/ui/Modal';

const getInitials = (title = '') => {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

const AVATAR_COLORS = [
  'from-fuchsia-400 to-violet-400',
  'from-sky-400 to-cyan-400',
  'from-emerald-400 to-teal-400',
  'from-amber-400 to-orange-400',
];

export const AdminCertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState({
    title: '', issuer: '', date: '', image: null
  });
  const { showToast } = useToast();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await certificatesAPI.getAll();
      setCertificates(res.data);
    } catch (error) {
      showToast('Error loading certificates', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('issuer', formData.issuer);
      form.append('date', formData.date);
      if (formData.image) form.append('image', formData.image);

      if (editingCert) {
        await certificatesAPI.update(editingCert._id, form);
        showToast('Certificate updated!', 'success');
      } else {
        await certificatesAPI.create(form);
        showToast('Certificate created!', 'success');
      }

      setIsModalOpen(false);
      setEditingCert(null);
      setFormData({ title: '', issuer: '', date: '', image: null });
      fetchCertificates();
    } catch (error) {
      showToast('Error saving certificate', 'error');
    }
  };

  const handleEdit = (cert) => {
    setEditingCert(cert);
    setFormData({ title: cert.title, issuer: cert.issuer, date: cert.date, image: null });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this certificate?')) {
      try {
        await certificatesAPI.delete(id);
        showToast('Certificate deleted!', 'success');
        fetchCertificates();
      } catch (error) {
        showToast('Error deleting certificate', 'error');
      }
    }
  };

  return (
    <div className="bg-space-darker min-h-screen pt-24">
      <Section>
        <Container>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Manage Certificates</h1>
            <Button onClick={() => {
              setEditingCert(null);
              setFormData({ title: '', issuer: '', date: '', image: null });
              setIsModalOpen(true);
            }}>
              + Add Certificate
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No certificates yet. Add one!</div>
          ) : (
            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ y: -2 }}
                  className="bg-space-dark/40 backdrop-blur-lg border border-neon-purple/20 rounded-3xl p-4 sm:p-5"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div
                      className={`h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br ${AVATAR_COLORS[index % AVATAR_COLORS.length]} text-slate-900 font-black text-xl flex items-center justify-center shrink-0`}
                    >
                      {getInitials(cert.title || cert.issuer)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-xl leading-tight truncate">{cert.title}</h3>
                      <p className="text-slate-300 text-lg truncate mt-1">{cert.issuer}</p>
                      <p className="text-slate-500 text-sm tracking-[0.18em] uppercase mt-2">{cert.date}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEdit(cert)}
                        className="h-10 w-10 rounded-xl bg-electric-blue/15 text-electric-blue grid place-items-center hover:bg-electric-blue/25 transition-colors"
                        title="Edit certificate"
                      >
                        <Edit2 size={17} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDelete(cert._id)}
                        className="h-10 w-10 rounded-xl bg-red-500/15 text-red-400 grid place-items-center hover:bg-red-500/25 transition-colors"
                        title="Delete certificate"
                      >
                        <Trash2 size={17} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCert ? 'Edit Certificate' : 'Add Certificate'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Certificate Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-space-darker/50 border border-neon-purple/20 rounded-lg px-4 py-2 text-white"
            required
          />
          <input
            type="text"
            placeholder="Issuer Name"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            className="w-full bg-space-darker/50 border border-neon-purple/20 rounded-lg px-4 py-2 text-white"
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-space-darker/50 border border-neon-purple/20 rounded-lg px-4 py-2 text-white"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            className="w-full bg-space-darker/50 border border-neon-purple/20 rounded-lg px-4 py-2 text-white"
          />
          <div className="flex gap-3">
            <Button type="submit">Save</Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

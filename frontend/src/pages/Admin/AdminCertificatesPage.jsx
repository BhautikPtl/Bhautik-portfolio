import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Container, Section } from '../../components/ui/Button';
import { certificatesAPI } from '../../utils/api';
import { Trash2, Edit2, FileText } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { Modal } from '../../components/ui/Modal';

export const AdminCertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState({
    title: '', issuer: '', date: '', image: null
  });
  const { toasts, showToast } = useToast();

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.map(cert => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-space-dark/40 border border-neon-purple/20 rounded-xl overflow-hidden group"
                >
                  {cert.image && (cert.image.toLowerCase().endsWith('.pdf') ? (
                    <div className="w-full h-48 flex items-center justify-center bg-slate-800">
                      <FileText size={48} className="text-cyan-500" />
                    </div>
                  ) : (
                    <img
                      src={cert.image && (cert.image.startsWith('http') ? cert.image : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${cert.image}`)}
                      alt={cert.issuer}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform"
                    />
                  ))}
                  <div className="p-4 flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold tracking-wider">{cert.issuer}</h3>
                      <p className="text-gray-400 text-sm">{cert.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEdit(cert)}
                        className="p-1.5 bg-electric-blue/20 text-electric-blue rounded hover:bg-electric-blue/30"
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDelete(cert._id)}
                        className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                      >
                        <Trash2 size={16} />
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

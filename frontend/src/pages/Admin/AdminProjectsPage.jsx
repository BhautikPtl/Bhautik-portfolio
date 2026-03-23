import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Container, Section } from '../../components/ui/Button';
import { projectsAPI } from '../../utils/api';
import { Trash2, Edit2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { Modal } from '../../components/ui/Modal';

export const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', technologies: '', githubLink: '', liveLink: ''
  });
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getAll();
      setProjects(res.data);
    } catch (error) {
      showToast('Error loading projects', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()),
      };

      if (editingProject) {
        await projectsAPI.update(editingProject._id, data);
        showToast('Project updated!', 'success');
      } else {
        await projectsAPI.create(data);
        showToast('Project created!', 'success');
      }

      setIsModalOpen(false);
      setEditingProject(null);
      setFormData({ name: '', description: '', technologies: '', githubLink: '', liveLink: '' });
      fetchProjects();
    } catch (error) {
      showToast('Error saving project', 'error');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technologies: project.technologies?.join(', ') || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this project?')) {
      try {
        await projectsAPI.delete(id);
        showToast('Project deleted!', 'success');
        fetchProjects();
      } catch (error) {
        showToast('Error deleting project', 'error');
      }
    }
  };

  return (
    <div className="bg-space-darker min-h-screen pt-24">
      <Section>
        <Container>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Manage Projects</h1>
            <Button onClick={() => {
              setEditingProject(null);
              setFormData({ name: '', description: '', technologies: '', githubLink: '', liveLink: '' });
              setIsModalOpen(true);
            }}>
              + Add Project
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No projects yet. Add one!</div>
          ) : (
            <div className="space-y-4">
              {projects.map(project => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-space-dark/40 border border-neon-purple/20 rounded-xl p-6 flex justify-between items-start"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                    <div className="flex gap-2 mt-3">
                      {project.technologies?.map(tech => (
                        <span key={tech} className="text-xs bg-electric-blue/20 text-electric-blue px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(project)}
                      className="p-2 bg-electric-blue/20 text-electric-blue rounded-lg hover:bg-electric-blue/30 transition"
                    >
                      <Edit2 size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(project._id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProject ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Project Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-space-darker/50 border border-neon-purple/20 rounded-lg px-4 py-2 text-white"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-space-darker/50 border border-neon-purple/20 rounded-lg px-4 py-2 text-white"
            required
          />
          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            className="w-full bg-space-darker/50 border border-neon-purple/20 rounded-lg px-4 py-2 text-white"
          />
          <input
            type="url"
            placeholder="GitHub Link"
            value={formData.githubLink}
            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
            className="w-full bg-space-darker/50 border border-neon-purple/20 rounded-lg px-4 py-2 text-white"
          />
          <input
            type="url"
            placeholder="Live Link"
            value={formData.liveLink}
            onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
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

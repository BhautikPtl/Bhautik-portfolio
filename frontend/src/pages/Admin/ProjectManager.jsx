import React, { useEffect, useState } from 'react';
import { Plus, Trash, Edit, X, Save, Image as ImageIcon, Briefcase } from 'lucide-react';
import { projectsAPI } from '../../utils/api';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
   const [formData, setFormData] = useState({
    title: '', description: '', githubLink: '', liveLink: '', techStack: '', image: null
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await projectsAPI.getAll();
      setProjects(data);
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'techStack') {
        const techStackArray = formData.techStack.split(',').map(s => s.trim()).filter(Boolean);
        techStackArray.forEach(tech => data.append('techStack[]', tech));
      } else if (key === 'image') {
        if (formData.image instanceof File) {
          data.append('image', formData.image);
        }
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, data);
        alert('Project updated successfully!');
      } else {
        await projectsAPI.create(data);
        alert('Project created successfully!');
      }
      setIsModalOpen(false);
      fetchProjects();
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      fetchProjects();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', githubLink: '', liveLink: '', techStack: '', image: null });
    setEditingProject(null);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold italic">Manage Projects</h1>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p._id} className="glass-card p-6 rounded-[2rem] group flex flex-col border border-white/5 hover:border-cyan-500/30 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                 <Briefcase size={24}/>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{p.title}</h3>
            <p className="text-sm text-slate-400 line-clamp-2 mb-4">{p.description}</p>
            <div className="flex items-center gap-2 mt-auto">
              <button 
                onClick={() => { 
                  setEditingProject(p); 
                  const techStr = Array.isArray(p.techStack) ? p.techStack.join(', ') : (typeof p.techStack === 'string' ? p.techStack : '');
                  setFormData({...p, techStack: techStr}); 
                  setIsModalOpen(true); 
                }} 
                className="flex-1 py-2 px-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
              >
                <Edit size={14}/> Edit
              </button>
              <button 
                onClick={() => handleDelete(p._id)} 
                className="py-2 px-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all text-sm font-medium"
              >
                <Trash size={14}/> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="max-w-xl w-full glass p-6 lg:p-10 rounded-2xl lg:rounded-[2.5rem] relative mx-4">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X size={24}/></button>
            <h2 className="text-2xl font-black mb-8 italic"> {editingProject ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSave} className="space-y-4 lg:space-y-6">
              <input required placeholder="Project Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-slate-900 border border-white/5 p-4 rounded-xl lg:rounded-2xl w-full"/>
              <textarea required placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-slate-900 border border-white/5 p-4 rounded-xl lg:rounded-2xl w-full h-32"></textarea>
              <input placeholder="Tech Stack (comma separated)" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="bg-slate-900 border border-white/5 p-4 rounded-xl lg:rounded-2xl w-full"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                 <input placeholder="GitHub Link" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} className="bg-slate-900 border border-white/5 p-4 rounded-xl lg:rounded-2xl w-full"/>
                 <input placeholder="Live Link" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="bg-slate-900 border border-white/5 p-4 rounded-xl lg:rounded-2xl w-full"/>
              </div>
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-white/5">
                 <input type="file" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="hidden" id="project-img"/>
                 <label htmlFor="project-img" className="cursor-pointer">
                    <ImageIcon className="mx-auto mb-4 text-slate-500" size={40}/>
                    <div className="text-slate-400">{formData.image ? (formData.image instanceof File ? formData.image.name : 'Image already exists. Click to change.') : 'Click to upload project image'}</div>
                 </label>
              </div>
              <button type="submit" className="w-full py-4 bg-cyan-500 text-slate-950 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all uppercase tracking-widest"><Save size={20}/> Save Project</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;

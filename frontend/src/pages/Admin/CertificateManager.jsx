import React, { useEffect, useState } from 'react';
import { Plus, Trash, X, Save, Image as ImageIcon, Calendar, FileText } from 'lucide-react';
import { certificatesAPI } from '../../utils/api';

const CertificateManager = () => {
  const [certificates, setCertificates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', issuer: '', date: '', image: null });

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    try {
      const { data } = await certificatesAPI.getAll();
      setCertificates(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    try {
      await certificatesAPI.create(data);
      setIsModalOpen(false);
      fetchCerts();
      setFormData({ title: '', issuer: '', date: '', image: null });
      alert('Certificate saved successfully!');
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.message;
      alert(`Error saving certificate!\nStatus: ${err.response?.status || 'Network Error'}\nMessage: ${serverMsg}`);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await certificatesAPI.delete(id);
      fetchCerts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold italic">Manage Certificates</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-6 py-3 bg-purple-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition"
        >
          <Plus size={20} /> Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map(c => (
          <div key={c._id} className="glass p-4 rounded-3xl group">
            <div className="h-40 rounded-2xl overflow-hidden mb-4">
               <div className="w-full h-full flex items-center justify-center bg-slate-800">
                 {c.image && c.image.toLowerCase().endsWith('.pdf') ? (
                   <FileText size={40} className="text-cyan-500" />
                 ) : (
                   <img src={c.image && (c.image.startsWith('http') ? c.image : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${c.image}`)} className="w-full h-full object-cover" alt={c.title} />
                 )}
               </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-bold mb-1 tracking-wider">{c.title}</h3>
                <div className="text-xs text-purple-400 font-bold uppercase tracking-wider">{c.issuer}</div>
              </div>
              <button 
                onClick={() => handleDelete(c._id)} 
                className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all group"
                title="Delete Certificate"
              >
                <Trash size={18} className="transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="max-w-xl w-full glass p-6 lg:p-10 rounded-2xl lg:rounded-[2.5rem] relative mx-4">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X/></button>
            <h2 className="text-2xl font-bold mb-8 italic">Add New Certificate</h2>
            
            <form onSubmit={handleSave} className="space-y-4 lg:space-y-6">
              <input required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-slate-900 border border-white/5 p-4 rounded-xl lg:rounded-2xl w-full shadow-inner"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                 <input required placeholder="Issuer" value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="bg-slate-900 border border-white/5 p-4 rounded-xl lg:rounded-2xl w-full shadow-inner"/>
                 <input required type="text" placeholder="Format: Jan 2024" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="bg-slate-900 border border-white/5 p-4 rounded-xl lg:rounded-2xl w-full shadow-inner"/>
              </div>
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 lg:p-8 text-center bg-white/5 hover:bg-white/10 transition-colors">
                 <input type="file" required accept="image/*,application/pdf" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="hidden" id="cert-img"/>
                 <label htmlFor="cert-img" className="cursor-pointer block">
                    <ImageIcon className="mx-auto mb-4 text-slate-500" size={40}/>
                    <div className="text-slate-400 text-sm">{formData.image ? formData.image.name : 'Click icon to upload certificate (Image or PDF)'}</div>
                 </label>
              </div>
              <button type="submit" className="w-full py-4 bg-purple-600 rounded-2xl font-bold flex items-center justify-center gap-2 transition hover:bg-purple-700 active:scale-95 shadow-lg shadow-purple-500/20 uppercase tracking-widest"><Save size={20}/> Save Certificate</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateManager;

import React, { useEffect, useState } from 'react';
import { Plus, Trash, X, Save, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { certificatesAPI } from '../../utils/api';

const getInitials = (text = '') => {
  return text
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

const BADGE_COLORS = [
  'from-violet-300 to-fuchsia-400',
  'from-cyan-300 to-sky-400',
  'from-emerald-300 to-teal-400',
  'from-amber-300 to-orange-400',
];

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

      <div className="space-y-4">
        {certificates.map((c, index) => {
          const certUrl = c.image
            ? (c.image.startsWith('http') ? c.image : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${c.image}`)
            : '';

          return (
            <div
              key={c._id}
              className="rounded-3xl px-4 py-4 sm:px-6 sm:py-5 transition-all"
              style={{
                background: 'var(--panel)',
                border: '1px solid var(--line)',
              }}
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <div
                  className={`h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-2xl bg-gradient-to-br ${BADGE_COLORS[index % BADGE_COLORS.length]} text-slate-900 font-black text-xl flex items-center justify-center`}
                >
                  {getInitials(c.title || c.issuer)}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl font-semibold leading-tight truncate" style={{ color: 'var(--txt)' }}>
                    {c.title}
                  </h3>
                  <p className="mt-1 text-xl truncate" style={{ color: 'var(--muted)' }}>{c.issuer}</p>
                  <p className="mt-2 text-sm tracking-[0.22em] uppercase" style={{ color: 'var(--dim)' }}>{c.date}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {certUrl && (
                    <a
                      href={certUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl grid place-items-center transition-colors"
                      style={{ color: 'var(--dim)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-2)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--dim)'; }}
                      title="Open certificate"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="h-10 w-10 rounded-xl text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 grid place-items-center transition-colors"
                    title="Delete Certificate"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="max-w-xl w-full glass p-6 lg:p-10 rounded-2xl lg:rounded-[2.5rem] relative mx-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6"
              style={{ color: 'var(--dim)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--txt)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--dim)'; }}
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-8 italic" style={{ color: 'var(--txt)' }}>Add New Certificate</h2>
            
            <form onSubmit={handleSave} className="space-y-4 lg:space-y-6">
              <input
                required
                placeholder="Title"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="p-4 rounded-xl lg:rounded-2xl w-full"
                style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)', color: 'var(--txt)' }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                 <input
                   required
                   placeholder="Issuer"
                   value={formData.issuer}
                   onChange={e => setFormData({...formData, issuer: e.target.value})}
                   className="p-4 rounded-xl lg:rounded-2xl w-full"
                   style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)', color: 'var(--txt)' }}
                 />
                 <input
                   required
                   type="text"
                   placeholder="Format: Jan 2024"
                   value={formData.date}
                   onChange={e => setFormData({...formData, date: e.target.value})}
                   className="p-4 rounded-xl lg:rounded-2xl w-full"
                   style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)', color: 'var(--txt)' }}
                 />
              </div>
              <div
                className="border-2 border-dashed rounded-2xl p-6 lg:p-8 text-center transition-colors"
                style={{ borderColor: 'var(--line)', background: 'var(--bg-soft)' }}
              >
                 <input type="file" required accept="image/*,application/pdf" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="hidden" id="cert-img"/>
                 <label htmlFor="cert-img" className="cursor-pointer block">
                    <ImageIcon className="mx-auto mb-4" style={{ color: 'var(--dim)' }} size={40}/>
                    <div className="text-sm" style={{ color: 'var(--muted)' }}>{formData.image ? formData.image.name : 'Click icon to upload certificate (Image or PDF)'}</div>
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

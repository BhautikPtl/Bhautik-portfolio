import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Container, Section } from '../../components/ui/Button';
import axios from 'axios';
import { API_URL, BACKEND_URL } from '../../utils/api';
import { useToast } from '../../hooks/useToast';
import { Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminProfilePage = () => {
  const [profile, setProfile] = useState({ name: '', title: '', bio: '', profilePicture: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/profile`);
      setProfile(data);
      const isUploaded = data.profilePicture.startsWith('/uploads');
      setPreviewUrl(isUploaded ? `${BACKEND_URL}${data.profilePicture}` : data.profilePicture);
    } catch (error) {
      showToast('Error loading profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('title', profile.title);
    formData.append('bio', profile.bio);
    if (selectedFile) {
      formData.append('profilePicture', selectedFile);
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_URL}/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast('Error updating profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="bg-space-darker min-h-screen pt-24 pb-12">
      <Section>
        <Container>
          <motion.button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Dashboard
          </motion.button>

          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-black text-white mb-8 tracking-tighter">Profile Settings</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8 bg-space-dark/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 p-1 bg-slate-900 shadow-2xl">
                    <img 
                      src={previewUrl || '/profile.jpeg'} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <label className="absolute bottom-2 right-2 p-3 bg-primary text-slate-950 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                    <Camera size={20} />
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                </div>
                <p className="mt-4 text-slate-400 text-sm">Upload a professional headshot</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Profile Bio</label>
                  <textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary transition-all outline-none min-h-[160px]"
                    placeholder="Building performance-driven web experiences with modern architecture and cutting-edge technologies. Pursuing BCA with a focus on scalable full-stack systems."
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-4 rounded-xl flex items-center justify-center gap-2"
                disabled={isSaving}
              >
                <Save size={20} />
                {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
              </Button>
            </form>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default AdminProfilePage;

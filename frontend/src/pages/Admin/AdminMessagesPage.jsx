import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Container, Section } from '../../components/ui/Button';
import { messagesAPI } from '../../utils/api';
import { Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toasts, showToast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await messagesAPI.getAll();
      setMessages(res.data);
    } catch (error) {
      showToast('Error loading messages', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this message?')) {
      try {
        await messagesAPI.delete(id);
        showToast('Message deleted!', 'success');
        fetchMessages();
      } catch (error) {
        showToast('Error deleting message', 'error');
      }
    }
  };

  return (
    <div className="bg-space-darker min-h-screen pt-24">
      <Section>
        <Container>
          <h1 className="text-4xl font-bold text-white mb-8">Contact Messages ({messages.length})</h1>

          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No messages yet</div>
          ) : (
            <div className="space-y-4">
              {messages.map(msg => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-space-dark/40 border border-neon-purple/20 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                      <p className="text-sm text-gray-400">{msg.email}</p>
                      <p className="text-gray-300 mt-3">{msg.message}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDelete(msg._id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
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
    </div>
  );
};

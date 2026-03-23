import React, { useEffect, useState } from 'react';
import { Mail, Trash, MessageSquare, Clock } from 'lucide-react';
import { messagesAPI } from '../../utils/api';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await messagesAPI.getAll();
      setMessages(data);
    } catch (err) {
      // Failed silently for UI smoothness
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await messagesAPI.delete(id);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8 italic">Contact Messages</h1>

      <div className="space-y-4">
        {messages.length > 0 ? messages.map((m) => (
          <div key={m._id} className="glass p-6 rounded-3xl group">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                      {m.name[0]}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold truncate">{m.name}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm flex items-center gap-2 break-all"><Mail size={14} className="flex-shrink-0"/> {m.email}</p>
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-2 self-start sm:self-center bg-white/5 px-3 py-1 rounded-full">
                     <Clock size={12}/> {new Date(m.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl text-slate-300 text-sm leading-relaxed relative border border-white/5 group-hover:border-blue-500/20 transition-colors">
                   <MessageSquare size={12} className="absolute top-4 right-4 opacity-10"/>
                   {m.message}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/5 mt-4 md:mt-0 md:border-none md:pt-0">
                <button 
                  onClick={() => handleDelete(m._id)}
                  className="w-full sm:w-auto p-3 px-5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all font-bold text-xs uppercase tracking-wider"
                >
                  <Trash size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 text-slate-500 italic">No messages received yet.</div>
        )}
      </div>
    </div>
  );
};

export default MessageManager;

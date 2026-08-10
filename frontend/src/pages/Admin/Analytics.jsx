import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, MessageSquare } from 'lucide-react';
import { projectsAPI, certificatesAPI, messagesAPI } from '../../utils/api';

const Analytics = () => {
  const [stats, setStats] = useState({ projects: 0, certificates: 0, messages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, c, m] = await Promise.all([
          projectsAPI.getAll(),
          certificatesAPI.getAll(),
          messagesAPI.getAll()
        ]);
        setStats({
          projects: p.data.length,
          certificates: c.data.length,
          messages: m.data.length
        });
      } catch (err) {
        // Failed silently for UI smoothness
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Projects', value: stats.projects, icon: <Briefcase size={24} />, color: 'blue' },
    { label: 'Total Certificates', value: stats.certificates, icon: <Award size={24} />, color: 'purple' },
    { label: 'Total Messages', value: stats.messages, icon: <MessageSquare size={24} />, color: 'green' },
  ];

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-8">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12 italic">
        {cards.map((card) => (
          <motion.div
            key={card.label}
            whileHover={{ y: -5 }}
            className="glass p-6 lg:p-8 rounded-2xl lg:rounded-3xl"
          >
            <div className={`p-3 rounded-2xl bg-${card.color}-500/10 text-${card.color}-500 w-fit mb-6`}>
              {card.icon}
            </div>
            <div className="text-3xl font-bold mb-1">{card.value}</div>
            <div className="text-slate-400 font-medium">{card.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;

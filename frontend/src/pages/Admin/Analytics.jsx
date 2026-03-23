import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, MessageSquare, TrendingUp } from 'lucide-react';
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

      <div className="glass p-6 lg:p-8 rounded-2xl lg:rounded-[2.5rem] italic overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold font-bold">Activity Chart</h2>
          <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
            <TrendingUp size={16} /> +12% this week
          </div>
        </div>
        
        <div className="h-48 flex items-end gap-2 italic">
          {[40, 70, 45, 90, 65, 80, 55, 75, 50, 85].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              className="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 opacity-20 hover:opacity-100 transition-opacity rounded-t-lg"
            />
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-slate-500 font-medium italic">
          <span>MON</span>
          <span>WED</span>
          <span>FRI</span>
          <span>SUN</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

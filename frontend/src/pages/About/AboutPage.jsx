import { motion } from 'framer-motion';
import { Button, Container, GradientText, Section } from '../../components/ui/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { SkillsSection } from '../../components/ui/SkillsSection';
import { PORTFOLIO_DATA } from '../../utils/constants';

export const AboutPage = () => {
  return (
    <div className="bg-space-darker min-h-screen pt-24">
      <Section>
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl font-bold text-white mb-6">
                About <GradientText>Me</GradientText>
              </h1>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {PORTFOLIO_DATA.about}
              </p>
              <div className="space-y-4">
                {PORTFOLIO_DATA.education.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-electric-blue pl-4">
                    <h3 className="text-white font-bold">{edu.degree}</h3>
                    <p className="text-gray-400">{edu.institution}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      {edu.semesters.map((sem, i) => (
                        <span key={i} className="text-neon-purple">
                          Sem {sem.sem}: {sem.gpa}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="w-full aspect-square rounded-2xl bg-gradient-glow p-0.5">
                <div className="w-full h-full rounded-2xl bg-space-dark flex items-center justify-center text-9xl">
                  🚀
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section id="skills">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4 text-center">
              My <GradientText>Toolkit</GradientText>
            </h2>
            <p className="text-center text-gray-400 text-lg mb-12">
              Technologies I use to build fast, scalable, and intelligent applications
            </p>
          </motion.div>
          <SkillsSection />
        </Container>
      </Section>
    </div>
  );
};

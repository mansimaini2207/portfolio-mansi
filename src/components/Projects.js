import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'My personal React-based portfolio site showcasing projects and skills.',
    link: 'https://github.com/mansimaini2207/portfolio-mansi',
    tech: ['React', 'CSS', 'JavaScript'],
    icon: '🌐'
  },
  {
    title: 'Cookie Menace',
    description: 'A cookie business website built with React and Stripe integration.',
    link: 'https://cookiemenace25-github-io.vercel.app/',
    tech: ['React', 'Stripe', 'Node.js'],
    icon: '🍪'
  },
  {
    title: 'AI Resume Bot',
    description: 'Contextual chatbot that reads and analyzes your resume using LLMs.',
    link: 'https://github.com/mansimaini2207/Resume_Chatbot',
    tech: ['Python', 'AI/ML', 'Gemini'],
    icon: '🤖'
  },
];

const Projects = () => {
  return (
    <section style={{
      padding: '5rem 2rem',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)',
      minHeight: '100vh',
      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '100%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: 0.3,
        animation: 'float 20s ease-in-out infinite'
      }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 50%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            fontWeight: '800',
            letterSpacing: '-2px',
            textShadow: '0 0 30px rgba(148, 163, 184, 0.3)'
          }}>
            Featured Projects
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#cbd5e1',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover my latest work and creative solutions
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          padding: '0 1rem'
        }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              style={{
                background: 'rgba(71, 85, 105, 0.2)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '24px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #334155, #475569, #64748b, #94a3b8)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s ease-in-out infinite'
              }} />
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginRight: '1rem',
                  background: 'rgba(71, 85, 105, 0.3)',
                  padding: '0.5rem',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}>
                  {project.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#f1f5f9',
                  margin: 0,
                  letterSpacing: '-0.5px'
                }}>
                  {project.title}
                </h3>
              </div>
              
              <p style={{
                fontSize: '1rem',
                color: '#cbd5e1',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                minHeight: '3.4rem'
              }}>
                {project.description}
              </p>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '2rem'
              }}>
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(71, 85, 105, 0.4)',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#e2e8f0',
                      fontWeight: '500'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, rgba(71, 85, 105, 0.4) 0%, rgba(51, 65, 85, 0.3) 100%)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '50px',
                  color: '#f1f5f9',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
              >
                View Project
                <span style={{
                  marginLeft: '0.5rem',
                  transition: 'transform 0.3s ease'
                }}>
                  →
                </span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        @media (max-width: 768px) {
          section {
            padding: 3rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
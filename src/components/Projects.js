import React from 'react';
import { motion } from 'framer-motion';


const projects = [
  {
    title: 'Portfolio Website',
    description: 'My personal React-based portfolio site showcasing projects and skills.',
    link: 'https://yourportfolio.com'
  },
  {
    title: 'Cookie Menace',
    description: 'A cookie business website built with React and Stripe integration.',
    link: 'https://cookiemenace.com'
  },
  {
    title: 'Network Toolkit',
    description: 'CLI tool for network diagnostics built with Python and Scapy.',
    link: 'https://github.com/yourname/network-toolkit'
  },
  {
    title: 'AI Resume Bot',
    description: 'Contextual chatbot that reads and analyzes your resume using LLMs.',
    link: 'https://github.com/yourname/ai-resume-bot'
  },
];

const Projects = () => {
  return (
    <div style={{
      padding: '4rem 1rem',
      backgroundColor: '#f3f4f6',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    }}>
      <h2 style={{
        fontSize: '2.75rem',
        textAlign: 'center',
        color: '#111827',
        marginBottom: '3rem',
        fontWeight: '700',
        letterSpacing: '-0.5px'
      }}>
        🚀 My Projects
      </h2>

      <div style={{
        display: 'flex',
        gap: '1.5rem',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        paddingBottom: '1rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
        className="scroll-container"
      >
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.07, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 250 }}
            style={{
              flex: '0 0 300px',
              minHeight: '200px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '1rem',
              padding: '1.5rem',
              textDecoration: 'none',
              color: '#1f2937',
              scrollSnapAlign: 'start',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '0.75rem',
              color: '#111827'
            }}>
              {project.title}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#4b5563',
              lineHeight: '1.6',
              flexGrow: 1
            }}>
              {project.description}
            </p>
            <span style={{
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: '#2563eb',
              fontWeight: '500'
            }}>
              View Project →
            </span>
          </motion.a>
        ))}
      </div>
      {/* Hide scrollbar visually but allow scroll */}
      <style>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Projects;

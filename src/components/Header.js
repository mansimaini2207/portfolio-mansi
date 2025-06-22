import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ResumeChatbot from "./ResumeChat"

function Header() {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '5rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Mansi Maini</h1>
      <p style={{ fontSize: '1.125rem', color: '#4b5563', maxWidth: '40rem', marginBottom: '1.5rem' }}>
        I'm a creative technologist with a passion for building impactful digital experiences. 
        I blend design, code, and storytelling to craft unique web projects.
      </p>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: '#4b5563' }}>
          <FaGithub size={24} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#4b5563' }}>
          <FaLinkedin size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#4b5563' }}>
          <FaTwitter size={24} />
        </a>
      </div>
          <ResumeChatbot/>

    </header>
  );
}

export default Header;
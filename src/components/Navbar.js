import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>MyPortfolio</div>
      <div>
        <Link to="/" style={{ color: '#4b5563', marginRight: '1.5rem', textDecoration: 'none' }}>Home</Link>
        <Link to="/projects" style={{ color: '#4b5563', marginRight: '1.5rem', textDecoration: 'none' }}>Projects</Link>
        <Link to="/contact" style={{ color: '#4b5563', textDecoration: 'none' }}>Contact</Link>

      </div>
    </nav>
  );
}

export default Navbar;
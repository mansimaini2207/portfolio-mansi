import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      padding: '1rem 0',
      zIndex: 100,
      borderBottom: '1px solid #f1f5f9'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: '#1f2937',
          letterSpacing: '-0.5px'
        }}>
          Mansi's Portfolio
        </div>

        {/* Desktop Menu */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="desktop-menu">
          <a href="/" style={{
            color: '#64748b',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent'
          }} 
          onMouseEnter={(e) => {
            e.target.style.color = '#1f2937';
            e.target.style.borderBottomColor = '#1f2937';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#64748b';
            e.target.style.borderBottomColor = 'transparent';
          }}>
            Home
          </a>
          <a href="/projects" style={{
            color: '#64748b',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1f2937';
            e.target.style.borderBottomColor = '#1f2937';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#64748b';
            e.target.style.borderBottomColor = 'transparent';
          }}>
            Projects
          </a>
          <a href="/contact" style={{
            color: '#64748b',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#1f2937';
            e.target.style.borderBottomColor = '#1f2937';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#64748b';
            e.target.style.borderBottomColor = 'transparent';
          }}>
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '6px'
          }}
          className="mobile-menu-button"
        >
          {isMobileMenuOpen ? <X size={24} color="#1f2937" /> : <Menu size={24} color="#1f2937" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          backgroundColor: 'white',
          borderTop: '1px solid #f1f5f9',
          padding: '1rem 2rem',
          display: 'none'
        }} className="mobile-menu">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <a href="/" onClick={() => setIsMobileMenuOpen(false)} style={{
              color: '#64748b',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1.1rem',
              padding: '0.75rem 0',
              borderBottom: '1px solid #f1f5f9'
            }}>
              Home
            </a>
            <a href="/projects" onClick={() => setIsMobileMenuOpen(false)} style={{
              color: '#64748b',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1.1rem',
              padding: '0.75rem 0',
              borderBottom: '1px solid #f1f5f9'
            }}>
              Projects
            </a>
            <a href="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{
              color: '#64748b',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1.1rem',
              padding: '0.75rem 0'
            }}>
              Contact
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
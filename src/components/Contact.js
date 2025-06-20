import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // auto-hide message
  };

  return (
    <div style={{
      padding: '4rem 1rem',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'sans-serif'
    }}>
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', textAlign: 'center' }}
      >
        Contact Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem', textAlign: 'center' }}
      >
        I'd love to hear from you! Fill in the form below to get in touch.
      </motion.p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
      >
        {['Your Name', 'Your Email'].map((placeholder, i) => (
          <motion.input
            key={i}
            type={placeholder.includes('Email') ? 'email' : 'text'}
            placeholder={placeholder}
            whileFocus={{ scale: 1.02 }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: '0.9rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            required
          />
        ))}

        <motion.textarea
          placeholder="Your Message"
          rows="5"
          whileFocus={{ scale: 1.02 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          style={{
            padding: '0.9rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            resize: 'vertical',
            transition: 'all 0.3s ease'
          }}
          required
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{
            padding: '0.9rem',
            background: 'linear-gradient(to right, #6366f1, #3b82f6)',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1.1rem'
          }}
        >
          Send Message
        </motion.button>
      </form>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            style={{
              marginTop: '1.5rem',
              backgroundColor: '#dcfce7',
              color: '#166534',
              padding: '1rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontWeight: '500'
            }}
          >
            ✅ Thank you! Your message has been sent.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Contact;

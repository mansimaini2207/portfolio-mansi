// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Contact from './components/Contact';
import Projects from './components/Projects';
import ResumeChat from './components/ResumeChat';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ResumeChat" element={<ResumeChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
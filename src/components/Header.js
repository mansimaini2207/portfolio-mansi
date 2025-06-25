import React, { useState, useEffect } from 'react';
import ResumeChatbot from "./ResumeChat"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaNetworkWired } from 'react-icons/fa';
import PersonalImage from "../assets/image.png"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = ['Network Engineer'];
  const locations = ['🌍 Remote', '📍 Available Worldwide', '🔧 Infrastructure Focus'];

  useEffect(() => {
    setIsVisible(true);
    const skillInterval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 4000);
    return () => clearInterval(skillInterval);
  }, [skills.length]);

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/mansimaini2207", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/mansimaini/", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:mansimaini20@gmail.com", label: "Email" }
  ];

  return (
    <>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .header-container {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 2rem;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%);
          }

          /* Animated background overlay */
          .header-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.05) 0%, transparent 50%);
            animation: backgroundShift 20s ease-in-out infinite;
            pointer-events: none;
          }

          @keyframes backgroundShift {
            0%, 100% { 
              background: 
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.05) 0%, transparent 50%);
            }
            50% { 
              background: 
                radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.08) 0%, transparent 50%);
            }
          }

          .main-container {
            position: relative;
            z-index: 10;
            display: grid;
            grid-template-columns: 1fr 420px;
            gap: 4rem;
            max-width: 1400px;
            width: 100%;
            align-items: center;
            transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            opacity: ${isVisible ? 1 : 0};
            transform: ${isVisible ? 'translateY(0)' : 'translateY(3rem)'};
          }

          .left-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-right: 2rem;
            animation: slideInLeft 1s ease-out 0.2s both;
          }

          .right-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            max-height: 650px;
            animation: slideInRight 1s ease-out 0.4s both;
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .avatar-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            animation: fadeInUp 1s ease-out 0.6s both;
          }

          .avatar {
            width: 4.5rem;
            height: 4.5rem;
            background: linear-gradient(135deg, #64748b, #94a3b8);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            fontSize: 1.5rem;
            color: white;
            font-weight: bold;
            border: 3px solid rgba(255, 255, 255, 0.1);
            box-shadow: 
              0 8px 24px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.05) inset;
            transition: all 0.3s ease;
            flex-shrink: 0;
          }
          .avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
          .avatar:hover {
            transform: scale(1.05);
            box-shadow: 
              0 12px 32px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          }

          .location {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
            font-weight: 500;
          }

          .name-title {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            color: #f8fafc;
            letter-spacing: -0.02em;
            line-height: 1.1;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            animation: fadeInUp 1s ease-out 0.8s both;
          }

          .role-text {
            font-size: 1.75rem;
            color: #94a3b8;
            font-weight: 500;
            margin-bottom: 1.5rem;
            transition: all 0.5s ease;
            min-height: 2.5rem;
            position: relative;
            animation: fadeInUp 1s ease-out 1s both;
          }

          .role-text::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 2px;
            height: 1.5rem;
            background: #94a3b8;
            animation: blink 1s infinite;
          }

          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          .description {
            font-size: 1.1rem;
            color: #cbd5e1;
            line-height: 1.7;
            font-weight: 400;
            margin-bottom: 2.5rem;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            animation: fadeInUp 1s ease-out 1.2s both;
          }

          .social-container {
            display: flex;
            gap: 1rem;
            margin-bottom: 2.5rem;
            animation: fadeInUp 1s ease-out 1.4s both;
          }

          .social-link {
            padding: 0.875rem;
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            text-decoration: none;
            color: #94a3b8;
            position: relative;
            overflow: hidden;
          }

          .social-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s ease;
          }

          .social-link:hover::before {
            left: 100%;
          }

          .social-link:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateY(-3px) scale(1.05);
            color: #f8fafc;
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          }

          .buttons-container {
            display: flex;
            gap: 1rem;
            animation: fadeInUp 1s ease-out 1.6s both;
          }

          .primary-button {
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #475569, #64748b);
            border-radius: 12px;
            font-weight: 600;
            color: white;
            border: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            font-size: 1rem;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          }

          .primary-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #64748b, #94a3b8);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .primary-button:hover::before {
            opacity: 1;
          }

          .primary-button:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          }

          .primary-button span {
            position: relative;
            z-index: 1;
          }

          .secondary-button {
            padding: 1rem 2rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            font-weight: 600;
            color: #cbd5e1;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            font-size: 1rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          }

          .secondary-button:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.3);
            color: #f8fafc;
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          }

          .floating-dots {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            pointer-events: none;
          }

          .floating-dot {
            position: absolute;
            border-radius: 50%;
            animation: float 6s infinite ease-in-out;
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0) translateX(0) scale(1);
              opacity: 0.1;
            }
            50% { 
              transform: translateY(-20px) translateX(10px) scale(1.1);
              opacity: 0.3;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Responsive Design */
          @media (max-width: 1200px) {
            .main-container {
              grid-template-columns: 1fr 380px;
              gap: 3rem;
            }
            
            .name-title {
              font-size: 3.5rem;
            }
          }

          @media (max-width: 1024px) {
            .header-container {
              padding: 1.5rem;
            }
            
            .main-container {
              grid-template-columns: 1fr;
              gap: 3rem;
              text-align: center;
              max-width: 700px;
            }
            
            .left-content {
              padding-right: 0;
              order: 1;
            }
            
            .right-content {
              order: 2;
              max-height: 500px;
            }
            
            .avatar-container {
              justify-content: center;
            }
            
            .social-container {
              justify-content: center;
            }
            
            .buttons-container {
              justify-content: center;
            }
            
            .name-title {
              font-size: 3rem;
            }
            
            .role-text {
              font-size: 1.5rem;
            }
          }

          @media (max-width: 768px) {
            .header-container {
              padding: 1rem;
              min-height: auto;
              padding-top: 2rem;
              padding-bottom: 2rem;
            }
            
            .main-container {
              gap: 2rem;
            }
            
            .buttons-container {
              flex-direction: column;
              align-items: center;
            }
            
            .primary-button,
            .secondary-button {
              width: 100%;
              max-width: 280px;
            }
            
            .name-title {
              font-size: 2.5rem;
            }
            
            .role-text {
              font-size: 1.25rem;
            }
            
            .description {
              font-size: 1rem;
            }
            
            .social-container {
              flex-wrap: wrap;
              gap: 0.75rem;
            }
            
            .right-content {
              max-height: 450px;
            }
          }

          @media (max-width: 480px) {
            .header-container {
              padding: 0.75rem;
            }
            
            .name-title {
              font-size: 2rem;
            }
            
            .role-text {
              font-size: 1.1rem;
            }
            
            .description {
              font-size: 0.95rem;
            }
            
            .avatar {
              width: 3.5rem;
              height: 3.5rem;
            }
            
            .social-link {
              padding: 0.75rem;
            }
            
            .primary-button,
            .secondary-button {
              padding: 0.875rem 1.5rem;
              font-size: 0.95rem;
            }
          }

          @media (max-width: 320px) {
            .name-title {
              font-size: 1.75rem;
            }
            
            .main-container {
              gap: 1.5rem;
            }
          }
        `}
      </style>
     
      <header className="header-container">
        {/* Floating Elements */}
        <div className="floating-dots">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="floating-dot"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Main Container */}
        <div className="main-container">
          
          {/* Left Content */}
          <div className="left-content">
            
            {/* Avatar and Location */}
            <div className="avatar-container">
              <div className="avatar">
                <img src={PersonalImage}/>
              </div>
              <div className="location">
                <FaMapMarkerAlt style={{ color: '#94a3b8' }} />
                <span>Bengaluru, India</span>
              </div>
            </div>

            {/* Name */}
            <h1 className="name-title">
              Mansi Maini
            </h1>

            {/* Dynamic Role */}
            <p className="role-text">
              Network Engineer
            </p>

            {/* Description */}
            <p className="description">
              I'm a Network Engineer with hands-on experience designing, troubleshooting, and optimizing large-scale network infrastructures. My passion for technology goes beyond routing and switching — I'm deeply curious about how systems connect, evolve, and learn. That curiosity has driven me to actively explore AI, machine learning, and automation, blending my networking expertise with the future of intelligent systems.
            </p>

            {/* Social Links */}
            <div className="social-container">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="buttons-container">
              <button className="primary-button" onClick={() => window.location.href = '/Projects'} >
                <span>View My Work</span>
              </button>
              <button className="secondary-button">
                Download Resume
              </button>
            </div>
          </div>

          {/* Right Content - Resume Chatbot */}
          <div className="right-content">
            <ResumeChatbot />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;


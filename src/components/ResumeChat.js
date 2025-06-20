import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';

const ResumeChatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm Mansi Maini. Ask me anything about my professional background, experience, or skills!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Resume data
  const resumeData = {
    experience: [
      {
        role: "Software Engineer",
        company: "Arista Networks",
        duration: "2 years",
        responsibilities: [
          "Worked on network automation and monitoring systems",
          "Developed Python applications for network configuration",
          "Collaborated with cross-functional teams on product development"
        ]
      },
      {
        role: "Software Engineering Intern",
        company: "Tech Startup",
        duration: "6 months",
        responsibilities: [
          "Developed web applications using React and Node.js",
          "Participated in agile development processes",
          "Contributed to code reviews and testing"
        ]
      }
    ],
    skills: {
      programming: ["Python", "JavaScript", "Java", "C++"],
      frameworks: ["React", "Node.js", "Django", "Flask"],
      tools: ["Git", "Docker", "Kubernetes", "Jenkins"],
      databases: ["MySQL", "PostgreSQL", "MongoDB"]
    },
    education: "Bachelor's in Computer Science",
    projects: [
      "Network Monitoring Dashboard: Built real-time monitoring system",
      "E-commerce Web App: Full-stack application with payment integration"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Experience related queries
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
      return `I have ${resumeData.experience[0].duration} of experience as a ${resumeData.experience[0].role} at ${resumeData.experience[0].company}, where I ${resumeData.experience[0].responsibilities.join(', ')}. I also completed a ${resumeData.experience[1].duration} internship as a ${resumeData.experience[1].role} at a ${resumeData.experience[1].company}.`;
    }
    
    // Skills related queries
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('programming')) {
      return `My technical skills include programming languages like ${resumeData.skills.programming.join(', ')}, frameworks such as ${resumeData.skills.frameworks.join(', ')}, development tools like ${resumeData.skills.tools.join(', ')}, and databases including ${resumeData.skills.databases.join(', ')}.`;
    }
    
    // Arista specific queries
    if (lowerQuery.includes('arista')) {
      const aristaExp = resumeData.experience[0];
      return `At ${aristaExp.company}, I worked for ${aristaExp.duration} as a ${aristaExp.role}. My key responsibilities included: ${aristaExp.responsibilities.join(', ')}.`;
    }
    
    // Projects related queries
    if (lowerQuery.includes('project') || lowerQuery.includes('built') || lowerQuery.includes('developed')) {
      return `I've worked on several projects including: ${resumeData.projects.join('. ')}. These projects showcase my full-stack development capabilities and problem-solving skills.`;
    }
    
    // Education related queries
    if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('study')) {
      return `I have a ${resumeData.education} with relevant coursework in Data Structures, Algorithms, and Software Engineering.`;
    }
    
    // Contact/portfolio queries
    if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email')) {
      return "You can find my contact information and more details about my work in my portfolio. I'm always open to discussing new opportunities!";
    }
    
    // Default response
    return "I'd be happy to tell you about my professional background! You can ask me about my experience, skills, projects, education, or anything specific about my work at Arista Networks.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: getResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What's your experience?",
    "Tell me about your skills",
    "What projects have you worked on?",
    "Tell me about Arista Networks"
  ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Chat with Mansi</h2>
            <p className="text-purple-100">Ask me about my professional background</p>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="p-4 bg-gray-50 border-b">
        <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              message.type === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-purple-500 text-white'
            }`}>
              {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.type === 'user'
                ? 'bg-blue-500 text-white rounded-br-md'
                : 'bg-gray-100 text-gray-800 rounded-bl-md'
            }`}>
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about my experience, skills, or projects..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeChatbot;
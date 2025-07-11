import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, X, Settings, Loader2 } from 'lucide-react';

const ResumeSearch = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Hardcoded API key - replace with your actual API key
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  // Resume data
  const resumeData = `
MANSI MAINI - SOFTWARE ENGINEER

EXPERIENCE:
- Technical Solutions Engineer at Arista Networks (2 years)
Specialized in an extensive range of advanced data center technologies focused on Switching and Routing. Resolved 320+ cases involving multiple networking technologies such as TCP, UDP, BGP, OSPF, VXLAN, and EVPN, achieving a customer satisfaction rate of 93%. Conducted training sessions on various topics for the team and presented complex cases to a wider audience, showcasing troubleshooting strategies and solutions. Engaged in rigorous testing and lab reproduction to validate solutions and ensure reliability and effectiveness of implemented technologies. Spearheaded the team to win a design challenge by developing a comprehensive network architecture from scratch using networking protocols. Successfully addressed and resolved issues involving automated provisioning and telemetry, enhancing system efficiency and performance. Worked extensively with various platform switches, including the 7050X, 7060X, 7280X, and 7500X series. Currently conducting an in-depth study of the 7050X and 7060X series in preparation for upcoming training on these platforms.

- Technical Solutions Intern at Arista Networks (1 year)
Demonstrated strong grasp of network concepts, including IPv4/6, the TCP/IP stack, and common Internet protocols while assisting with real-time case resolutions and learning through practical exposure to customer issues.

- Front End Developer Intern at Techfabs (3 months)
Collaborated with the team as a front-end developer to design and create a landing page for the company. Utilized HTML, CSS, and JavaScript to develop and deploy the landing page for real-time use.

PROJECTS:
- Failure Detection In Networks | Python (January 2023)
Automated the troubleshooting of physical layer issues, reducing downtime by 10% and enhancing network reliability through accurate diagnostics and actionable solutions.

- Medical Store Management System | Python (November 2020)
Developed a Medical Store Management System with an easy-to-use interface, enabling stock maintenance, database access, and electronic documentation for billing purposes, while ensuring exceptional customer service.

VOLUNTEERING EXPERIENCE:
- Organizing Committee Vice President of Marketing at AIESEC in Chennai (Aug 2022 – Present)
Continually evaluated marketplace trends and developed strategies for efficiently tapping into the market. Led marketing initiatives to drive engagement and visibility for AIESEC events and programs.

CONFERENCES AND WORKSHOPS:
- HPAIR Asia Conference
Accepted for the HPAIR Asia Conference 2021, an international platform bringing together top students, thought leaders, and business professionals for exchange and networking.

- MIT Innovation Leadership Bootcamp (June 07, 2021)
Selected to be part of an intensive program by MIT focused on innovation, entrepreneurship, and leadership development through team-based projects and mentorship from global experts.

Technologies:
Python, REST APIs, ZTP (Zero Touch Provisioning), CVP (CloudVision Portal), Linux
Experience working with automation tools and scripting, API integrations, and provisioning systems.

Protocols:
BGP, OSPF, IS-IS, VXLAN, EVPN, SDN, DHCP, TCP, UDP, DNS, HTTPS, STP
Hands-on troubleshooting and implementation experience with core routing, switching, and overlay technologies.

Soft Skills:
Customer Engagement, Communication Skills, Problem-Solving Ability, Marketing, Team Collaboration, Presentation
Strong interpersonal and collaborative capabilities proven through case handling, team trainings, and volunteering.

EDUCATION:
- Bachelor of Technology, Electronics and Communication Engineering from SRM University, Chennai, Tamil Nadu (July 2019 to May 2023) with a CGPA – 9.42
`;

  const suggestions = [
    "What's your experience at Arista?",
    "What are your technical skills?",
    "What protocols do you know?",
    "Tell me about your projects",
    "What's your education background?",
    "What programming languages do you know?"
  ];

  const createSystemPrompt = () => {
    return `
You are Mansi Maini, responding to questions about yourself based on your resume and professional background.

IMPORTANT INSTRUCTIONS:
1. Always respond in first person as Mansi Maini
2. Only use information provided in the resume data below
3. If asked about something not in your resume, politely say you don't have that information to share
4. Keep responses conversational and professional
5. Be specific about your experience, skills, and achievements when asked
6. Keep responses concise - aim for 2-3 sentences unless more detail is specifically requested

YOUR RESUME DATA:
${resumeData}

Remember: You are Mansi Maini answering questions about your professional background. Stay in character and only use the information provided above.
`;
  };

  const getGeminiResponse = async (userQuery) => {
    const systemPrompt = createSystemPrompt();
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userQuery}\n\nYour Response:`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setShowResponse(true);

    try {
      const result = await getGeminiResponse(query);
      setResponse(result);
    } catch (err) {
      setError(err.message);
      setResponse('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    setResponse('');
    setShowResponse(false);
    setError('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const styles = {
    container: {
      minHeight: '75vh',
      background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', 
      width: '95%',
      borderRadius: '2rem'
    },
    wrapper: {
      width: '100%',
      maxWidth: '672px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '8px',
      margin: 0
    },
    subtitle: {
      color: '#64748b',
      fontSize: '16px',
      margin: 0
    },
    searchBox: {
      position: 'relative'
    },
    searchContainer: {
      backgroundColor: 'white',
      borderRadius: showResponse ? '24px' : '9999px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease'
    },
    searchContainerHover: {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    searchInputWrapper: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px 24px'
    },
    searchIcon: {
      color: '#94a3b8',
      marginRight: '12px',
      flexShrink: 0
    },
    searchInput: {
      flex: 1,
      outline: 'none',
      border: 'none',
      fontSize: '16px',
      color: '#334155',
      backgroundColor: 'transparent'
    },
    clearButton: {
      marginLeft: '8px',
      padding: '4px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    clearButtonHover: {
      backgroundColor: '#f1f5f9'
    },
    askButton: {
      marginLeft: '12px',
      padding: '8px 16px',
      borderRadius: '9999px',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    askButtonEnabled: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    askButtonEnabledHover: {
      backgroundColor: '#2563eb'
    },
    askButtonDisabled: {
      backgroundColor: '#e2e8f0',
      color: '#94a3b8',
      cursor: 'not-allowed'
    },
    responseArea: {
      borderTop: '1px solid #f1f5f9',
      padding: '16px 24px',
      animation: 'fadeIn 0.5s ease-out'
    },
    loadingWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#64748b'
    },
    loadingText: {
      animation: 'pulse 2s ease-in-out infinite'
    },
    errorText: {
      color: '#ef4444',
      fontSize: '14px'
    },
    responseText: {
      color: '#334155',
      lineHeight: '1.6'
    },
    suggestionsWrapper: {
      marginTop: '24px',
      animation: 'fadeIn 0.5s ease-out'
    },
    suggestionsLabel: {
      fontSize: '14px',
      color: '#64748b',
      marginBottom: '12px',
      textAlign: 'center'
    },
    suggestionsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      justifyContent: 'center'
    },
    suggestionButton: {
      padding: '8px 16px',
      borderRadius: '9999px',
      fontSize: '14px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    suggestionButtonEnabled: {
      backgroundColor: 'white',
      color: '#475569',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },
    suggestionButtonEnabledHover: {
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    suggestionButtonDisabled: {
      backgroundColor: '#f1f5f9',
      color: '#94a3b8',
      cursor: 'not-allowed'
    },
    settingsWrapper: {
      marginTop: '32px',
      textAlign: 'center'
    },
    settingsButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#64748b',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'color 0.2s'
    },
    settingsButtonHover: {
      color: '#334155'
    },
    settingsPanel: {
      marginTop: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '16px',
      animation: 'fadeIn 0.5s ease-out'
    },
    settingsHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px'
    },
    settingsTitle: {
      fontWeight: '500',
      color: '#334155',
      fontSize: '16px'
    },
    settingsCloseButton: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#94a3b8',
      padding: '4px'
    },
    settingsCloseButtonHover: {
      color: '#475569'
    },
    settingsInput: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      outline: 'none',
      fontSize: '14px',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box'
    },
    settingsInputFocus: {
      borderColor: '#3b82f6'
    },
    settingsHelp: {
      marginTop: '8px',
      fontSize: '12px',
      color: '#64748b'
    },
    settingsLink: {
      color: '#3b82f6',
      textDecoration: 'none'
    },
    settingsLinkHover: {
      color: '#2563eb',
      textDecoration: 'underline'
    },
    warning: {
      marginTop: '16px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#d97706',
      animation: 'fadeIn 0.5s ease-out'
    }
  };

  const animations = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `;

  return (
    <>
      <style>{animations}</style>
      <div style={styles.container}>
        <div style={styles.wrapper}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.title}>Ask Mansi Maini</h1>
            <p style={styles.subtitle}>Technical Solutions Engineer</p>
          </div>

          {/* Search Box */}
          <div style={styles.searchBox}>
            <div 
              style={styles.searchContainer}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.searchContainerHover.boxShadow}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = styles.searchContainer.boxShadow}
            >
              <div style={styles.searchInputWrapper}>
                <Search style={styles.searchIcon} size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about my experience, skills, or projects..."
                  style={styles.searchInput}
                  disabled={isLoading}
                />
                {query && (
                  <button
                    onClick={handleClear}
                    style={styles.clearButton}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.clearButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <X size={18} style={{ color: '#94a3b8' }} />
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  disabled={!query.trim() || isLoading}
                  style={{
                    ...styles.askButton,
                    ...(query.trim() ? styles.askButtonEnabled : styles.askButtonDisabled)
                  }}
                  onMouseEnter={(e) => {
                    if (query.trim()) {
                      e.currentTarget.style.backgroundColor = styles.askButtonEnabledHover.backgroundColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (query.trim()) {
                      e.currentTarget.style.backgroundColor = styles.askButtonEnabled.backgroundColor;
                    }
                  }}
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  Ask
                </button>
              </div>

              {/* Response Area */}
              {showResponse && (
                <div style={styles.responseArea}>
                  {isLoading ? (
                    <div style={styles.loadingWrapper}>
                      <Loader2 size={16} className="animate-spin" />
                      <span style={styles.loadingText}>Thinking...</span>
                    </div>
                  ) : error ? (
                    <div style={styles.errorText}>{error}</div>
                  ) : (
                    <div style={styles.responseText}>{response}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Suggestions */}
          {!showResponse && (
            <div style={styles.suggestionsWrapper}>
              <p style={styles.suggestionsLabel}>Try asking:</p>
              <div style={styles.suggestionsList}>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      ...styles.suggestionButton,
                      ...styles.suggestionButtonEnabled
                    }}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.suggestionButtonEnabledHover);
                    }}
                    onMouseLeave={(e) => {
                      Object.assign(e.currentTarget.style, styles.suggestionButtonEnabled);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeSearch;

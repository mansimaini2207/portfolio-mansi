import React, { useState, useRef, useEffect } from "react";
import {
 Search,
 Sparkles,
 X,
 Loader2,
 User,
 MessageCircle,
} from "lucide-react";


const ResumeSearch = () => {
 const [query, setQuery] = useState("");
 const [response, setResponse] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [showResponse, setShowResponse] = useState(false);
 const [error, setError] = useState("");
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
   "What programming languages do you know?",
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


   const response = await fetch(
     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         contents: [
           {
             parts: [
               {
                 text: fullPrompt,
               },
             ],
           },
         ],
         generationConfig: {
           temperature: 0.9,
           topK: 40,
           topP: 0.95,
           maxOutputTokens: 1024,
         },
       }),
     }
   );


   if (!response.ok) {
     const errorData = await response.json();
     throw new Error(errorData.error?.message || "Failed to get response");
   }


   const data = await response.json();
   return data.candidates[0].content.parts[0].text;
 };


 const handleSearch = async () => {
   if (!query.trim() || isLoading) return;


   setIsLoading(true);
   setError("");
   setShowResponse(true);


   try {
     const result = await getGeminiResponse(query);
     setResponse(result);
   } catch (err) {
     setError(err.message);
     setResponse("");
   } finally {
     setIsLoading(false);
   }
 };


 const handleKeyPress = (e) => {
   if (e.key === "Enter") {
     handleSearch();
   }
 };


 const handleClear = () => {
   setQuery("");
   setResponse("");
   setShowResponse(false);
   setError("");
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
     minHeight: "70vh",
     background:
       "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e8eaf6 100%)",
     padding: "16px",
     fontFamily:
       '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
     position: "relative",
     overflow: "auto",
     borderRadius: "2rem",
   },
   backgroundPattern: {
     position: "fixed",
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e")`,
     maskImage: "linear-gradient(0deg, white, rgba(255,255,255,0.6))",
     WebkitMaskImage: "linear-gradient(0deg, white, rgba(255,255,255,0.6))",
     pointerEvents: "none",
     zIndex: 0,
   },
   content: {
     position: "relative",
     zIndex: 1,
     maxWidth: "1024px",
     margin: "0 auto",
   },
   header: {
     textAlign: "center",
     marginBottom: "32px",
   },
   avatarContainer: {
     display: "inline-flex",
     alignItems: "center",
     justifyContent: "center",
     width: "48px",
     height: "48px",
     background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
     borderRadius: "50%",
     marginBottom: "16px",
     boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
     transform: "translateZ(0)",
   },
   title: {
     fontSize: "36px",
     fontWeight: "bold",
     background: "linear-gradient(135deg, #1e293b, #1e40af, #1e293b)",
     WebkitBackgroundClip: "text",
     backgroundClip: "text",
     WebkitTextFillColor: "transparent",
     marginBottom: "8px",
     lineHeight: "1.1",
     margin: 0,
   },
   subtitle: {
     color: "#64748b",
     fontSize: "18px",
     fontWeight: "500",
     marginBottom: "6px",
     margin: 0,
   },
   description: {
     color: "#64748b",
     fontSize: "14px",
     maxWidth: "480px",
     margin: "12px auto 0",
     lineHeight: "1.4",
   },
   mainContainer: {
     maxWidth: "768px",
     margin: "0 auto",
   },
   chatContainer: {
     backgroundColor: "rgba(255, 255, 255, 0.85)",
     backdropFilter: "blur(20px)",
     borderRadius: "32px",
     boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
     border: "1px solid rgba(255, 255, 255, 0.2)",
     transition: "all 0.3s ease",
     overflow: "hidden",
   },
   inputSection: {
     padding: "20px",
   },
   inputContainer: {
     display: "flex",
     alignItems: "center",
     gap: "12px",
   },
   inputIconContainer: {
     flexShrink: 0,
     width: "36px",
     height: "36px",
     background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
     borderRadius: "50%",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
   },
   inputWrapper: {
     flex: 1,
     position: "relative",
   },
   input: {
     width: "100%",
     fontSize: "15px",
     color: "#1e293b",
     backgroundColor: "transparent",
     border: "none",
     outline: "none",
     fontWeight: "500",
     "::placeholder": {
       color: "#94a3b8",
     },
   },
   clearButton: {
     position: "absolute",
     right: 0,
     top: "50%",
     transform: "translateY(-50%)",
     padding: "6px",
     color: "#94a3b8",
     backgroundColor: "transparent",
     border: "none",
     cursor: "pointer",
     borderRadius: "50%",
     transition: "color 0.2s ease",
   },
   askButton: {
     display: "flex",
     alignItems: "center",
     gap: "6px",
     padding: "8px 16px",
     borderRadius: "16px",
     fontWeight: "600",
     fontSize: "14px",
     border: "none",
     cursor: "pointer",
     transition: "all 0.2s ease",
     transform: "translateZ(0)",
   },
   askButtonEnabled: {
     background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
     color: "white",
     boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
   },
   askButtonDisabled: {
     backgroundColor: "#e2e8f0",
     color: "#94a3b8",
     cursor: "not-allowed",
   },
   responseSection: {
     borderTop: "1px solid #f1f5f9",
     backgroundColor: "rgba(248, 250, 252, 0.5)",
     padding: "20px",
     borderBottomLeftRadius: "32px",
     borderBottomRightRadius: "32px",
   },
   responseContainer: {
     display: "flex",
     alignItems: "flex-start",
     gap: "12px",
   },
   responseIconContainer: {
     flexShrink: 0,
     width: "32px",
     height: "32px",
     background: "linear-gradient(135deg, #10b981, #06b6d4)",
     borderRadius: "50%",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
   },
   responseContent: {
     flex: 1,
     minWidth: 0,
   },
   loadingContainer: {
     display: "flex",
     alignItems: "center",
     gap: "12px",
     color: "#64748b",
   },
   loadingText: {
     animation: "pulse 2s ease-in-out infinite",
   },
   errorContainer: {
     color: "#ef4444",
     backgroundColor: "#fef2f2",
     padding: "16px",
     borderRadius: "12px",
     border: "1px solid #fecaca",
   },
   responseText: {
     color: "#374151",
     fontSize: "16px",
     lineHeight: "1.6",
     margin: 0,
     whiteSpace: "pre-wrap",
   },
   suggestionsContainer: {
     marginTop: "32px",
   },
   suggestionsLabel: {
     textAlign: "center",
     color: "#64748b",
     fontWeight: "500",
     marginBottom: "16px",
     fontSize: "14px",
   },
   suggestionsGrid: {
     display: "grid",
     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
     gap: "12px",
   },
   suggestionCard: {
     padding: "12px",
     backgroundColor: "rgba(255, 255, 255, 0.6)",
     backdropFilter: "blur(10px)",
     borderRadius: "16px",
     border: "1px solid rgba(255, 255, 255, 0.4)",
     textAlign: "left",
     color: "#374151",
     cursor: "pointer",
     transition: "all 0.2s ease",
     fontSize: "14px",
     fontWeight: "500",
     transform: "translateZ(0)",
   },
   footer: {
     marginTop: "40px",
     textAlign: "center",
   },
   footerText: {
     color: "#94a3b8",
     fontSize: "14px",
   },
 };


 // Responsive styles
 const getResponsiveStyles = () => {
   const width = window.innerWidth;


   if (width < 640) {
     return {
       container: {
         ...styles.container,
         padding: "16px",
         borderRadius: "2rem",
       },
       header: { ...styles.header, marginBottom: "24px" },
       avatarContainer: {
         ...styles.avatarContainer,
         width: "40px",
         height: "40px",
         marginBottom: "12px",
       },
       title: { ...styles.title, fontSize: "28px" },
       subtitle: { ...styles.subtitle, fontSize: "16px" },
       description: { ...styles.description, fontSize: "13px" },
       inputSection: { ...styles.inputSection, padding: "16px" },
       inputIconContainer: {
         ...styles.inputIconContainer,
         width: "32px",
         height: "32px",
       },
       input: { ...styles.input, fontSize: "14px" },
       askButton: {
         ...styles.askButton,
         padding: "7px 12px",
         fontSize: "13px",
       },
       responseSection: { ...styles.responseSection, padding: "16px" },
       responseIconContainer: {
         ...styles.responseIconContainer,
         width: "28px",
         height: "28px",
       },
       suggestionsGrid: {
         ...styles.suggestionsGrid,
         gridTemplateColumns: "1fr",
       },
       suggestionCard: {
         ...styles.suggestionCard,
         fontSize: "13px",
         padding: "10px",
       },
     };
   }


   if (width < 1024) {
     return {
       container: {
         ...styles.container,
         padding: "20px",
         borderRadius: "2rem",
       },
       title: { ...styles.title, fontSize: "32px" },
       suggestionsGrid: {
         ...styles.suggestionsGrid,
         gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
       },
     };
   }


   return {};
 };


 const [responsiveStyles, setResponsiveStyles] = useState(
   getResponsiveStyles()
 );


 useEffect(() => {
   const handleResize = () => {
     setResponsiveStyles(getResponsiveStyles());
   };


   window.addEventListener("resize", handleResize);
   return () => window.removeEventListener("resize", handleResize);
 }, []);


 const currentStyles = { ...styles, ...responsiveStyles };


 return (
   <>
     <style>{`
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
       .spin { animation: spin 1s linear infinite; }
       .fade-in { animation: fadeIn 0.5s ease-out; }
       input::placeholder { color: #94a3b8; }
     `}</style>


     <div style={currentStyles.container}>
       <div style={styles.backgroundPattern}></div>


       <div style={styles.content}>
         {/* Header */}
         <div style={currentStyles.header}>
           <div style={currentStyles.avatarContainer}>
             <User size={window.innerWidth < 640 ? 20 : 24} color="white" />
           </div>
           <h1 style={currentStyles.title}>Ask Mansi Maini</h1>
           <p style={currentStyles.subtitle}>Technical Solutions Engineer</p>
           <p style={currentStyles.description}>
             Get to know my professional background, technical expertise, and
             experience through an interactive conversation
           </p>
         </div>


         {/* Main Content */}
         <div style={styles.mainContainer}>
           {/* Chat Container */}
           <div
             style={styles.chatContainer}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = "translateY(-2px)";
               e.currentTarget.style.boxShadow =
                 "0 32px 64px -12px rgba(0, 0, 0, 0.2)";
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = "translateY(0)";
               e.currentTarget.style.boxShadow =
                 "0 25px 50px -12px rgba(0, 0, 0, 0.15)";
             }}
           >
             {/* Input Section */}
             <div style={currentStyles.inputSection}>
               <div style={styles.inputContainer}>
                 <div style={currentStyles.inputIconContainer}>
                   <Search
                     size={window.innerWidth < 640 ? 16 : 18}
                     color="white"
                   />
                 </div>
                 <div style={styles.inputWrapper}>
                   <input
                     ref={inputRef}
                     type="text"
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     onKeyPress={handleKeyPress}
                     placeholder="Ask about my experience, skills, or projects..."
                     style={currentStyles.input}
                     disabled={isLoading}
                   />
                   {query && !isLoading && (
                     <button
                       onClick={handleClear}
                       style={styles.clearButton}
                       onMouseEnter={(e) =>
                         (e.currentTarget.style.color = "#64748b")
                       }
                       onMouseLeave={(e) =>
                         (e.currentTarget.style.color = "#94a3b8")
                       }
                     >
                       <X size={20} />
                     </button>
                   )}
                 </div>
                 <button
                   onClick={handleSearch}
                   disabled={!query.trim() || isLoading}
                   style={{
                     ...currentStyles.askButton,
                     ...(query.trim() && !isLoading
                       ? styles.askButtonEnabled
                       : styles.askButtonDisabled),
                   }}
                   onMouseEnter={(e) => {
                     if (query.trim() && !isLoading) {
                       e.currentTarget.style.transform = "scale(1.05)";
                       e.currentTarget.style.boxShadow =
                         "0 15px 35px rgba(59, 130, 246, 0.4)";
                     }
                   }}
                   onMouseLeave={(e) => {
                     if (query.trim() && !isLoading) {
                       e.currentTarget.style.transform = "scale(1)";
                       e.currentTarget.style.boxShadow =
                         "0 10px 25px rgba(59, 130, 246, 0.3)";
                     }
                   }}
                 >
                   {isLoading ? (
                     <Loader2
                       size={window.innerWidth < 640 ? 14 : 16}
                       className="spin"
                     />
                   ) : (
                     <Sparkles size={window.innerWidth < 640 ? 14 : 16} />
                   )}
                   {window.innerWidth >= 640 && "Ask"}
                 </button>
               </div>
             </div>


             {/* Response Section */}
             {showResponse && (
               <div style={styles.responseSection} className="fade-in">
                 <div style={styles.responseContainer}>
                   <div style={currentStyles.responseIconContainer}>
                     <MessageCircle
                       size={window.innerWidth < 640 ? 14 : 16}
                       color="white"
                     />
                   </div>
                   <div style={styles.responseContent}>
                     {isLoading ? (
                       <div style={styles.loadingContainer}>
                         <Loader2 size={20} className="spin" />
                         <span style={styles.loadingText}>Thinking...</span>
                       </div>
                     ) : error ? (
                       <div style={styles.errorContainer}>
                         <p style={{ margin: 0, fontWeight: "500" }}>
                           {error}
                         </p>
                       </div>
                     ) : (
                       <p style={styles.responseText}>{response}</p>
                     )}
                   </div>
                 </div>
               </div>
             )}
           </div>


           {/* Suggestions */}
           {!showResponse && (
             <div style={styles.suggestionsContainer} className="fade-in">
               <p style={styles.suggestionsLabel}>
                 Popular questions to get started:
               </p>
               <div style={currentStyles.suggestionsGrid}>
                 {suggestions.map((suggestion, index) => (
                   <button
                     key={index}
                     onClick={() => handleSuggestionClick(suggestion)}
                     disabled={isLoading}
                     style={currentStyles.suggestionCard}
                     onMouseEnter={(e) => {
                       if (!isLoading) {
                         e.currentTarget.style.backgroundColor =
                           "rgba(255, 255, 255, 0.8)";
                         e.currentTarget.style.transform = "scale(1.02)";
                         e.currentTarget.style.boxShadow =
                           "0 10px 25px rgba(0, 0, 0, 0.1)";
                         e.currentTarget.style.borderColor =
                           "rgba(59, 130, 246, 0.2)";
                         e.currentTarget.style.color = "#1e40af";
                       }
                     }}
                     onMouseLeave={(e) => {
                       if (!isLoading) {
                         e.currentTarget.style.backgroundColor =
                           "rgba(255, 255, 255, 0.6)";
                         e.currentTarget.style.transform = "scale(1)";
                         e.currentTarget.style.boxShadow = "none";
                         e.currentTarget.style.borderColor =
                           "rgba(255, 255, 255, 0.4)";
                         e.currentTarget.style.color = "#374151";
                       }
                     }}
                   >
                     {suggestion}
                   </button>
                 ))}
               </div>
             </div>
           )}


           {/* Footer */}
           <div style={styles.footer}>
             <p style={styles.footerText}>Powered by Gemini</p>
           </div>
         </div>
       </div>
     </div>
   </>
 );
};


export default ResumeSearch;
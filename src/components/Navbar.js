import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";


function Navbar() {
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [isScrolled, setIsScrolled] = useState(false);


 useEffect(() => {
   const handleScroll = () => {
     setIsScrolled(window.scrollY > 20);
   };
   window.addEventListener("scroll", handleScroll);
   return () => window.removeEventListener("scroll", handleScroll);
 }, []);


 const toggleMobileMenu = () => {
   setIsMobileMenuOpen(!isMobileMenuOpen);
 };


 return (
   <nav
     style={{
       position: "sticky",
       top: 0,
       backgroundColor: isScrolled
         ? "rgba(255, 255, 255, 0.95)"
         : "rgba(255, 255, 255, 1)",
       backdropFilter: isScrolled ? "blur(20px)" : "none",
       WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
       boxShadow: isScrolled
         ? "0 8px 32px rgba(0, 0, 0, 0.12)"
         : "0 2px 20px rgba(0, 0, 0, 0.04)",
       padding: isScrolled ? "0.75rem 0" : "1rem 0",
       zIndex: 100,
       borderBottom: isScrolled
         ? "1px solid rgba(148, 163, 184, 0.2)"
         : "1px solid #f1f5f9",
       transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
     }}
   >
     <div
       style={{
         maxWidth: "1200px",
         margin: "0 auto",
         padding: "0 2rem",
         display: "flex",
         justifyContent: "space-between",
         alignItems: "center",
       }}
     >
       {/* Logo with subtle animation */}
       <div
         style={{
           fontSize: "1.75rem",
           fontWeight: "700",
           background: "linear-gradient(135deg, #1f2937 0%, #4f46e5 100%)",
           WebkitBackgroundClip: "text",
           WebkitTextFillColor: "transparent",
           backgroundClip: "text",
           letterSpacing: "-0.5px",
           transition: "all 0.3s ease",
           cursor: "pointer",
           transform: "translateY(0)",
           animation: "logoFloat 3s ease-in-out infinite",
         }}
         onMouseEnter={(e) => {
           e.target.style.transform = "translateY(-2px) scale(1.05)";
         }}
         onMouseLeave={(e) => {
           e.target.style.transform = "translateY(0) scale(1)";
         }}
       >
         Mansi's Portfolio
       </div>


       {/* Desktop Menu with enhanced animations */}
       <div
         style={{
           display: "flex",
           gap: "2.5rem",
           alignItems: "center",
         }}
         className="desktop-menu"
       >
         {["Home", "Projects", "Contact"].map((item, index) => (
           <a
             key={item}
             href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
             style={{
               color: "#64748b",
               textDecoration: "none",
               fontWeight: "500",
               fontSize: "1rem",
               position: "relative",
               padding: "0.75rem 1rem",
               borderRadius: "8px",
               transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
               transform: "translateY(0)",
               opacity: 0,
               animation: `slideInDown 0.6s ease forwards ${index * 0.1}s`,
             }}
             onMouseEnter={(e) => {
               e.target.style.color = "#1f2937";
               e.target.style.backgroundColor = "rgba(79, 70, 229, 0.08)";
               e.target.style.transform = "translateY(-2px)";
               e.target.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.15)";
             }}
             onMouseLeave={(e) => {
               e.target.style.color = "#64748b";
               e.target.style.backgroundColor = "transparent";
               e.target.style.transform = "translateY(0)";
               e.target.style.boxShadow = "none";
             }}
           >
             {item}
             <span
               style={{
                 position: "absolute",
                 bottom: "0",
                 left: "50%",
                 transform: "translateX(-50%) scaleX(0)",
                 width: "60%",
                 height: "2px",
                 background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                 borderRadius: "2px",
                 transition: "transform 0.3s ease",
               }}
               className="nav-underline"
             ></span>
           </a>
         ))}
       </div>


       {/* Mobile Menu Button with rotation animation */}
       <button
         onClick={toggleMobileMenu}
         style={{
           display: "none",
           background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
           border: "1px solid rgba(148, 163, 184, 0.2)",
           cursor: "pointer",
           padding: "0.75rem",
           borderRadius: "12px",
           transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
           transform: isMobileMenuOpen
             ? "rotate(90deg) scale(1.1)"
             : "rotate(0deg) scale(1)",
           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
         }}
         className="mobile-menu-button"
         onMouseEnter={(e) => {
           if (!isMobileMenuOpen) {
             e.target.style.transform = "scale(1.1)";
             e.target.style.boxShadow = "0 6px 20px rgba(79, 70, 229, 0.2)";
           }
         }}
         onMouseLeave={(e) => {
           if (!isMobileMenuOpen) {
             e.target.style.transform = "scale(1)";
             e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
           }
         }}
       >
         <div
           style={{
             transition: "transform 0.3s ease",
             transform: isMobileMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
           }}
         >
           {isMobileMenuOpen ? (
             <X size={20} color="#1f2937" />
           ) : (
             <Menu size={20} color="#1f2937" />
           )}
         </div>
       </button>
     </div>


     {/* Mobile Menu with slide animation */}
     <div
       style={{
         backgroundColor: "rgba(255, 255, 255, 0.98)",
         backdropFilter: "blur(20px)",
         WebkitBackdropFilter: "blur(20px)",
         borderTop: "1px solid rgba(148, 163, 184, 0.2)",
         padding: isMobileMenuOpen ? "1.5rem 2rem" : "0 2rem",
         maxHeight: isMobileMenuOpen ? "300px" : "0",
         overflow: "hidden",
         transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
         display: "none",
         boxShadow: isMobileMenuOpen
           ? "0 10px 25px rgba(0, 0, 0, 0.1)"
           : "none",
       }}
       className="mobile-menu"
     >
       <div
         style={{
           display: "flex",
           flexDirection: "column",
           gap: "0.5rem",
           transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-20px)",
           opacity: isMobileMenuOpen ? 1 : 0,
           transition: "all 0.3s ease 0.1s",
         }}
       >
         {["Home", "Projects", "Contact"].map((item, index) => (
           <a
             key={item}
             href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
             onClick={() => setIsMobileMenuOpen(false)}
             style={{
               color: "#64748b",
               textDecoration: "none",
               fontWeight: "500",
               fontSize: "1.1rem",
               padding: "1rem 1.5rem",
               borderRadius: "12px",
               transition: "all 0.3s ease",
               border: "1px solid transparent",
               transform: `translateX(${isMobileMenuOpen ? "0" : "-20px"})`,
               opacity: isMobileMenuOpen ? 1 : 0,
               transitionDelay: `${index * 0.1}s`,
             }}
             onMouseEnter={(e) => {
               e.target.style.backgroundColor = "rgba(79, 70, 229, 0.08)";
               e.target.style.borderColor = "rgba(79, 70, 229, 0.2)";
               e.target.style.color = "#1f2937";
               e.target.style.transform = "translateX(8px)";
             }}
             onMouseLeave={(e) => {
               e.target.style.backgroundColor = "transparent";
               e.target.style.borderColor = "transparent";
               e.target.style.color = "#64748b";
               e.target.style.transform = "translateX(0)";
             }}
           >
             {item}
           </a>
         ))}
       </div>
     </div>


     <style>{`
       @keyframes logoFloat {
         0%, 100% { transform: translateY(0px); }
         50% { transform: translateY(-2px); }
       }
      
       @keyframes slideInDown {
         from {
           opacity: 0;
           transform: translateY(-20px);
         }
         to {
           opacity: 1;
           transform: translateY(0);
         }
       }
      
       @media (max-width: 768px) {
         .desktop-menu {
           display: none !important;
         }
         .mobile-menu-button {
           display: flex !important;
           align-items: center;
           justify-content: center;
         }
         .mobile-menu {
           display: block !important;
         }
       }ar
      
       .desktop-menu a:hover .nav-underline {
         transform: translateX(-50%) scaleX(1) !important;
       }
      
       /* Smooth scrollbar */
       ::-webkit-scrollbar {
         width: 8px;
       }
      
       ::-webkit-scrollbar-track {
         background: #f1f5f9;
       }
      
       ::-webkit-scrollbar-thumb {
         background: linear-gradient(45deg, #4f46e5, #7c3aed);
         border-radius: 4px;
       }
      
       ::-webkit-scrollbar-thumb:hover {
         background: linear-gradient(45deg, #3730a3, #6d28d9);
       }
     `}</style>
   </nav>
 );
}


export default Navbar;
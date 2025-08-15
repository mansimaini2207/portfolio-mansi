import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


function Contact() {
 const [submitted, setSubmitted] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [error, setError] = useState('');
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   message: ''
 });


 // Replace this URL with your Google Apps Script web app URL
 const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjLIiVK5nNTdOBnRiceHkEOwmhd4I0nTYJeib6xQ-1ES3YO3c6fgX1GQb-51LugWC_/exec';


 // Email validation function
 const isValidEmail = (email) => {
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   return emailRegex.test(email);
 };


 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setFormData(prev => ({
     ...prev,
     [name]: value
   }));
 };


 const handleSubmit = async (e) => {
   e.preventDefault();
   setIsSubmitting(true);
   setError('');


   // Validate email format before submitting
   if (!isValidEmail(formData.email)) {
     setError('Please enter a valid email address');
     setIsSubmitting(false);
     return;
   }


   // Additional validation
   if (!formData.name.trim()) {
     setError('Please enter your name');
     setIsSubmitting(false);
     return;
   }


   if (!formData.message.trim()) {
     setError('Please enter a message');
     setIsSubmitting(false);
     return;
   }


   try {
     const response = await fetch(GOOGLE_SCRIPT_URL, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
       mode: 'no-cors'
     });


     setSubmitted(true);
     setFormData({ name: '', email: '', message: '' });
     setTimeout(() => setSubmitted(false), 4000);
    
   } catch (error) {
     console.error('Error submitting form:', error);
     setError('Failed to send message. Please try again.');
   } finally {
     setIsSubmitting(false);
   }
 };


 return (
   <div style={{
     minHeight: '80vh',
     background: '#fafafa',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     padding: '2rem 1rem',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
   }}>
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, ease: "easeOut" }}
       style={{
         width: '100%',
         maxWidth: '480px',
         background: 'white',
         borderRadius: '12px',
         boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 20px 40px rgba(0, 0, 0, 0.08)',
         border: '1px solid rgba(0, 0, 0, 0.05)',
         overflow: 'hidden'
       }}
     >
       {/* Header */}
       <div style={{
         padding: '2.5rem 2.5rem 1.5rem',
         textAlign: 'center',
         borderBottom: '1px solid #f1f5f9'
       }}>
         <motion.h2
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2, duration: 0.6 }}
           style={{
             fontSize: '1.875rem',
             fontWeight: '700',
             color: '#0f172a',
             margin: '0 0 0.5rem 0',
             letterSpacing: '-0.025em'
           }}
         >
           Get in Touch
         </motion.h2>
         <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3, duration: 0.6 }}
           style={{
             fontSize: '0.95rem',
             color: '#64748b',
             margin: 0,
             lineHeight: '1.5'
           }}
         >
           Send me a message and I'll get back to you soon.
         </motion.p>
       </div>


       {/* Form */}
       <div style={{ padding: '2rem 2.5rem 2.5rem' }}>
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4, duration: 0.6 }}
           style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
         >
           {/* Name Input */}
           <div>
             <label style={{
               display: 'block',
               fontSize: '0.875rem',
               fontWeight: '500',
               color: '#374151',
               marginBottom: '0.5rem'
             }}>
               Name
             </label>
             <motion.input
               type="text"
               name="name"
               value={formData.name}
               onChange={handleInputChange}
               whileFocus={{ scale: 1.01 }}
               transition={{ duration: 0.2 }}
               style={{
                 width: '100%',
                 padding: '0.75rem 1rem',
                 fontSize: '1rem',
                 color: '#1f2937',
                 background: 'white',
                 border: '2px solid #e5e7eb',
                 borderRadius: '8px',
                 outline: 'none',
                 transition: 'all 0.2s ease',
                 boxSizing: 'border-box',
                 fontFamily: 'inherit'
               }}
               onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
               onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
               required
               disabled={isSubmitting}
             />
           </div>


           {/* Email Input */}
           <div>
             <label style={{
               display: 'block',
               fontSize: '0.875rem',
               fontWeight: '500',
               color: '#374151',
               marginBottom: '0.5rem'
             }}>
               Email
             </label>
             <motion.input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleInputChange}
               whileFocus={{ scale: 1.01 }}
               transition={{ duration: 0.2 }}
               style={{
                 width: '100%',
                 padding: '0.75rem 1rem',
                 fontSize: '1rem',
                 color: '#1f2937',
                 background: 'white',
                 border: `2px solid ${formData.email && !isValidEmail(formData.email) ? '#ef4444' : '#e5e7eb'}`,
                 borderRadius: '8px',
                 outline: 'none',
                 transition: 'all 0.2s ease',
                 boxSizing: 'border-box',
                 fontFamily: 'inherit'
               }}
               onFocus={(e) => {
                 if (formData.email && !isValidEmail(formData.email)) {
                   e.target.style.borderColor = '#ef4444';
                 } else {
                   e.target.style.borderColor = '#3b82f6';
                 }
               }}
               onBlur={(e) => {
                 if (formData.email && !isValidEmail(formData.email)) {
                   e.target.style.borderColor = '#ef4444';
                 } else {
                   e.target.style.borderColor = '#e5e7eb';
                 }
               }}
               required
               disabled={isSubmitting}
             />
            
             <AnimatePresence>
               {formData.email && !isValidEmail(formData.email) && (
                 <motion.p
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   style={{
                     color: '#ef4444',
                     fontSize: '0.875rem',
                     marginTop: '0.5rem',
                     marginBottom: 0
                   }}
                 >
                   Please enter a valid email address
                 </motion.p>
               )}
             </AnimatePresence>
           </div>


           {/* Message Textarea */}
           <div>
             <label style={{
               display: 'block',
               fontSize: '0.875rem',
               fontWeight: '500',
               color: '#374151',
               marginBottom: '0.5rem'
             }}>
               Message
             </label>
             <motion.textarea
               name="message"
               value={formData.message}
               onChange={handleInputChange}
               rows="4"
               whileFocus={{ scale: 1.01 }}
               transition={{ duration: 0.2 }}
               style={{
                 width: '100%',
                 padding: '0.75rem 1rem',
                 fontSize: '1rem',
                 color: '#1f2937',
                 background: 'white',
                 border: '2px solid #e5e7eb',
                 borderRadius: '8px',
                 outline: 'none',
                 resize: 'vertical',
                 minHeight: '100px',
                 transition: 'all 0.2s ease',
                 boxSizing: 'border-box',
                 fontFamily: 'inherit'
               }}
               onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
               onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
               required
               disabled={isSubmitting}
             />
           </div>


           {/* Submit Button */}
           <motion.button
             onClick={handleSubmit}
             whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
             whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
             transition={{ duration: 0.2 }}
             style={{
               width: '100%',
               padding: '0.875rem 1.5rem',
               fontSize: '1rem',
               fontWeight: '600',
               color: 'white',
               background: isSubmitting ? '#9ca3af' : '#111827',
               border: 'none',
               borderRadius: '8px',
               cursor: isSubmitting ? 'not-allowed' : 'pointer',
               transition: 'all 0.2s ease',
               marginTop: '0.5rem'
             }}
             onMouseEnter={(e) => {
               if (!isSubmitting) e.target.style.background = '#1f2937';
             }}
             onMouseLeave={(e) => {
               if (!isSubmitting) e.target.style.background = '#111827';
             }}
             disabled={isSubmitting}
           >
             {isSubmitting ? 'Sending...' : 'Send Message'}
           </motion.button>
         </motion.div>
       </div>


       {/* Success Message */}
       <AnimatePresence>
         {submitted && (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             style={{
               margin: '0 2.5rem 2.5rem',
               padding: '1rem',
               background: '#f0fdf4',
               border: '1px solid #bbf7d0',
               color: '#166534',
               borderRadius: '8px',
               fontSize: '0.875rem',
               fontWeight: '500'
             }}
           >
             ✓ Message sent successfully! I'll get back to you soon.
           </motion.div>
         )}
       </AnimatePresence>


       {/* Error Message */}
       <AnimatePresence>
         {error && (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             style={{
               margin: '0 2.5rem 2.5rem',
               padding: '1rem',
               background: '#fef2f2',
               border: '1px solid #fecaca',
               color: '#dc2626',
               borderRadius: '8px',
               fontSize: '0.875rem',
               fontWeight: '500'
             }}
           >
             {error}
           </motion.div>
         )}
       </AnimatePresence>
     </motion.div>
   </div>
 );
}


export default Contact;


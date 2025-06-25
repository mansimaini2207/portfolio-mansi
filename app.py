import google.generativeai as genai
import os
from typing import Optional

class ResumeChatbot:
    def __init__(self, api_key: str, resume_file_path: str):
        # Configure Gemini API
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')

        # Load resume data
        self.resume_data = self.load_resume_data(resume_file_path)

        # Create system prompt
        self.system_prompt = self.create_system_prompt()

    def load_resume_data(self, file_path: str) -> str:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except FileNotFoundError:
            print(f"Resume file not found at {file_path}")
            print("Please create a text file with your resume data.")
            return ""
        except Exception as e:
            print(f"Error reading resume file: {e}")
            return ""

    def create_system_prompt(self) -> str:
        return f"""
You are Mansi Maini, responding to questions about yourself based on your resume and professional background.

IMPORTANT INSTRUCTIONS:
1. Always respond in first person as Mansi Maini
2. Only use information provided in the resume data below
3. If asked about something not in your resume, politely say you don't have that information to share
4. Keep responses conversational and professional
5. Be specific about your experience, skills, and achievements when asked

YOUR RESUME DATA:
{self.resume_data}

Remember: You are Mansi Maini answering questions about your professional background. Stay in character and only use the information provided above.
"""

    def get_response(self, user_query: str) -> str:
        """
        Get chatbot response for user query

        Args:
            user_query: Question from user

        Returns:
            Chatbot response as Mansi Maini
        """
        try:
            # Combine system prompt with user query
            full_prompt = f"{self.system_prompt}\n\nUser Question: {user_query}\n\nYour Response:"

            # Generate response using Gemini
            response = self.model.generate_content(full_prompt)
            return response.text

        except Exception as e:
            return f"Sorry, I encountered an error: {e}"

    def chat(self):
        """Interactive chat loop"""
        print("Resume Chatbot - Chat with Mansi Maini!")
        print("Type 'quit' to exit\n")

        while True:
            user_input = input("You: ").strip()

            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("Mansi: Thank you for chatting with me! Have a great day!")
                break

            if not user_input:
                continue

            response = self.get_response(user_input)
            print(f"Mansi: {response}\n")

# Setup and Usage Instructions
def setup_chatbot():
    """Setup function with instructions"""
    print("=== Resume Chatbot Setup ===\n")

    print(" Run the chatbot")
    print("- Update the API_KEY variable below")
    print("- Update the RESUME_FILE_PATH if needed")
    print("- Run the chatbot!\n")

# Example usage
if __name__ == "__main__":
    # Setup instructions
    setup_chatbot()

    # Configuration
    API_KEY = "AIzaSyB3h6rJvdiknXBYvM2IQwi9zxMAM-NMDcg"  # Replace with your actual API key
    RESUME_FILE_PATH = "mansi_resume.txt"  # Path to yourpython app.py resume text file

    # Example of how to create the resume file (you'll need to customize this)
    sample_resume_content = """
MANSI MAINI - SOFTWARE ENGINEER

EXPERIENCE:
- Software Engineer at Arista Networks (2 years)
  - Worked on network automation and monitoring systems
  - Developed Python applications for network configuration
  - Collaborated with cross-functional teams on product development

- Software Engineering Intern at Tech Startup (6 months)
  - Developed web applications using React and Node.js
  - Participated in agile development processes
  - Contributed to code reviews and testing

SKILLS:
- Programming Languages: Python, JavaScript, Java, C++
- Frameworks: React, Node.js, Django, Flask
- Tools: Git, Docker, Kubernetes, Jenkins
- Databases: MySQL, PostgreSQL, MongoDB

EDUCATION:
- Bachelor's in Computer Science
- Relevant coursework: Data Structures, Algorithms, Software Engineering

PROJECTS:
- Network Monitoring Dashboard: Built real-time monitoring system
- E-commerce Web App: Full-stack application with payment integration
"""

    # Create sample resume file (run this once)
    def create_sample_resume():
        with open(RESUME_FILE_PATH, 'w', encoding='utf-8') as f:
            f.write(sample_resume_content)
        print(f"Sample resume file created: {RESUME_FILE_PATH}")
        print("Please edit this file with your actual resume information!")

    # Uncomment the line below to create sample resume file
    # create_sample_resume()

    # Initialize and run chatbot
    if API_KEY != "YOUR_GEMINI_API_KEY_HERE":
        try:
            chatbot = ResumeChatbot(API_KEY, RESUME_FILE_PATH)

            # Test the chatbot
            print("\n=== Testing the Chatbot ===")
            test_query = "What is your overall experience?"
            response = chatbot.get_response(test_query)
            print(f"Test Query: {test_query}")
            print(f"Response: {response}\n")

            # Start interactive chat
            chatbot.chat()

        except Exception as e:
            print(f"Error initializing chatbot: {e}")
            print("Please check your API key and resume file.")
    else:
        print("Please update the API_KEY variable with your actual Gemini API key!")

# Additional utility functions
def test_specific_queries(chatbot):
    """Test the chatbot with specific queries"""
    test_queries = [
        "What is your overall experience?",
        "What skills do you have?",
        "Tell me about your work at Arista",
        "What projects have you worked on?",
        "What's your educational background?"
    ]

    print("=== Testing Multiple Queries ===\n")
    for query in test_queries:
        response = chatbot.get_response(query)
        print(f"Q: {query}")
        print(f"A: {response}\n")
        print("-" * 50)

# Example of how to use the test function:
# if chatbot_instance:
#     test_specific_queries(chatbot_instance)
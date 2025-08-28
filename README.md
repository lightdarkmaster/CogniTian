# Cognitian: Your AI Assistant for Conversations  

Cognitian is an innovative **AI-powered conversational assistant** designed to enhance the way you communicate. Leveraging cutting-edge natural language processing (NLP) technology, Cognitian generates context-aware, human-like responses to help you write faster, brainstorm ideas, or build engaging conversations with ease.  

Unlike a simple chatbot, Cognitian is a **productivity tool** that supports you in diverse tasks—whether composing professional emails, drafting documents, generating creative content, or simulating interactive dialogues.  

---

## Core Technology  

Cognitian is powered by the **Gemini AI model**, an advanced large language model (LLM) developed using state-of-the-art NLP research. The Gemini model provides:  
- Contextual and coherent text generation.  
- Improved adaptability to user intent.  
- Continuous improvements from ongoing AI research.  

> **Note:** Cognitian is intended as an **assistive tool**, not a replacement for genuine human interaction.  

---

## Tech Stack  

The application is developed using **Next.js**, a modern React-based framework for building fast, scalable, and SEO-friendly applications. Cognitian benefits from:  

- **Server-Side Rendering (SSR)** for faster responses.  
- **Static Site Generation (SSG)** for performance optimization.  
- **Scalability** for handling large user bases.  
- **Maintainability** with modular React components.  

---

## Features  

- ✅ Generate **human-like, context-aware text** from user prompts.  
- ✅ Powered by the **Gemini AI model** for advanced NLP capabilities.  
- ✅ Built on **Next.js** for speed, scalability, and maintainability.  
- ✅ **Open-source** project – customize or contribute on GitHub.  
- ✅ Designed to be **lightweight, extensible, and developer-friendly**.  

---

## Documentation  

Cognitian comes with:  
- 📘 A comprehensive `README.md` for installation and usage.  
- 🔗 Example API request workflows (using Postman).  
- 📑 Notes on extending and contributing to the project.  

For advanced configurations, always refer to the [Google AI Documentation](https://ai.google.dev/docs).

---
## Test API in Postman
1. Open **Postman** → Create a new request.
2. **Method:** `POST`
3. Paste the Gemini Endpoint replace the key with the actual API key
4. Go to Headers tab add "Content type"
5. Key: Content Type
6. Value: Application/json
7. Body select raw options from the dropdown set the format to JSON
8. add a sample json prompt:  
```json
{
      "contents": [{
        "parts": [{
          "text": "Tell me a short joke about a cat."
        }]
      }]
    }
```
9. advance prompt: 

```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "Tell me a short joke about a cat."
        }
      ]
    }
  ],
  "safetySettings": [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
  ],
  "generationConfig": {
    "maxOutputTokens": 200,
    "temperature": 0.7,
    "topP": 0.95,
    "topK": 40
  }
}

```
---

## Installation  

Clone the repository and install dependencies:  

```bash
git clone https://github.com/your-username/cognitian.git
cd cognitian
npm install
npm run dev

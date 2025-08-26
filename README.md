Cognitian: Your AI Assistant for Conversations
========================================================

Cognitian is an innovative AI assistant designed to help you with your conversations. It uses the latest advancements in natural language processing to generate human-like text based on the input it receives. Cognitian is not just a chatbot, it's a tool that can help you communicate more efficiently and effectively.

The AI is built using the Gemini AI model, a powerful language model that is capable of generating coherent and context-specific text. The model is based on the latest research in the field of natural language processing and is constantly being improved and updated.

Cognitian is not meant to be a replacement for human conversation, but rather a tool to help you communicate more efficiently and effectively. It can be used to generate ideas, write emails, or even create entire conversations.

The project is built using Next.js, a popular React-based framework for building server-rendered, statically generated, and performance optimized web applications. The application is designed to be fast, scalable, and easy to maintain.

The project is available on GitHub and is open source, so you can contribute to it or use it as a starting point for your own projects.

Features
--------

* Generate human-like text based on input
* Use the Gemini AI model to generate text
* Fast and scalable
* Easy to maintain and update
* Open source

Documentation
-------------

The project is well-documented, with a comprehensive README file that explains how to use the application, how to contribute to it, and how to use the Gemini AI model.

Installation
------------

The project is easy to install, with a simple command-line interface. You can install the project by running the following command:

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
10. Always check the [Google AI Documentation](https://ai.google.dev/docs) for the latest endpoints.


## Postman Setup
1. Open **Postman** → Create a new request.
2. **Method:** `POST`
3. **Request URL (example):**

# 🤖 Modular AI Customer Support & Lead Generation Bot

An intelligent, context-aware customer support bot built with Node.js and Google Gemini Flash API. Designed for Telegram (and easily adapted for web widgets or Discord), this bot uses a local knowledge base to handle customer service inquiries 24/7 and captures qualified lead contact information automatically.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Gemini API](https://img.shields.io/badge/AI-Google%20Gemini%20Flash-blue)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## ✨ Features

- **Context-Bound Knowledge Base:** Injects custom company knowledge (`data/knowledge.json`) directly into system prompts to prevent AI hallucinations and provide exact pricing/service details.
- **24/7 Automated Support:** Answers common FAQ questions instantly without human intervention.
- **Human Escalation Trigger:** Detects when questions exceed its knowledge base or when users request a real manager, prompting the client for an email follow-up.
- **Omnichannel Core:** Built around a modular engine that can be attached to Telegram, Web Chat Widgets, WhatsApp, or Discord.

---

## 🛠️ Tech Stack

- **Runtime Engine:** Node.js
- **Bot Interface:** `node-telegram-bot-api`
- **AI Core:** Google Gen AI SDK (`@google/genai`) / Gemini 1.5 Flash
- **State & Knowledge:** JSON Context Storage

---

## 📂 Project Structure

```text
modular-ai-support-bot/
├── data/
│   └── knowledge.json      # Company services, pricing, & policy rules
├── src/
│   └── index.js            # Bot event handlers & Gemini API pipeline
├── .env                    # API Tokens & Configuration (Git-ignored)
├── .gitignore
├── package.json
└── README.md

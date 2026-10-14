require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!botToken || !geminiApiKey) {
  console.error('❌ Error: Missing TELEGRAM_BOT_TOKEN or GEMINI_API_KEY in .env!');
  process.exit(1);
}

// Load company FAQ context
const knowledgePath = path.join(__dirname, '../data/knowledge.json');
const knowledgeData = fs.readFileSync(knowledgePath, 'utf8');

const bot = new TelegramBot(botToken, { polling: true });
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

// System prompt enforcing FAQ context and escalation triggers
const SYSTEM_INSTRUCTION = `
You are an expert customer support agent representing the company documented below:
---
${knowledgeData}
---

RULES:
1. Answer strictly using information found in the knowledge base above.
2. Be polite, professional, and concise.
3. If a user asks a question not covered by the knowledge base, OR asks to speak to a real person, state:
   "I will forward your inquiry to a human specialist. Please provide your email address so we can follow up."
`;

console.log('🤖 Omnichannel AI Support Engine is running...');

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    '👋 Welcome! How can I assist you with our services today?'
  );
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userText = msg.text;

  if (!userText || userText.startsWith('/')) return;

  try {
    bot.sendChatAction(chatId, 'typing');

    // Call Gemini API using modern SDK
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: userText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const replyText = response.text || "I am unable to parse your request right now.";
    bot.sendMessage(chatId, replyText);

    // Simple Human Escalation Trigger: Check if message contains an email address
    if (userText.includes('@') && userText.includes('.')) {
      console.log(`🚨 LEAD DETECTED: ${userText}`);
      bot.sendMessage(
        chatId,
        '✅ Thank you! Our support team has been notified and will email you shortly.'
      );
    }
  } catch (err) {
    console.error('❌ Bot Processing Error:', err.message);
    bot.sendMessage(
      chatId,
      '⚠️ Sorry, I am having trouble processing your request right now.'
    );
  }
});
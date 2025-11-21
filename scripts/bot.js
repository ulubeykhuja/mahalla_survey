const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Replace with your token
const token = '8593600922:AAG54JwrZN3BhGI-F9MHH7ixds6yj0r8gls';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// WEB_APP_URL will be set later. For now, we can use a placeholder or env var.
// In production, this must be your Vercel/HTTPS URL.
const webAppUrl = process.env.WEB_APP_URL || 'https://google.com'; // Fallback until deployed

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Assalomu alaykum! Mahalla so\'rovnoma tizimiga xush kelibsiz.', {
            reply_markup: {
                keyboard: [
                    [{ text: "So'rovnomani ochish", web_app: { url: webAppUrl } }]
                ],
                resize_keyboard: true
            }
        });
    }
});

console.log('Bot ishga tushdi...');

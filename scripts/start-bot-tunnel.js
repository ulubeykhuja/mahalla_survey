const localtunnel = require('localtunnel');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = '8593600922:AAG54JwrZN3BhGI-F9MHH7ixds6yj0r8gls';

(async () => {
    try {
        console.log('Tunnel yaratilmoqda...');
        const tunnel = await localtunnel({ port: 3000 });

        console.log(`\n✅ SIZNING URL MANZILINGIZ: ${tunnel.url}`);
        console.log('⚠️  ESLATMA: Agar localtunnel parolini so\'rasa, bu yerdan IP adresingizni oling: https://loca.lt/mytunnelpassword');

        // Start Bot
        const bot = new TelegramBot(token, { polling: true });

        bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const text = msg.text;

            if (text === '/start') {
                await bot.sendMessage(chatId, 'Assalomu alaykum! Mahalla so\'rovnoma tizimiga xush kelibsiz.', {
                    reply_markup: {
                        keyboard: [
                            [{ text: "So'rovnomani ochish", web_app: { url: tunnel.url } }]
                        ],
                        resize_keyboard: true
                    }
                });
            }
        });

        console.log('🤖 Bot ishga tushdi! Telegramda /start ni bosing.');

        tunnel.on('close', () => {
            console.log('Tunnel yopildi');
        });
    } catch (error) {
        console.error('Xatolik:', error);
    }
})();

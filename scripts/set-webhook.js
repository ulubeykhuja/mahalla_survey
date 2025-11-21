const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = '8593600922:AAG54JwrZN3BhGI-F9MHH7ixds6yj0r8gls';
const bot = new TelegramBot(token);

const vercelUrl = 'https://mahalla-survey.vercel.app'; // Your Vercel Domain
const webhookUrl = `${vercelUrl}/api/bot`;

(async () => {
    try {
        console.log(`Webhook ulanmoqda: ${webhookUrl}`);
        await bot.setWebHook(webhookUrl);
        console.log('✅ Muvaffaqiyatli ulandi!');

        const info = await bot.getWebHookInfo();
        console.log('Webhook holati:', info);
    } catch (error) {
        console.error('Xatolik:', error);
    }
})();

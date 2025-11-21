import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN || '8593600922:AAG54JwrZN3BhGI-F9MHH7ixds6yj0r8gls';
const bot = new TelegramBot(token);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (body.message && body.message.text === '/start') {
            const chatId = body.message.chat.id;
            await bot.sendMessage(chatId, 'Assalomu alaykum! Mahalla so\'rovnoma tizimiga xush kelibsiz.\n\nQuyidagi tugmani bosib, ilovani oching:', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📋 So'rovnomani ochish", web_app: { url: 'https://mahalla-survey.vercel.app' } }]
                    ]
                }
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Bot error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

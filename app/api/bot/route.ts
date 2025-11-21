import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN || '8593600922:AAG54JwrZN3BhGI-F9MHH7ixds6yj0r8gls';
const bot = new TelegramBot(token);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (body.message && body.message.text === '/start') {
            const chatId = body.message.chat.id;
            await bot.sendMessage(chatId, 'Assalomu alaykum! Mahalla so\'rovnoma tizimiga xush kelibsiz.', {
                reply_markup: {
                    keyboard: [
                        [{ text: "So'rovnomani ochish", web_app: { url: 'https://mahalla-survey.vercel.app' } }]
                    ],
                    resize_keyboard: true
                }
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Bot error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

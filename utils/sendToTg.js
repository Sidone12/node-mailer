const axios = require('axios');

module.exports = async function sendToTg(message) {
  try {
    let url = 'https://api.telegram.org/bot' + process.env.TELEGRAM_BOT_TOKEN + '/sendMessage';
    let body = {
      chat_id: process.env.TG_CHAT,
      parse_mode: 'Markdown',
      text: message,
    };
    const res = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers':
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      },
    });
    // console.log("No problem", message, res);
    return res;
  } catch (error) {
    console.log(message);
    console.error('Error sending message to Telegram:', error);
    throw error;
  }
};
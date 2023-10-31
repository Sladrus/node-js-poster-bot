require('dotenv').config();
const cron = require('node-cron');

const TelegramBot = require('node-telegram-bot-api');

MESSAGE_TEXT =
  '✈️ Отправляйте переводы в Европу, США, Китай и другие страны без ограничений на счета физических и юридических лиц.\n\n🌏 <a href="https://t.me/+5HP4Vk7ky0g1OTBi">MoneyPort — </a> надежная альтернатива SWIFT-переводам\n\n<b>Возможности</b> <a href="https://t.me/+5HP4Vk7ky0g1OTBi">MoneyPort</a>:\n\n→ Операции с криптовалютами по всему миру.\n\n→ Выдача наличных в 45 городах мира.\n\n→ Прием платежей с зарубежных компаний с последующей конвертацией в рубли или криптовалюту.\n\n→ Оплаты по инвойсам за товары и услуги, в том числе за машины, обучение, лечение, запчасти, оборудование, консалтинг, разработку и другое.\n\n→ Оплаты физическим лицам по всему миру в системах: PayPal, Zelle, Wise, Revolut, N26, BBVA, Cash app, Alipay, WeChat, SEPA, Swift.\n\n<b>Подпишитесь на канал, чтобы совершить перевод <a href="https://t.me/+5HP4Vk7ky0g1OTBi">@moneyport</a></b>';
PHOTO_PATH = './mp_photo.jpg';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const postNews = async () => {
  try {
    await bot.sendPhoto(process.env.GROUP_ID, PHOTO_PATH, {
      caption: MESSAGE_TEXT,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
  } catch (e) {
    console.log(e);
  }
};

cron.schedule('0 15 * * *', () => {
  postNews();
});

bot.on('channel_post', async (msg) => {
  try {
    await bot.forwardMessage(
      process.env.GROUP_ID,
      process.env.CHANNEL_NAME,
      msg.message_id,
      { disable_web_page_preview: true }
    );
  } catch (e) {
    console.log(e);
  }
});

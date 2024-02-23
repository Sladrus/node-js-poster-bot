require('dotenv').config();
const cron = require('node-cron');

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const postList = [
  {
    text: '<b>🚀 Как получить зарплату от работодателя из США с помощью MoneyPort</b>\n\n1. Вы получаете реквизиты нашей американской компании, вносите их в свой аккаунт на платформе Deel, Shipmoney или отправляете эти реквизиты работодателю.\n\n2. Ваши деньги приходят на наш счёт, мы берём свою комиссию и предлагаем варианты выдачи: наличными, на карту или на расчётный счет ИП.\n\n3. Мы переводим вам деньги с указанием назначения, если требуется — за IT-услуги, например.\n\n<b><a href="https://t.me/+O-mTSTjHXdU0NTJi">Подробнее узнавайте в Telegram-канале MoneyPort</a></b>',
    photoPath: './mp_photo_1.jpg',
  },
  {
    text: '<b>MoneyPort выдает наличные в 46 странах</b>\n\n💰 Около 30% всех наших операций — это выдача наличных. Самые популярные страны — Испания, Италия, Сербия, Великобритания, США и ОАЭ.\n\nВ каких городах и странах мы можем выдать наличные, рассказываем в <a href="https://t.me/+n-VDjxVrtRthMWFi">Telegram канале</a>',
    photoPath: './mp_photo_2.jpg',
  },
  {
    text: '<b>🧾 Как оплатить инвойс c помощью MoneyPort</b>\n\nКак это работает\n\n1. Продавец выставляет инвойс в своей валюте.\n\n2. Вы присылаете в MoneyPort инвойс с реквизитами компании.\n\n3. Мы проверяем компанию и подбираем способ оплаты нужной валютой и с указанием необходимого назначения.\n\n4. Вы вносите рубли на счёт в России, а мы оплачиваем инвойс со своего зарубежного юрлица в нужной валюте.\n\n<blockquote>Комиссии по каждому инвойсу отличаются в зависимости от направления. Поэтому наши менеджеры рассчитывают их индивидуально.</blockquote>\n\n<b><a href="https://t.me/+thNO0eEeswwyZThi">Подробнее узнавайте в Telegram-канале MoneyPort</a></b>',
    photoPath: './mp_photo_3.jpg',
  },
  {
    text: '<b>🚘 Как оплатить машину в Японии, Кореи, США с помощью MoneyPort</b>\n\nКак происходит покупка авто с аукциона\n\n1. Вы присылаете нам инвойс на оплату авто и переводите деньги на наш счёт.\n\n2. Мы выдаем платёжное поручение с получением обеспечения.\n\n3. Переводим деньги на счёт аукциона или конкретного продавца.\n\n4. В описании платежа добавляем номер инвойса и VIN автомобиля. Никакие договоры при этом не требуются.\n\n5. Автомобиль оплачен.\n\n<b><a href="https://t.me/+4JHUu-cegyAwOGJi">Подробнее узнавайте в Telegram-канале MoneyPort</a></b>',
    photoPath: './mp_photo_4.jpg',
  },
  {
    text: '🕊 Международные переводы из России в Европу, США, Китай и другие страны без ограничений на счета физических и юридических лиц.\n\n<b>MoneyPort —  надежная альтернатива SWIFT-переводам</b>\n\n<b>Что может MoneyPort:</b>\n\n→ Выдача наличных в 46 странах мира\n\n→ Прием платежей с зарубежных компаний с последующей конвертацией в рубли или криптовалюту\n\n→ Оплаты по инвойсам за товары и услуги, в том числе за машины, обучение, лечение, запчасти, оборудование, консалтинг, разработку и другое\n\n→ Переводы физическим лицам по всему миру в системах: Zelle, PayPal, Wise, Revolut, N26, BBVA, Cash app, Alipay, WeChat, SEPA, Swift.\n\n<b><a href="https://t.me/+jsMGLg3oAV0yMDRi">Подробнее узнавайте в Telegram-канале MoneyPort</a></b>',
    photoPath: './mp_photo_5.jpg',
  },
];

function* getNextElement(list) {
  let index = 0;
  const length = list.length;

  while (true) {
    yield list[index];

    index = (index + 1) % length;
  }
}

const getNext = getNextElement(postList);

const postNews = async () => {
  try {
    const message = getNext.next().value;
    await bot.sendPhoto(process.env.GROUP_ID, message.photoPath, {
      caption: message.text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
  } catch (e) {
    console.log(e);
  }
};

cron.schedule('0 15 * * *', () => {
  console.log('POST');
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

console.log('Server started');

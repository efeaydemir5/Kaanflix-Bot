const Discord = require('discord.js');
const Opus = require('node-opus');
const googleTTS = require('google-tts-api');
const fs = require('fs');

const client = new Discord.Client();
const config = require('./ayarlar.json');
const languages = require('./languages.json');

let language = config.language;
let speed = 44;

client.on('message', message => {
  if (!message.guild || !message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const { voiceChannel } = message.member;

  if (command === 'söylet') {
    if (voiceChannel) {
      if (voiceChannel.joinable) {
        if (voiceChannel.connection) {
          if (args.length > 0) {
            playTTS(args.join(' '), language, speed, voiceChannel.connection, message);
          } else {
            message.reply('Lütfen Mesajını Yaz');
          }
        } else {
          voiceChannel.join()
          .then(connection => {
            console.log(`${voiceChannel.name} Odasına Katıldım.`);
            message.channel.send(`${voiceChannel}. Odasına Katıldım. `);
            if (args.length > 0) {
              playTTS(args.join(' '), language, speed, connection, message);
            }
          });
        }
      } else {
        message.reply('Ses kanalına katılamıyorum.');
      }
    } else {
      message.reply('önce bir ses kanalında olmanız gerekir.');
    }
  } else if (command === 'dur') {
    if (message.guild.voiceConnection) {
      message.guild.voiceConnection.channel.leave()
      console.log('Ses kanalından başarıyla ayrıldı.');
      message.channel.send('Ses kanalından başarıyla ayrıldı.');
    } else {
      message.reply('Bunu yapmak için ses kanalında olmam gerekiyor.');
    }
  } else if (command === 'dil-ayarla') {
    if (args.length > 0) {
      if (args.toString().toLowerCase() === language) {
        message.reply(`Dil zaten ayarlanmış ${languages[language]}.`);
      } else if (languages.hasOwnProperty(args.toString())) {
        language = args.toString().toLowerCase();
        config.language = language;
        fs.writeFile('./settings.json', JSON.stringify(config, null, 2), function(err) {
          if (err) return console.log(err);
        });
        updatePresence(language);
        message.channel.send(`Dil olarak değiştirildi ${languages[language]}.`);
      } else {
        message.reply(`geçersiz dil Type **${config.prefix}** mevcut dillerin listesi için`);
      }
    } else {
      message.reply('bir dil belirtmeniz gerekiyor.');
    } 
  } else if (command === 'diller') {
    message.channel.send(`
    Şuanlık Bu Diller Bulunmaktadır.:
      :flag_tr:  Türkçe - '**${config.prefix}dil-ayarla tr**'
      :flag_us: İngilizce - '**${config.prefix}dil-ayarla en**'
      :flag_es: İspanyolca - '**${config.prefix}dil-ayarla es**'
      :flag_br: Portekizce - '**${config.prefix}dil-ayarla pt**'
      :flag_fr: Fransızca- '**${config.prefix}dil-ayarla fr**'
      :flag_de: Almanca - '**${config.prefix}dil-ayarlade**'
      :flag_ru: Rusça - '**${config.prefix}dil-ayarla ru**'
      :flag_cn: Çince - '**${config.prefix}dil-ayarla cmn**'
      :flag_kr: Korece - '**${config.prefix}dil-ayarla ko**'
      :flag_jp: Japonca - '**${config.prefix}dil-ayarla ja**'
    `);

  } else if (command === 'hız') {
    const spd = Number(args);
    if (!isNaN(spd) && spd > 0 && spd <= 100) {
      speed = spd / 100;
      console.log(`Sesin Hızı : ${spd}%`);
      message.channel.send(`Sesin Hızı ${spd}% Olarak Ayarlandı. `);
    } else {
      message.reply('geçersiz hız, 1 ile 100 arasında olmalıdır.');
    }
  }
});

client.login(config.discord_token);

function playTTS(phrase, lang, spd, conn, msg) {
  googleTTS(phrase, lang, spd)
    .then(function (url) {
        console.log(`Dil koduyla'${phrase}' için TTS alındı '${lang}' ve ${spd} hız.`);
        const dispatcher = conn.playArbitraryInput(url);
        dispatcher.on('end', () => {
          console.log('TTS gönderimi başarıyla sona erdi.');
        });
        dispatcher.on('error', err => {
          console.error(err);
        })
    })
    .catch(function (err) {
      console.error(err.stack);
      if (err.name === 'RangeError') {
        msg.reply('mesajınızın 200 karakter uzunluğunda olması gerekir..');
      }
    });
}

function updatePresence(lang) {
  client.user.setPresence({
    game: {
      name: `g!oyver Yazarak Oy Verebilirsiniz`,
      type: 'PLAYING'
    }
  });
  console.log(`Presence changed to: ${languages[lang]}.`);
}

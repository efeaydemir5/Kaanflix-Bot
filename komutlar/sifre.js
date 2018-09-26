const Discord = require('discord.js');
const generator = require('generate-password');

//botumu eklemek için  http://bit.ly/nefretbotdavetguncel 
exports.run = function(client, message, args) {
    var uzunluk = args.slice(0).join(' ');

    if (!uzunluk) return message.reply('Bir uzunluk belirt. **Doğru Kullanım**: n!şifre <uzunluk>')

//bu son başka kod vermeyeceğim

    var password = generator.generate({
        length: uzunluk,
        numbers: true,
    })

    message.channel.send(password);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'şifre',
  description: 'Rastgele bir şifre oluşturur.',
  usage: 'şifre <uzunluk>'
};
//Bunun Sahibi Canavar07#8595 'dir Başka Sagibi yoktur

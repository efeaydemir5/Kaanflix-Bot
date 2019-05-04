const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("BOT KOMUTLARI")
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**Bot Komutları**", `**!yak**:Sigara Yakarsınız.\n**!kaanflix**:Size Kaanflix Resimi Atar.\n**!kırbaç**:Botu Kırbaçlarsınız\n**!afk**:Afk Moduna Geçersiniz.\n**!zekam**:Zekanızı Ölçersiniz.\n**!kurabiye**:Size Kurabiye Verir.\n**!günlükmüzik**:Günün Müziğini Gösterir.\n**!benglobalim**:Globallenirsiniz.\n**köle çalış**:Köleye kızarsınız.\n**düello**:İstediğiniz Kişiyle Duello Yaparsınız.\n**canlıdestek**:Moderatörlerden Yardım Alırsınız.\n**hayvan**:Dene gör.\n**afk**:Afk Olursunuz.\n**urfagonder**:Urfa Söylersiniz.\n**şifre**:Random Şifre Alırsınız.\n**slots**:Slot Oyunu Oynarsınız.\n**tavsiye**:Bot Hakkında İsteklerinizi Söylersiniz.`)
  .setFooter("==> Kurucum EfeAydemir☣#3157. <===")
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım= ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y', 'komutlar'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};

const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const useruser = "Komut "  + message.author.username + " tarafından çalıştırıldı";
  const userurl = message.author.avatarURL;
  const canlıyayınbaşarısız = "Lütfen  canlı yayına bir isim veriniz!";
  const canlıyayınbaşarılı = "Canlı yayın başarıyla başlatıldı.";
  const yetkili = "Komut dosyasından 10. satırda bulunan owner_id kontrol ediniz.";

  if (message.author.id !== ('358892155793833985')) {
      const embed = new Discord.RichEmbed()
      .setColor("#FF0000")
      .setTitle(':shield: Canlı Yayın Statüsü Değiştirme :shield:')
      .addField("Sahibim değilsin!", yetkili)
      .setFooter(useruser, userurl)
      .setTimestamp();
      return message.channel.send({ embed });
  }


  const status = args.join(' ');
  if (status.length === 0) {
    const embed = new Discord.RichEmbed()
      .setColor("#FF0000")
      .setTitle(':shield: Canlı Yayın Statüsü Değiştirme :shield:')
      .addField("Başarılı değil!", canlıyayınbaşarısız)
      .setFooter(useruser, userurl)
      .setTimestamp();
    message.channel.send({ embed });
  }

  else if (status.length !== 0) {
   client.user.setPresence({ game: { name: `${status}`, url: 'https://twitch.tv/memoryhackers', type: 1 } });
  const embed = new Discord.RichEmbed()
    .setColor("#00FF00")
    .setTitle(':shield: Canlı Yayın Statüsü Değiştirme :shield:')
    .addField("Başarılı!", canlıyayınbaşarılı)
    .setFooter(useruser, userurl)
    .setTimestamp();
  message.channel.send({ embed });
}};

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

  exports.help = {
    name: 'yayınayarla',
    description: 'Botun yayın statüsünü ayarlar.',
    usage: 'yayınayarla'
  };

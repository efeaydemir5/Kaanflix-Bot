const Discord = require('discord.js');
exports.run = function(client, message, args) {
    if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('⚠ Uyarı ⚠', 'Döviz adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  
  var request = require('request');
   request('https://simsekapi.glitch.me/doviz', function (error, response, body) {
    if (error) return message.channel.send('Hata:', error);
    else if (!error) {
        var genel = JSON.parse(body);
    }
  const embed = new Discord.RichEmbed()
  .setAuthor("Döviz")
  .setColor('RANDOM')
  .setDescription(`💵 **Dolar Alış:** ${genel.dolara} \n💵 **Dolar Satış:** ${genel.dolars} \n💶 **Euro Alış:** ${genel.euroa}\n💶 **Euro Satış:** ${genel.euros}`)
  .setFooter(`Son Güncelleme = ${genel.guncelleme}`)
  message.channel.send({embed});
  
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['doviz'],
  permLevel: 0
};

exports.help = {
  name: 'döviz',
  description: 'Güncel Döviz Akışını Gösterir.', 
  usage: 'z!döviz'
};

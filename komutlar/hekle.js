
const Discord = require('discord.js');



exports.run = (client, message, args) => {

  message.delete();

    let mesaj = args.slice(0).join(' ');

    if (mesaj.length < 1) return message.reply(' :x: heklemek İstediğin birisini etiketlemelisin:x: ');

    const embed = new Discord.RichEmbed()

    .setAuthor('')

    .setColor("RANDOM")

    .setDescription(message.author.username + ` ${mesaj}'ı ` + ' Hekledi!. :warning:  ')

    .setImage("https://media.discordapp.net/attachments/479986875453669376/486108396966248468/tumblr_oihm6gVqr41v05rsfo1_500.gif?width=400&height=300");

    return message.channel.sendEmbed(embed);

};



exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ['hekle'],

  permLevel: 0

};



exports.help = {
name: 'hekle',
description: 'hekler',
usage: 'hekle'
};
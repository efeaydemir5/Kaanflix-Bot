const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("asciidoc", ` _________________________
  
  < Selam Bebekler >
   -------------------------
          \   ^__^
           \  (oo)\_______
              (__)\       )
                  ||----- |
                  ||     ||`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hy', 'essek'],
  permLevel: 0
};

exports.help = {
  name: 'hayvan',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'hayvan'
};
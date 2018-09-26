const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.on('message', msg => {
   if (msg.content.startsWith(prefix + "yak"))  {
    msg.channel.send ("yak yak 🚬🚬🚬 " , {files: ["./resimler/kaanflix1.png"]});


  }

});
exports.help = {
  name: 'yak',
  description: 'Sigara Yakarsınız',
  usage: 'yak'
};



client.on('message', msg => {
   if (msg.content.startsWith(prefix + "kaanflix"))  {
    msg.channel.send ("" , {files: ["./resimler/kaanflix3.jpg"]});


  }
});

client.on('message', msg => {
  if (msg.content === 'köle çalış') {
    msg.channel.sendMessage('tmm ln kızma');
  }
});

client.on('message', msg => {
  if (msg.content === '!kırbaç') {
    msg.channel.sendMessage('ah popom');
  }
});

client.on('message', msg => {
  if (msg.content === '!yenilikler') {
    msg.channel.sendMessage('**!kaanflix**:Kaanflix Fotoğrafı Gösterir.\n**!yak**:Sigara Yakarsınız.\n**!kırbaç**:Botu Kırbaçlarsınız.\n**!afk**:Afk Moduna Geçersiniz.(Geliştirilecek)\n**!gününşarkısı**:Günün Şarkısını Gösterir.\n**!benglobalim**:Dene Ve Gör.\n**!kurabiye**:Kurabiye Verir.\n**!zekam**:Zekanızı Ölçer.\n**çekiliş**:Çekiliş Yapar.');
  }
});

client.on('message', msg => {
  if (msg.content === '!afk') {
    msg.reply('Afk Moduna Geçti :white_check_mark: ');
  }
});

client.on('message', msg => {
  if (msg.content === '!günlükmüzik') {
    msg.channel.sendMessage('Günün Şarkısı: https://www.youtube.com/watch?v=jLzrdogPDqg :flag_tr: :flag_az: ');
  }
});

client.on('message', msg => {
   if (msg.content.startsWith(prefix + "benglobalim"))  {
    msg.channel.send ("G L O B A L L E N D İ N" , {files: ["./resimler/globallendin.jpg"]});


  }
});

client.on('message', message => {
if (message.content.toLowerCase() === prefix + "zekam") {
    var sans = ["11", "15", "20", "24", "28", "31", "39", "45", "49", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "Albert Einstein mısın krdşm"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Zekan___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});

client.on('message', msg => {
  if (msg.content.startsWith(prefix + "çekilis")) {
    msg.channel.send(`Çekilişi Kazanan: ${msg.guild.members.random().displayName}`);
    }
    });

    client.on('message', message => {
if (message.content === prefix + "kurabiye") {
    message.channel.sendMessage(`Canım gel buraya sana kurabiye vereceğim! <@${message.author.id}>`)
    message.react("🍪")
}
});

client.on('message', message => {
if (message.content === 'sa') {
message.channel.send("as");
message.react("👇");
}
});

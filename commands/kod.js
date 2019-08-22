const Discord = require("discord.js");
const config = require("../blakiconfig.json");

module.exports.run = async (blaki, message, args) => {
    
    message.delete().catch(O_o=>{});
    let serverembed = new Discord.RichEmbed()
    .setDescription(`**KOD W SKLEPIE!**`)
    .setColor("#ffa500")
    .setImage('https://i.imgur.com/jj2M5mv.png')
    .setTimestamp(message.createdAt)
    .setFooter('Wspieraj Najlepszego Twórcę!', `${config.avatar}`);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"kod"
}

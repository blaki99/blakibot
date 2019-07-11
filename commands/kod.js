const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription(`**KOD W SKLEPIE!**`)
    .setColor("#15f153")
    .setImage('https://i.imgur.com/jj2M5mv.png')
    .setTimestamp(message.createdAt)
    .setFooter('Wspieraj najlepszego twórcę!', 'https://i.imgur.com/7xm6SSI.png');

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"kod"
}

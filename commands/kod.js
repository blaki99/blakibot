const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {
    
    message.delete().catch(O_o=>{});
    let serverembed = new Discord.RichEmbed()
    .setDescription(`**KOD W SKLEPIE!**`)
    .setColor("#15f153")
    .setImage('https://i.imgur.com/jj2M5mv.png')
    .setTimestamp(message.createdAt)
    .setFooter('Wspieraj Najlepszego Twórcę!', 'https://i.imgur.com/7xm6SSI.png');

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"kod"
}

const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Informacje o Serwerze")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nazwa Serwera", message.guild.name)
    .addField("Założony", message.guild.createdAt)
    .addField("Dołączyłeś", message.member.joinedAt)

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"info"
}

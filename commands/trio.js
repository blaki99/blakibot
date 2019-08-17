const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {
    
    message.delete().catch(O_o=>{});
    let TrioEmbed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .addField("__**TRIO:**__", "• BlaKi" + `\n` + "• Matek" + `\n` + "• Kogutzz")
    .setTimestamp(message.createdAt)
    .setImage('https://i.imgur.com/DBQt3ci.jpg')
    .setFooter("Kiedyś będziemy TOP #1", "https://i.imgur.com/3Q7TQyy.png");

    message.channel.send(TrioEmbed);
}

module.exports.help = {
  name:"trio"
}

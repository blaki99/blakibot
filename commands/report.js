const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("❌ Nie podano użytkownika, wpisz !report @user powód aby zgłosić użytkownika ❌");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setAuthor("USE CODE BLAKI", "https://i.imgur.com/7xm6SSI.png")
    .setColor("#ff0000")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Reason", rreason)
    .setTimestamp(message.createdAt)
    .setFooter('Nowe Zgłoszenie', 'https://i.imgur.com/7xm6SSI.png');

    let reportschannel = message.guild.channels.find(`name`, "zgłoszenia");
    if(!reportschannel) return message.channel.send("Nie znaleziono kanału do zgłoszeń.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}
 
module.exports.help = {
  name: "report"
}

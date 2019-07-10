const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ **Nie można wykonać akcji** ❌");
    if(args[0] == "help"){
      message.reply("Użycie: !kick <user> <reason>");
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("❌ **Nie znaleziono użytkownika** ❌");
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ **Nie można wyrzucić tego użytkownika** ❌");

    let kickEmbed = new Discord.RichEmbed()
    .setColor("#ff3300")
    .addField("Wyrzucony Użytkownik", `${kUser} with ID ${kUser.id}`)
    .addField("Wyrzucony przez", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Wyrzucony na", message.channel)
    .addField("Powód", kReason)
    .setTimestamp(message.createdAt)
    .setFooter('Wyrzucono Użytkownika', 'https://i.imgur.com/7xm6SSI.png');

    let kickChannel = message.guild.channels.find(`name`, "📕  »  ᴅᴢɪᴇɴɴɪᴋ  ᴢᴅᴀʀᴢᴇɴ");
    if(!kickChannel) return message.channel.send("❌ **Proszę utworzyć kanał zdarzeń** ❌");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}

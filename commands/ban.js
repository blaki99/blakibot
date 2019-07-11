const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("❌ **Nie można wykonać akcji** ❌");
    if(args[0] == "help"){
      message.reply("Użycie: !ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("❌ **Nie znaleziono użytkownika** ❌");
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ **Nie można zbanować tego użytkownika** ❌");
    
    message.delete().catch(O_o=>{});
    
    try{
        let DMbanEmbed = new Discord.RichEmbed()
        .setColor("#ff3300")
        .setTitle("__**ZOSTAŁEŚ ZBANOWANY**__")
        .addField("SERWER", `**BlaKi's Discord**`)
        .addField("Zbanowany Przez", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Powód", bReason)
        .setTimestamp(message.createdAt)
        .setFooter('Zostałeś zbanowany!', 'https://i.imgur.com/7xm6SSI.png');
        await bUser.send(DMbanEmbed)
    }catch(e){
        message.channel.send(`Użytkownik został zbanowany na **BlaKi's Discord** ale niestemy ma zablokowane wiadomości prywatne.`)
    }

    let banEmbed = new Discord.RichEmbed()
    .setColor("#ff3300")
    .addField("Zbanowany Użytkownik", `${bUser} with ID ${bUser.id}`)
    .addField("Zbanowany Przez", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Zbanowany Na", message.channel)
    .addField("Powód", bReason)
    .setTimestamp(message.createdAt)
    .setFooter('Zbanowano Użytkownika', 'https://i.imgur.com/7xm6SSI.png');

    let incidentchannel = message.guild.channels.find(`name`, "📕  »  ᴅᴢɪᴇɴɴɪᴋ  ᴢᴅᴀʀᴢᴇɴ");
    if(!incidentchannel) return message.channel.send("❌ **Proszę utworzyć kanał zdarzeń** ❌");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}

const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("❌ **Nie można wykonać akcji** ❌");
    if(args[0] == "help"){
      message.reply("Użycie: !unban <user> <reason>");
      return;
    }
    let bUser = await blaki.fetchUser(args[0]);
    if(!bUser) return message.channel.send("❌ **Nie znaleziono użytkownika** ❌");
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ **Nie można zbanować tego użytkownika** ❌");
    
    message.delete().catch(O_o=>{});
    
    try{
        let DMunbanEmbed = new Discord.RichEmbed()
        .setColor("#ffa500")
        .setTitle("__**ZOSTAŁEŚ ODBANOWANY**__")
        .addField("Serwer", `**${message.guild.name}**`)
        .addField("Odbanowany Przez", `<@${message.author.id}>`)
        .addField("Powód", bReason)
        .setTimestamp(message.createdAt)
        .setFooter('Zostałeś odbanowany!', 'https://i.imgur.com/3Q7TQyy.png');
        await bUser.send(DMunbanEmbed)
    }catch(e){
        message.channel.send(`Użytkownik został zbanowany na **BlaKi's Discord** ale niestemy ma zablokowane wiadomości prywatne.`)
    }

    let unbanEmbed = new Discord.RichEmbed()
    .setColor("#ffa500")
    .addField("Odbanowany Użytkownik", `${bUser}`)
    .addField("Odbanowany Przez", `<@${message.author.id}>`)
    .addField("Odbanowany Na", message.channel)
    .addField("Powód", bReason)
    .setTimestamp(message.createdAt)
    .setFooter('Odbanowano Użytkownika', 'https://i.imgur.com/3Q7TQyy.png');

    let incidentchannel = message.guild.channels.find(`name`, "📕  »  ᴅᴢɪᴇɴɴɪᴋ  ᴢᴅᴀʀᴢᴇɴ");
    if(!incidentchannel) return message.channel.send("❌ **Proszę utworzyć kanał zdarzeń** ❌");

    message.guild.unban(bUser, bReason);
    incidentchannel.send(unbanEmbed);
}

module.exports.help = {
  name:"unban"
}

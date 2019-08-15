const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (blaki, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("❌ **Nie można wykonać akcji** ❌");
  if(args[0] == "help"){
    message.reply("Użycie: !mute <user> <1s/m/h/d>");
    return;
  }
  let mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mute) return message.reply("❌ **Nie znaleziono użytkownika** ❌");
  if(mute.hasPermission("MANAGE_MESSAGES")) return message.reply("❌ **Nie można wyciszyć** ❌");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("❌ **Proszę wprowadzić powód** ❌");
  let gRole = message.guild.roles.find(role => role.name === "🔶️ » VERIFIED");

  let muterole = message.guild.roles.find(`name`, "🔇 » MUTED");
  //start of create role
  message.delete().catch(O_o=>{});
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "🔇 » MUTED",
        color: "#000001",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("❌ **Nie podano czasu wyciszenia** ❌");

   try{
        let DMMuteEmbed = new Discord.RichEmbed()
        .setColor("#ffa500")
        .setTitle("__**ZOSTAŁEŚ WYCISZONY**__")
        .addField("Serwer", `**BlaKi's Discord**`)
        .addField("Zmutowany Przez", `<@${message.author.id}>`)
        .addField("Powód", reason)
        .addField("Czas Wyciszenia", mutetime)
        .setTimestamp(message.createdAt)
        .setFooter('Zostałeś wyciszony!', 'https://i.imgur.com/3Q7TQyy.png');
        await mute.send(DMMuteEmbed)
    }catch(e){
        message.channel.send(`Użytkownik został wyciszony na **${mutetime}** ale niestemy ma zablokowane wiadomości prywatne.`)
    }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Wyciszenie nadane przez ${message.author}`)
  .setColor("#ffa500")
  .addField("Wyciszony Użytkownik", mute)
  .addField("Wyciszono na", message.channel)
  .addField("Czas Wyciszenia", mutetime)
  .addField("Powód", reason)
  .setTimestamp(message.createdAt)
  .setFooter('Wyciszono Użytkownika', 'https://i.imgur.com/3Q7TQyy.png');

  let incidentschannel = message.guild.channels.find(`name`, "📕  »  ᴅᴢɪᴇɴɴɪᴋ  ᴢᴅᴀʀᴢᴇɴ");
  if(!incidentschannel) return message.reply("❌ **Proszę utworzyć kanał zdarzeń** ❌");
  incidentschannel.send(muteembed);
  message.channel.send(`Użytkownik ${mute} został wyciszony na ${mutetime}`)

  await(mute.addRole(muterole.id));
  await(mute.removeRole(gRole.id));

  setTimeout(function(){
    mute.removeRole(muterole.id);
    mute.addRole(gRole.id);
    message.channel.send(`<@${mute.id}> ponownie ma prawo głosu!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}

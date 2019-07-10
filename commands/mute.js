const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {


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

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
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

  message.delete().catch(O_o=>{});

  try{
    await mute.send(`Hej, zostałeś wyciszony na ${mutetime}`)
  }catch(e){
    message.channel.send(`Użytkownik został wyciszony na ${mutetime} ale niestemy ma zablokowane wiadomości prywatne.`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute executed by ${message.author}`)
  .setColor("#ff3300")
  .addField("Wyciszony Użytkownik", mute)
  .addField("Wyciszono na", message.channel)
  .addField("Czas", message.createdAt)
  .addField("Długość", mutetime)
  .addField("Powód", reason);

  let incidentschannel = message.guild.channels.find(`name`, "📕  »  ᴅᴢɪᴇɴɴɪᴋ  ᴢᴅᴀʀᴢᴇɴ");
  if(!incidentschannel) return message.reply("❌ **Proszę utworzyć kanał zdarzeń** ❌");
  incidentschannel.send(muteembed);

  await(mute.addRole(muterole.id));

  setTimeout(function(){
    mute.removeRole(muterole.id);
    message.channel.send(`<@${mute.id}> ponownie ma prawo głosu!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}

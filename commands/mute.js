const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (blaki, message, args) => {

  //!tempmute @user 1s/m/h/d

  let mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mute) return message.reply("❌ **Nie znaleziono użytkownika** ❌");
  if(mute.hasPermission("MANAGE_MESSAGES")) return message.reply("❌ **Nie można wyciszyć** ❌");
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
  if(!mutetime) return message.reply("❌ **Nie podanu czasu wyciszenia** ❌");

  await(mute.addRole(muterole.id));
  message.reply(`<@${mute.id}> został wyciszony na ${ms(ms(mutetime))}`);

  setTimeout(function(){
    mute.removeRole(muterole.id);
    message.channel.send(`<@${mute.id}> ponownie ma prawo głosu!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {
  const ramka = "``"
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
  if(!args[0]) return message.channel.send("no");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Usunięto ${ramka}${args[0]} wiadomości!${ramka}`).then(msg => msg.delete(2000));
});
}

module.exports.help = {
  name: "clear"
}

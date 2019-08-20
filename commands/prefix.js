const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (custom, message, args) => {

  if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Nie posiadasz uprawnień.");
  if(!args[0] || args[0 == "help"]) return message.reply("Użycie: -prefix <nowy prefix>");

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF0000")
  .setTitle("Prefix Zmieniony!")
  .setDescription(`Ustawiono na ${args[0]}`);

  message.channel.send(sEmbed);

}

module.exports.help = {
  name: "prefix"
}

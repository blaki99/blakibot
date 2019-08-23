const Discord = require("discord.js");
const config = require("../blakiconfig.json");

module.exports.run = async (blaki, message, args) => {

    let host = message.guild.roles.find("name", "🔌 » HOST");

    let msg = (args[0]);
    let msg2 = args.slice(1).join(' ')
    const ramka = "```fix"
    const ramka2 = "```"

    if(!message.member.roles.has(host.id)) return message.reply("Ooops, nie posiadasz uprawnień!");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **!msgo <wiadomość>**_ ❌")
    message.delete();
    let msgEmbed = new Discord.RichEmbed()
    .setColor("#ffa500")
    .addField("__**INFORMACJA:**__", `${ramka}
${msg} ${msg2}${ramka2}`)
    .addField("__**OD:**__", `${message.author}`)
    .setTimestamp(message.createdAt)
    .setFooter("Nowa Informacja", `${config.avatar}`);
    message.channel.send(msgEmbed);
}

module.exports.help = {
    name: "msgo"
}

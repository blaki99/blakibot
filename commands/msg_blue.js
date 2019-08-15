const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    let host = message.guild.roles.find("name", "🔌 » HOST");

    let msg = (args[0]);
    let msg2 = args.slice(1).join(' ')
    const ramka = "```md"
    const ramka2 = "```"
    const check = '610477042302976000'

    if(!message.member.roles.has(host.id)) return message.reply("Ooops, nie posiadasz uprawnień!");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **!msgb <wiadomość>**_ ❌")
    message.delete();
    let msgEmbed = new Discord.RichEmbed()
    .setColor("#4169e1")
    .addField("__**INFORMACJA:**__", `${ramka}
# ${msg} ${msg2}${ramka2}`)
    .addField("__**OD:**__", `${message.author}`)
    .setTimestamp(message.createdAt)
    .setFooter("Kliknij reakcje jeśli przeczytałeś", "https://i.imgur.com/K7dGb0B.png");
    message.channel.send(msgEmbed).then(function (message) {
        message.react(check)
    })
}

module.exports.help = {
    name: "msgb"
}
const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    let host = message.guild.roles.find("name", "🔌 » HOST");

    let msg = (args[0]);
    let msg2 = args.slice(1).join(' ')
    const ramka = "```"
    const ramka2 = "```"
    const check = '609497709593755668'

    if(!message.member.roles.has(host.id)) return message.reply("Ooops, nie posiadasz uprawnień!");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **!msg <wiadomość>**_ ❌")
    message.delete();
    let msgEmbed = new Discord.RichEmbed()
    .setColor("#ffa500")
    .addField("__**INFORMACJA:**__", `${ramka}
${msg} ${msg2}${ramka2}`)
    .addField("__**OD:**__", `${message.author}`)
    .setTimestamp(message.createdAt)
    .setFooter("Kliknij reakcje jeśli przeczytałeś", "https://i.imgur.com/3Q7TQyy.png");
    message.channel.send(msgEmbed).then(function (message) {
        message.react(check)
    })
}

module.exports.help = {
    name: "msg"
}

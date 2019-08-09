const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    let HOST = message.guild.roles.find("name", "🔌 » HOST");

    let pass = (args[0]);
    let mode = args.slice(1).join(' ')
    let everyone = message.guild.defaultRole;
    const zasady0 = "**» NIE** WALCZ DOPÓKI NIE ZAMKNIE SIĘ 2 STREFA!"
    const zasady1 = "**» NIE** WALCZ PRZED 3 STREFĄ JEŚLI WŁĄCZY SIĘ STORM SURGE!"
    const zasady2 = "**» NIE** UŻYWAJ ROBOTÓW PODCZAS GRY!"
    const zasady3 = "**» NIE** UŻYWAJ TRYBU ANONIMOWEGO PODCZAS GRY!"
    const zasady4 = "**» NIE** BIJEMY SIĘ NA PIERWSZYCH MIEJSCÓWKACH !"
    const check = '609497709593755668'

    if(!message.member.roles.has(HOST.id)) return message.reply("Ooops, nie posiadasz uprawnień!");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **!late hasło tryb**_ ❌").then(() =>
    {
        message.channel.send("❌ _**Utwórz hasło, które nie będzie za krótkie!**_ ❌");
    })
    message.delete();
    let customEmbed = new Discord.RichEmbed()
    .setColor("#ffa500")
    .setThumbnail('https://i.imgur.com/rmxBcdK.png')
    .setTitle(`**${mode} CUSTOM**`)
    .setURL('https://discord.gg/u9W8euF')
    .addField("**HASŁO:**", `**${pass}**`, true)
    .addField("**HOST:**", `${message.author}`, true)
    .addBlankField()
    .addField("**ZASADY:**", zasady0 + `\n` +zasady1 + `\n`+ zasady2 + `\n`+ zasady3 + `\n`+ zasady4)
    .setTimestamp(message.createdAt)
    .setFooter("Kliknij reakcje jeśli grasz", "https://i.imgur.com/3Q7TQyy.png");
    message.channel.send(everyone.toString());
    message.channel.send(customEmbed).then(function (message) {
        message.react(check)
    })
}

module.exports.help = {
    name: "late"
}

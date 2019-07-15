const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    let Szefuncio = message.guild.roles.find("name", "HOST 🔌");

    let pass = (args[0]);
    let mode = args.slice(1).join(' ')
    const ping = "@everyone"
    const zasady0 = "**» NIE** WALCZ DOPÓKI NIE ZAMKNIE SIĘ 2 STREFA!"
    const zasady1 = "**» NIE** UŻYWAJ TRYBU ANONIMOWEGO PODCZAS GRY!"
    const zasady2 = "**» NIE** LATAJ NA SUNNY STEPS KIEDY GRA BLAKI"
    const zasady3 = "**» NIE** BIEGAJ ZA OSOBĄ, KTÓRA HOSTUJE!"
    const zasady4 = "**» NIE** BIJEMY SIĘ NA PIERWSZYCH MIEJSCÓWKACH !"
    const check = '599045521553883139'

    if(!message.member.roles.has(Szefuncio.id)) return message.reply("Ooops, nie posiadasz uprawnień!");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **!late hasło tryb**_ ❌").then(() =>
    {
        message.channel.send("❌ _**Utwórz hasło, które nie będzie za krótkie!**_ ❌");
    })
    message.delete();
    let customEmbed = new Discord.RichEmbed()
    .setColor("#18a6e8")
    .setDescription(`**HOST:** ${message.author}`)
    .setThumbnail('https://i.imgur.com/rmxBcdK.png')
    .setTitle("__**POWIADOMIENIE O NOWEJ GRZE**__")
    .addField("**HASŁO:**", `**${pass}**`)
    .addField("**TRYB:**", `**${mode}**`)
    .addField("**ZASADY:**", zasady0 + `\n` +zasady1 + `\n`+ zasady2 + `\n`+ zasady3 + `\n`+ zasady4)
    .setTimestamp(message.createdAt)
    .setFooter("Kliknij reakcje jeśli grasz", "https://i.imgur.com/cgF1hsE.png");
    message.channel.send(ping);
    message.channel.send(customEmbed).then(function (message) {
        message.react(check)
    })
}

module.exports.help = {
    name: "late"
}

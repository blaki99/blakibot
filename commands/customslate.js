const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    let Szefuncio = message.guild.roles.find("name", "SZEFUNCIO 👑");

    let pass = (args[0]);
    let mode = args.join(" ").slice(7);
    const ping = "<@&535100081444225035>"
    const zasady0 = "***» NIE WALCZ DOPÓKI NIE ZAMKNIE SIĘ 2 STREFA!***"
    const zasady1 = "***» NIE UŻYWAJ TRYBU ANONIMOWEGO PODCZAS GRY!***"
    const zasady2 = "***» NIE LATAJ NA SUNNY STEPS KIEDY GRA BLAKI***"
    const zasady3 = "***» NIE BIEGAJ ZA OSOBĄ, KTÓRA HOSTUJE!***"
    const zasady4 = "***» NIE BIJEMY SIĘ NA PIERWSZYCH MIEJSCÓWKACH !***"
    const check = '577121399043522560'

    if(!message.member.roles.has(Szefuncio.id)) return message.reply("oops");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **!late hasło tryb**_ ❌").then(() =>
    {
        message.channel.send("❌ _**Hasło musi posiadać dokładnie 7 znaków!**_ ❌");
    })
    message.delete();
    let customEmbed = new Discord.RichEmbed()
    .setColor("#b7dd80")
    .setThumbnail('https://i.imgur.com/rmxBcdK.png')
    .setTitle("__**POWIADOMIENIE O NOWEJ GRZE**__")
    .addField("**Hasło:**", `**${pass}**`)
    .addField("**Tryb Gry:**", `**${mode}**`)
    .addField("**Zasady:**", zasady0 + `\n` +zasady1 + `\n`+ zasady2 + `\n`+ zasady3 + `\n`+ zasady4)
    .setTimestamp(message.createdAt)
    .setFooter("Kliknij reakcje jeśli grasz", "https://i.imgur.com/7xm6SSI.png");
    message.channel.send(ping)
    message.channel.send(customEmbed).then(function (message) {
        message.react(check)
    })
}

module.exports.help = {
    name: "late"
}

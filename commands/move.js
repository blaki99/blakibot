const Discord = require('discord.js');
const config = require("../blakiconfig.json");

module.exports.run = (blaki, message, args) => {

    message.delete().catch(O_o=>{});
    const ramka = "```"
    if (message.member.roles.some(r=>[config.modrole].includes(r.name))) {
        let destchannel = message.mentions.channels.first();
        if (destchannel == null) {
            message.channel.send('Kanał nie został znaleziony lub wprowadziłeś błędną nazwe kanału!')
            return;
        }


        message.channel.fetchMessage(args[0]).then(orig_message => {
            let messageEmbed = new Discord.RichEmbed()
            if (orig_message.attachments.array(0).length !== 0  ) {
               messageEmbed
                   .setColor("#FF0000")
                   .setTitle(`Wiadomość przeniesiona z: #${orig_message.channel.name}`)
                   .setThumbnail(orig_message.author.avatarURL)
                   .setAuthor("**Autor Wiadomości:**", orig_message.author.username)
                   .addField("**Oryginalna Wiadomość:**", `${ramka}${orig_message.attachments.first().proxyURL}${ramka}`)
                if (orig_message.attachments.first().filename.endsWith('.jpg') || orig_message.attachments.first().filename.endsWith('.png')) {
                    messageEmbed
                        .setImage(orig_message.attachments.first().proxyURL)
                }
            } else {
                messageEmbed
                    .setColor("#FF0000")
                    .setTitle(`Wiadomość przeniesiona z: #${orig_message.channel.name}`)
                    .setThumbnail(orig_message.author.url)
                    .setAuthor("**Autor Wiadomości:**", orig_message.author.username)
                    .addField("**Oryginalna Wiadomość:**", `${ramka}${orig_message.content}${ramka}`)
            }



            message.channel.send(`Wiadomość została przeniesiona na ${destchannel}`)
            destchannel.send(messageEmbed);
            orig_message.delete()
        }).catch(err => {
            if (err.message == "Nieznana Wiadomość."){
                message.channel.send("Nie można znaleźć wiadomości!")
            } else {
                console.log(err)
            }
        })
    } else {
        message.channel.send("Nie masz uprawnień do użycia tej komendy!")
    }

};

module.exports.help = {
  name: "move"
}

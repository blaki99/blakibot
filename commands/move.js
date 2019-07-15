const Discord = require('discord.js');
const config = require("../blakiconfig.json");

module.exports.run = (blaki, message, args) => {


    if (message.member.roles.some(r=>[config.modrole].includes(r.name))) {
        let destchannel = message.mentions.channels.first();
        if (destchannel == null) {
            message.channel.send('The channel could not be found or you have mentioned/entered an incorrect channel.')
            return;
        }


        message.channel.fetchMessage(args[0]).then(orig_message => {
            let messageEmbed = new Discord.RichEmbed()
            if (orig_message.attachments.array(0).length !== 0  ) {
               messageEmbed
                   .setTitle(`Moved message from: #${orig_message.channel.name}`)
                   .setThumbnail(orig_message.author.avatarURL)
                   .setAuthor(orig_message.author.username)
                   .addField("Original Message", orig_message.attachments.first().proxyURL)
                if (orig_message.attachments.first().filename.endsWith('.jpg') || orig_message.attachments.first().filename.endsWith('.png')) {
                    messageEmbed
                        .setImage(orig_message.attachments.first().proxyURL)
                }
            } else {
                messageEmbed
                    .setTitle(`Moved message from: #${orig_message.channel.name}`)
                    .setThumbnail(orig_message.author.url)
                    .setAuthor(orig_message.author.username)
                    .addField("Original Message", orig_message.content)
            }



            message.channel.send(`This message has been moved to ${destchannel}`)
            destchannel.send(messageEmbed);
            orig_message.delete()
        }).catch(err => {
            if (err.message == "Unknown Message"){
                message.channel.send("The message could not be found.")
            } else {
                console.log(err)
            }
        })
    } else {
        message.channel.send("You do not have permission to execute this command.")
    }

};

module.exports.help = {
  name: "move"
}

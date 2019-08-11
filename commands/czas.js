const Discord = require("discord.js");
var schedule = require('node-schedule');

module.exports.run = async (blaki, message, args) => {

    var rule = new schedule.RecurrenceRule();
    rule.hour= 13;
    const x_channel = blaki.channels.get("535153796129619969");
    var j = schedule.scheduleJob(rule, function(){
      let serverembed = new Discord.RichEmbed()
    .setDescription(`**WPISZ KOD W SKLEPIE!**`)
    .setColor("#ffa500")
    .setImage('https://i.imgur.com/jj2M5mv.png')
    .setTimestamp(message.createdAt)
    .setFooter('Wspieraj Najlepszego Twórcę!', 'https://i.imgur.com/3Q7TQyy.png');

    message.channel.send(serverembed);
    });
}

module.exports.help = {
    name:"czas"
}

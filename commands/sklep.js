const Discord = require("discord.js");
const Fortnite = require("fortnite-publicapi");
const shop = require("../shop.json");

module.exports.run = async (blaki, message, args) => {
  
  let Szefuncio = message.guild.roles.find("name", "OWNER 🎓");
  if(!message.member.roles.has(Szefuncio.id)) return message.reply("Ooops, nie posiadasz uprawnień!");
  
  Fortnite.FortniteStore('en', async (data) => {
    data = JSON.parse(data);
    let channel = blaki.channels.find('id', shop.channelid);
    if(channel) {
      if(channel.topic !== data['date']){
        channel.setTopic(data['date']);
        var list = [];
        data['items'].forEach(async element => {
          await list.push(element.item.images.information);
        });
        channel.send(shop.msg.replace(`{DATE}`, `${data['date']}`));
        list.forEach(async element => {
          let sklepembed = new Discord.RichEmbed()
          .setTitle(`**KOD W SKLEPIE BLAKI!**`)
          .setColor("#18a6e8")
          ..setDescription(element)
          .setTimestamp(message.createdAt)
          .setFooter('Wspieraj Najlepszego Twórcę!', 'https://i.imgur.com/cgF1hsE.png');
          await channel.send(sklepembed);
        });
      }
    }
  });
}

module.exports.help = {
  name: "sklep"
}

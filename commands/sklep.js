const Discord = require("discord.js");
const Fortnite = require("fortnite-publicapi");
const shop = require("../shop.json");

module.exports.run = async (blaki, message, args) => {
  message.delete().catch(O_o=>{});
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
            message.channel.bulkDelete("50");
            list.forEach(async element => {
               let bEmbed = new Discord.RichEmbed()
               .setColor("#ff005c")
               .setTitle(`**SKLEP ${data['date']}**`)
               .setDescription("**KOD W SKLEPIE BLAKI**")
               .setImage(`${element}`)
               .setTimestamp(message.createdAt)
               .setFooter('Wspieraj Najlepszego Twórcę!', 'https://i.imgur.com/mNBIfzO.png');
               await channel.send(bEmbed);
            });
          }
        }
      });
}
module.exports.help = {
  name: "sklep"
}

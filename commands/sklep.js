const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {
  Fortnite.FortniteStore('en', async (data) => {
    data = JSON.parse(data);
    let channel = bot.channels.find('id', shop.channelid);
    if(channel) {
      if(channel.topic !== data['date']){
        channel.setTopic(data['date']);
        var list = [];
        data['items'].forEach(async element => {
          await list.push(element.item.images.information);
        });
        channel.send(shop.msg.replace(`{DATE}`, `${data['date']}`));
        list.forEach(async element => {
          await channel.sendFile(element);
        });
      }
    }
  });
}

module.exports.help = {
  name: "sklep"
}

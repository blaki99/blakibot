const blakiconfig = require("./blakiconfig.json");
const Fortnite = require("fortnite-publicapi");
const Discord = require('discord.js');
const blaki = new Discord.Client({disableEveryone: false});
const shop = require("./shop.json");
require('dotenv-flow').config();

const fs = require("fs");
blaki.commands = new Discord.Collection();

const config = {
    token: process.env.TOKEN
};

let date = require('date-and-time');

blaki.on('ready', async () => 
{
  console.log(`${blaki.user.username} jest online!`);
  blaki.user.setActivity('KOD BLAKI W SKLEPIE', { type: 'WATCHING'});
  
    setInterval(async () => {
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
            channel.bulkDelete("50");
            list.forEach(async element => {
               let bEmbed = new Discord.RichEmbed()
               .setColor("#ff005c")
               .setTitle(`**SKLEP ${data['date']}**`)
               .setDescription("**KOD W SKLEPIE BLAKI**")
               .setImage(`${element}`)
               .setFooter('Wspieraj Najlepszego Twórcę!', 'https://i.imgur.com/mNBIfzO.png');
               await channel.send(bEmbed);
            });
          }
        }
      });
    }, shop.refresh*1000);
    
  const guild = blaki.guilds.get('535089879420502017');
  setInterval(function() 
  {
    let now = new Date();
    const DateChannel = blaki.channels.get("569618740631699486");
    const HumansChannel = blaki.channels.get("535591376373678084");
    const OnlineChannel = blaki.channels.get("535591322430734349");
    const TwitchChannel = blaki.channels.get("600336192243761166");
    var HumansCount = guild.memberCount;
    var TwitchCount = guild.members.filter(member => member.roles.find("name", "💜 » TWITCH SUBS")).size
    var OnlineCount = guild.members.filter(member => member.presence.status == 'online' || member.presence.status == 'idle' || member.presence.status == 'dnd').size
    DateChannel.setName("📅 " + date.format(now, 'DD.MM.YYYY'));
    OnlineChannel.setName("💚 Aktywni: " + OnlineCount);
    HumansChannel.setName("👑 Jest Nas: " + HumansCount);
    TwitchChannel.setName("💜 Twitch Subs: " + TwitchCount);
  }, 20000)
});

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`Poprawnie załadowano ${f}!`);
    blaki.commands.set(props.help.name, props);
  });

});

blaki.on("message", async message => {
    
    if(message.author.blaki) return;
    if(message.channel.type === "dm") return;
  
    let prefix = blakiconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    let commandfile = blaki.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(blaki,message,args);

    if(message.content === "siema" || message.content === "Siema"){
        message.channel.send("Hejkaa " + message.author);
    }
  
});

blaki.on('guildMemberAdd', async member =>
{
  let WelcomeChannel = blaki.channels.get("535152553248423946");
  WelcomeChannel.send(`Hejka ${member} i baw się dobrze 🎉!`);
});

blaki.login(config.token);

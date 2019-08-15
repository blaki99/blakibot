const blakiconfig = require("./blakiconfig.json");
const Fortnite = require("fortnite-publicapi");
const Discord = require('discord.js');
const blaki = new Discord.Client({disableEveryone: false});
const shop = require("./shop.json");
const config = require("../config.json");
const request = require("sync-request");
require('dotenv-flow').config();

const fs = require("fs");
blaki.commands = new Discord.Collection();

const config = {
    token: process.env.TOKEN
};

let date = require('date-and-time');


console.log(process.argv[2]);
if (process.argv[2] != undefined) {
  config.userID = process.argv[2];
}

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
  
  
  let channel = client.channels.get(config.channelID);

  var twitchJSON = getJSON("https://api.twitch.tv/kraken/streams/" + config.userID + "?client_id=" + config.clientID);
  var channelJSON = getJSON("https://api.twitch.tv/kraken/channels/" + config.userID + "?client_id=" + config.clientID);
  var isLive = false;
  var messageSent = false;
  var message = null;

  let maxViewers = 0;

  function getJSON(url) {
    return JSON.parse(request('GET', url, {retry: true}).getBody());
  }

  function updateJSON() {
    twitchJSON = getJSON("https://api.twitch.tv/kraken/streams/" + config.userID + "?client_id=" + config.clientID);
  }

  function checkIfLive() {
    updateJSON();
    if (twitchJSON.stream != null) {
      isLive = true;
    }
    else {
      isLive = false;
    }
  }

  function updateMaxViewers() {
    if (twitchJSON.stream.viewers > maxViewers) {
      maxViewers = twitchJSON.stream.viewers;
    }
  }

  function vodRichEmbed() {
    let vodJSON = getJSON(`https://api.twitch.tv/kraken/channels/${config.userID}/videos?client_id=${config.clientID}&broadcast_type=archive`);
    let video = vodJSON.videos[0];

    let gameUrl = null;
    if (video.game === "") {
      gameUrl = "https://www.twitch.tv/directory/";
    }
    else if (video.game !== "") {
      gameUrl = "https://www.twitch.tv/directory/game/" + encodeURIComponent(video.game);
    }

    var embed = new Discord.RichEmbed()
      .setAuthor(channelJSON.display_name, channelJSON.logo)
      .setColor(0xF53737)
      .setImage(video.preview.substr(0, video.preview.lastIndexOf("-") + 1) + "1152x648.jpg")
      .setThumbnail(channelJSON.logo)
      .addField("Stream VOD", `[${video.title}](${video.url})`)
      .addField("Game", `[${video.game}](${gameUrl})`)
      .setTimestamp()
      .setFooter(maxViewers + " Peak Viewers");
    return embed;
  }

  function createRichEmbed() {
    let gameUrl = null;
    if (twitchJSON.stream.channel.game === "") {
      twitchJSON.stream.channel.game = "No game set";
      gameUrl = "https://www.twitch.tv/directory/";
    }
    else if (twitchJSON.stream.channel.game !== "") {
      gameUrl = "https://www.twitch.tv/directory/game/" + encodeURIComponent(twitchJSON.stream.channel.game);
    }
    else if (twitchJSON.stream.channel.status === "") {
      twitchJSON.stream.channel.status = "No status set";
    }
    var embed = new Discord.RichEmbed()
      .setAuthor(twitchJSON.stream.channel.display_name, twitchJSON.stream.channel.logo)
      .setColor(0x6441A4)
      .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${twitchJSON.stream.channel.name}-1152x648.jpg`)
      .setThumbnail(twitchJSON.stream.channel.logo)
      .addField("Stream", `[${twitchJSON.stream.channel.status}](${twitchJSON.stream.channel.url})`)
      .addField("Game", `[${twitchJSON.stream.channel.game}](${gameUrl})`)
      .setTimestamp()
      .setFooter(twitchJSON.stream.viewers + " Viewers");
      //.addField("Link", twitchJSON.stream.channel.url);
    return embed;
  }

  function updateRichEmbed(vod) {
    if (message == null) {
      message = client.user.lastMessage;
    }
    if (vod === true) {
      var embed = vodRichEmbed();
    }
    else {
      var embed = createRichEmbed();
    }
    message.edit("@everyone", embed)
  }

  function sendLiveMessage() {
    if (twitchJSON.stream != null) {
      var embed = createRichEmbed();
      channel.send("@everyone", embed);
    }
    else {
      console.log("Could not send message");
    }
  }

  function app() {
    checkIfLive();
    console.log("Is live: " + isLive);
    if (isLive == true && messageSent == false) {
      sendLiveMessage();
      console.log("Discord message sent");
      messageSent = true;
      maxViewers = 0;
    }
    else if (isLive == true && messageSent == true) {
      updateMaxViewers();
      updateRichEmbed();
      console.log("Updated message");
    }
    else if (isLive == false) {
      if (messageSent == true) {
        updateRichEmbed(true);
      }
      messageSent = false;
      message = null;
    }
  }
  setInterval(app, 30000);
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

    let content = message.content.toLowerCase().split(" ")[0];

    if(content === "siema" || content === "hejka" ||content === "elo" || content === "hi" || content === "yo" || content === "witam"){
        message.channel.send("Hejkaa " + message.author);
    }
    if(content === "dobranoc"){
        message.channel.send("Dobranooc i Kolorowych Snów ! 💖")
    }
});

blaki.on('guildMemberAdd', async member =>
{
  let WelcomeChannel = blaki.channels.get("535152553248423946");
  WelcomeChannel.send(`Hejka ${member} i baw się dobrze 🎉!`);
});

blaki.login(config.token);

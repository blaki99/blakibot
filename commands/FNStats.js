const Discord = require("discord.js");
const keys = require("../FNApi.json");
const Client = require("fortnite");
const fortnite = new Client(keys.apikey);

module.exports.run = async (blaki, message, args) => {
    await message.delete();
    let username = args[0];
    let platform = args[1] || "pc";

    if(!username) return message.channel.send("Wprowadź poprawny nick!");

    let data = fortnite.user(username, platform).then(data => {
    let stats = data.stats;
    let lifetime = stats.lifetime;
        let score = lifetime[6]['Score'];
        let mPlayed = lifetime[7]['Matches Played'];
        let wins = lifetime[8]['Wins'];
        let wPercent = lifetime[9]['Win%'];
        let kills = lifetime[10]['Kills'];
        let kd = lifetime[11]['K/d'];
      let backtick = "`";
      let lifeStatsEmbed = new Discord.RichEmbed()
      .setColor("#cd00cd")
      .setTitle(`**STATYSTYKI ${message.author.username}!**`)
      .setURL("https://fortnitetracker.com")
      .setDescription(`:pager: **Lifetime Fortnite Stats of User** ${backtick}${data.username}${backtick}!`)
      .addField("Score", score)
      .addField("Matches Played", mPlayed)
      .addField("Wins", wins)
      .addField("Win Percentage", wPercent)
      .addField("Kills", kills)
      .addField("Kill/Death Ratio", kd)
      .setFooter("Statystyki Fortnite", `${config.avatar}`);

      message.channel.send(lifeStatsEmbed);

});

}
module.exports.help = {
  name:"fn"
}

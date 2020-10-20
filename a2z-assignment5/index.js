require('dotenv').config();
const serverID = process.env.SERVERID;
const channelID = process.env.CHANNELID;
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;


console.log('Starting the bot!');
const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(TOKEN);

client.once('ready', () => {
  console.log('Ready' + PREFIX);
});

client.on('message', gotMessage);

function gotMessage(msg) {
  //console.log(msg.content, msg.guild.id, msg.channel.id);
  if (msg.guild.id === serverID && msg.channel.id === channelID) {
    if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

    const args = msg.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'giphy') {
      if (!args.length) {
        return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
      } else {
        for (let i = 0; i < args.length; i++){
          let giphyWord = args[i];
          console.log(giphyWord);
          let giphyFinalImage;
          getGiphy(giphyWord).then(results => {
            giphyFinalImage = results;
            console.log(giphyFinalImage);
            msg.channel.send({
              embed: {
                color: 16777215, description: giphyWord,
                image: {
                  url: giphyFinalImage
                }
              }
            });
          }).catch(err => console.error(err));
        }
      }
    }
  }
}

async function getGiphy(wordinput) {
  try {

    let giphyApi = "f83e46e2508b41bd954c4b821e8261ea";
    let giphySearch = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyApi + "&limit=1&offset=0&rating=G&lang=en&q=";

    let response = await fetch(giphySearch + wordinput);
    let giphyData = await response.json();

    let giphyImage = giphyData.data[0].images.original.url;
    return giphyImage;
  } catch (error) {
    console.log(error);
  }
}

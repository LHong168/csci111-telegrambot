const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api');

const apiKey = "dcabda32";
const token = "1419557920:AAHv-t00-u4Ydndea4fby-kL3c8SmPXAbGM";

const bot = new TelegramBot(token, {polling: true});

function getMovie(msg){
    const title = msg.text.toString();
    
    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`).then(function(d){
        
        const {Title, Released, imdbRating,Poster, Country} = d.data;
        const content = `Title: <b>${Title}</b>\nRate: ${imdbRating}\nReleased Date: ${Released}\nCountry: ${Country}\nPicture: <a href=\"${Poster}\">Poster</a>\nSource: <i>imdb.com</i>`
        bot.sendMessage(msg.chat.id,content,{parse_mode : "HTML"})

    }).catch(function(error){
        console.log(error)
    })
}

bot.on('message', (msg) => {

    message = msg.text.toString().toLowerCase();
    if(message.indexOf("/") === 0){
        if(message.indexOf("start") === 1){
            bot.sendMessage(msg.chat.id, "Type in movie name what you want to query from IMDB database");
        }else if(message.indexOf("help") === 1){
            bot.sendMessage(msg.chat.id, "use /start to start and type movie name to query")
        }
    }else{
        getMovie(msg);
    }

});

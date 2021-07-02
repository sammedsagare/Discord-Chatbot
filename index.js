const { Client } = require("discord.js");
const client = new Client({ intents: 513 });
const smartestchatbot = require("smartestchatbot");
const x = new smartestchatbot.Client();
client.on("ready", () => {
    console.log("Ready for chatting!");
});
client.on("message", async message => {
    // when client detects a message
    if (message.author.bot) return; // if the author of the message is a bot ignore the case
    if (message.channel.id !== 'YOUR-CHANNEL-ID') return;
    message.content = message.content
        .replace(/@(everyone)/gi, "everyone")
        .replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
        return message.reply(`**Please dont mention anyone while talking to me :( it makes me sad**`);
    }
    message.channel.startTyping();
    if (!message.content)
        return message.channel.send("**I can only reply to text messages**");
    x.chat({
        message: message.content,
        name: client.user.username,
        owner: "OwnerNameHere",
        user: message.author.id,
        language: "en"
    }).then(reply => {
        message.channel.send(`${reply}`)
        
    });
    message.channel.stopTyping();
});
client.login("YOUR-TOKEN-HERE");
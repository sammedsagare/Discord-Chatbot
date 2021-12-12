const { Client } = require("discord.js");
const client = new Client({ intents: 513 });
const smartestchatbot = require("smartestchatbot");
const x = new smartestchatbot.Client();
require('dotenv').config();
const chalk = require('chalk');

client.on("ready", () => {
	console.log(chalk.greenBright(`${client.user.tag} is ready for chatting!`));
});

client.on("messageCreate", async message => {
	// When client detects a message:
	// if the author of the message is a bot ignore the case:
	if (message.author.bot) return;
	// If the channelId does not match the one on .env ignore the case.
	if (message.channel.id !== process.env.channelId) return;
	message.content = message.content
		.replace(/@(everyone)/gi, "everyone")
		.replace(/@(here)/gi, "here");
	if (message.content.includes(`@`)) {
		return message.reply(`**Please dont mention anyone while talking to me :( it makes me sad**`);
	}
	message.channel.startTyping();
	if (!message.content) {return message.channel.send("**I can only reply to text messages**");}
	// function
	x.chat({
		message: message.content,
		name: client.user.username,
		owner: "OwnerNameHere",
		user: message.author.id,
		language: "en",
	}).then(reply => {
		message.channel.send(`${reply}`);

	});
	message.channel.stopTyping();
});

// Log in on bot.
client.login(process.env.token);
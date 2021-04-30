const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose')
const settings = require('./config.json');
const fs = require('fs');
const env = require('./src/Managment/Inventory.json')
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.on("ready", async () => {
client.user.setPresence({ activity: { name: "STRIGA CODE #4K" }, status: "idle" });
let botVoiceChannel = client.channels.cache.get(settings.BotSoundChannelID);
if(botVoiceChannel) botVoiceChannel.join().catch(err => console.error("[B-V] STRIGA | AUDIO CONNECTION FAILED."))});

fs.readdir('./src/Commands/Register/', (err, files) => { 
const JSfiles = files.filter(f => f.split('.').pop() === 'js')
if(JSfiles.length <= 0) {console.log(`[+] STRIGA | No file found here ! (FAULT)\n[+] STRIGA | Please upload & create files. (FAULT)`)} 
JSfiles.forEach(STGFILES => {console.log(`[C] STRIGA | "${STGFILES}" Loading Command.`);
const STRGCommand = require(`./src/Commands/Register/${STGFILES}`)
client.commands.set(STRGCommand.config.name, STRGCommand)
STRGCommand.config.aliases.forEach(STRGAliases => {client.aliases.set(STRGAliases, STRGCommand.config.name)})})});

fs.readdir("./src/Events", (err, files) => {
if(err) return console.error(err);
files.filter(STGEvents => STGEvents.endsWith(".js")).forEach(STGEvents => {
let STGEventLoad = require(`./src/Events/${STGEvents}`);
if(!STGEventLoad.configuration) return console.log(`[E] STRIGA | "${STGEvents}" Loading Event.`)
client.on(STGEventLoad.configuration.name, STGEventLoad)})});

client.on("message", async message => {
const messageArray = message.content.split(" ");
const cmd = messageArray[0].toLowerCase();
const args = messageArray.slice(1);
if(!message.content.startsWith(settings.BotPrefix)) return;
const commandfile = client.commands.get(cmd.slice(settings.BotPrefix.length)) || client.commands.get(client.aliases.get(cmd.slice(settings.BotPrefix.length)));
if(commandfile) commandfile.run(client, message, args);});

mongoose.connect(`MONGO URLSİ (BU VİDEODA MONGO URLSİ NASIL ALINIR GÖSTERDİM https://www.youtube.com/watch?v=9oFcDPKldLI&t=&ab_channel=Striga)`, {useNewUrlParser: true, useUnifiedTopology: true})
client.login(settings.BotToken).then(function(){console.log('[+] STRIGA | BOT ACTIVATED.')}, function(err){console.log('[+] STRIGA | BOT TOKEN INVALID')})

const welcome = require('./src/Events/Welcome')
const otoReg = require('./src/Events/otoRegister')
client.on("ready", async () => {
welcome(client)
otoReg(client)
})


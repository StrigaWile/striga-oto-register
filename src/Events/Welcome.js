const { MessageEmbed, Message } = require('discord.js')
const moment = require('moment')
const env = require('../Managment/Inventory.json')
module.exports = client => {
client.on('guildMemberAdd', member => {member.roles.add(env.Roles.unregister_role)})

client.on('guildMemberAdd', member => {
const welcome_channel = env.Channels.welcome_channel
let user = client.users.cache.get(member.id);
const kurulus = new Date().getTime() - user.createdAt.getTime();  
require("moment-duration-format")
const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
var kontrol;
if (kurulus < 1296000000) kontrol = '❌'
if (kurulus > 1296000000) kontrol = '✅'
client.channels.cache.get(welcome_channel).send("Sunucumuza hoşgeldin <@"+member.id+"> !\n\nHesabın \`"+ gecen +"\` tarihinde oluşturulmuş "+ kontrol +"\n\nSes odalarında ki yetkililere ses teyit vererek sunucumuza kayıt olabilirsin.\n\nSunucumuzun <#"+env.Channels.server_rules+"> göz atmanı tavsiye ederiz ceza işlemlerimizi sunucu kurallarımıza göre önceden belirledik.\n\nSeninle birlikte **" + member.guild.memberCount + "** kişiyiz ! Sunucumuzda tagımızı alarak bizlere destek olabilirsin, kayıt işlemin için <@&"+env.Staff.register_staff+"> kayıt yetkilisini çağırıyorum.")})

client.on("guildMemberAdd", member => {
var moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
var {Permissions} = require('discord.js');
var x = moment(member.user.createdAt).add(7, 'days').fromNow()
var user = member.user
x = x.replace("birkaç saniye önce", " ")
if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
let rol = env.Roles.suspect_role
let kayıtsız = env.Roles.unregister_role
member.roles.add(rol)
member.roles.remove(kayıtsız)
member.user.send(`${member.guild.name} sunucusunda şüpheliye düştün, bunun nedeni hesabını neredeyse 7 günden kısa bir zamanda oluşturman hesabınızın kuruluşu 8 - 9 gün olduktan sonra tekrardan kayıt işlemi için sunucuya katılabilirsiniz.`)}})

}
module.exports.config = {name: "guildMemberAdd"};
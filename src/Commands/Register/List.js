const { MessageEmbed, Message } = require('discord.js')
const config = require('../../../config.json')
const mongoose = require('mongoose')
const moment = require('moment')
const ms = require('ms')
const UserDB = require('../../ClientModels/UserData')
const env = require('../../Managment/Inventory.json')
exports.run = async(client, message, args) => {
let yanlisEmbed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(env.Colors.red)
if(![env.Staff.register_staff, env.Staff.all_commands].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(yanlisEmbed.setDescription(`Bu komutu sadece (<@&${env.Staff.register_staff}>, <@&${env.Staff.all_commands}>) yetkisine sahip olanlar kullanabilir.`).setFooter(`Developed By Striga.`)).then(m => m.delete({timeout:6500}))

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(yanlisEmbed.setDescription(`Bir kullanıcı etiketle.`).setFooter(`Developed By Striga.`))
UserDB.find({userID: member.id}, async(err, data) => {
if(err) return console.log(err.message)
if(data.length < 2) {message.channel.send(yanlisEmbed.setDescription(`Kullanıcının sadece tek bir \`İsim Yaş\` kayıtı bulundu bundan dolayı liste olarak gösterilmemekte.`).setFooter(`Developed By Striga.`)).then(m => m.delete({timeout:6500}))}
if(data.length > 1) {    
let xmessagex = 'Kullanıcının Geçmişi'
let UserData = data.reverse().reverse()  
let sayı = 1  
let NameData = UserData.map(x => `\`${sayı++}\`. **${x.userName}** | <@${x.userMod}>(${x.userMod}) | ${x.userRegisterDate} `).join('\n')
message.channel.send(new MessageEmbed()
.setAuthor(xmessagex, member.user.avatarURL({dynamic:true}))
.setDescription(`${member} adlı kullanıcının geçmişteki isimleri bulundu.\n **İsim | Yaş** | Yetkili(yetkiliID) | \`Tarih\` olarak sıralanmıştır \n\n İsimleri;\n${NameData} `)
.setColor(env.Colors.mavis)
.setFooter(`Developed By Striga.`)
)}})

}

exports.config = {name: 'list', aliases: ['liste', 'kontrol', 'check', 'geçmiş']}
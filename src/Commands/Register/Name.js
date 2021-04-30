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
if(!member) return message.channel.send(yanlisEmbed.setDescription(`Bir kullanıcı belirtmelisiniz.`).setFooter(`Developed By Striga.`)).then(m => m.delete({timeout:6500}))
if(!args[1]) return message.channel.send(yanlisEmbed.setDescription(`Bir isim belirtmelisin.`).setFooter(`Developed By Striga.`)).then(m => m.delete({timeout:6500}))
if(!args[2]) return message.channel.send(yanlisEmbed.setDescription(`Bir yaş belirtmelisin.`).setFooter(`Developed By Striga.`)).then(m => m.delete({timeout:6500}))
let Name = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase();
let Age = Number(args[2])
if(member.id === message.author.id) return message.channel.send(yanlisEmbed.setDescription(`Kendini kayıt edemezsin.`).setFooter(`Developed By Striga.`)).then(m => m.delete({timeout:6500}))
if(member.id === member.manageable) return message.channel.send(yanlisEmbed.setDescription(`Belirtilen kullanıcı üzerinde komut geçersiz.`).setFooter(`Developed By Striga.`)).then(m => m.delete({timeout:6500}))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(yanlisEmbed.setDescription(`Kendini kayıt edemezsin.`).setFooter(`Developed By Striga.`)).then(m => m.delete({timeout:6500}))
const ServerName = `${member.user.username.includes(env.Server.ServerTag) ? env.Server.ServerTag : env.Server.UnServerTag} ${Name} | ${Age}`;  

let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
var tarih = new Date(Date.now())
var tarih2 = ms(timereplace)
var tarih3 = Date.now() + tarih2 +10800000
let ay = moment(Date.now()+10800000).format("MM")  
let gün = moment(Date.now()+10800000).format("DD")
let saat = moment(Date.now()+10800000).format("HH:mm:ss")
let yıl = moment(Date.now()+10800000).format("YYYY")
let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
moment.locale("tr");

const nickNamePush = new UserDB({userID: member.id, userMod: message.author.id, userName: `${Name} | ${Age}`, userNick: ServerName, userRegisterDate: kayıtsaat})
nickNamePush.save().catch(err => console.log(`İsim kayıt edilirken bir sorun ile karşılaştım.\nLütfen Düzeltin.`))

member.setNickname(`${ServerName}`)
message.channel.send(new MessageEmbed().setDescription(`${member} adlı üyenin ismi "${ServerName}" olarak güncellendi.`).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setColor(env.Colors.mavis)).then(m => m.delete({timeout:16500}))

}

exports.config = {name: 'isim', aliases: ['i', 'name', 'nick']}
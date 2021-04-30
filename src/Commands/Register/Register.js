const { MessageEmbed, Message } = require('discord.js')
const config = require('../../../config.json')
const mongoose = require('mongoose')
const moment = require('moment')
const ms = require('ms')
const StaffDB = require('../../ClientModels/StaffData')
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

var kayitMesaj = message.channel.send(new MessageEmbed()
.setAuthor(member.user.tag, member.user.avatarURL({dynamic:true}))
.setDescription(`${member} kullanıcısının ismi "${ServerName}" olarak belirtildi, kayıt işleminin tamamlana bilmesi için lütfen cinsiyet belirtin \n
\`erkek/kadın\` 
yazarak kayıt işlemini tamamlayabilirsiniz, 30 saniye sonra işlem durdurulacaktır.`)
.setColor(env.Colors.magenta)
.setFooter(`Developed By Striga.`)).then(m => m.delete({timeout: 7500}))

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

let registerCheck = await message.channel.awaitMessages((m) => m.author.id == message.author.id && ["erkek", "kadın", "iptal"].some(cevap => m.content.toLowerCase().includes(cevap)), {max: 1, time: 30000});
if(registerCheck.size === null) return message.channel.send(new MessageEmbed().setDescription(`${message.author} adlı yetkili ${member} kullanıcısı için bir cinsiyet belirtmediği için işlem iptal edildi.`).setColor(env.Colors.anlik).setFooter(`Developed By Striga.`)).then(x => x.delete({timeout: 6500}));

let manCheck = registerCheck.first() 
if(manCheck.content.toLowerCase().includes(`erkek`)) {
message.channel.send(new MessageEmbed().setDescription(`${member} kullanıcısının ismi "${ServerName}" olarak değiştirildi \nKullanıcıya ${message.author} tarafından <@&${env.Roles.man_role}> verildi.`).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setColor(env.Colors.blue).setFooter(`Developed By Striga.`))
member.setNickname(`${ServerName}`)
member.roles.add(env.Roles.man_role)
member.roles.remove(env.Roles.unregister_role)

client.channels.cache.get(env.Channels.register_channel).send(new MessageEmbed().setTitle(`Bir Üye Kayıt Edildi !`).setDescription(`\`•\` Kullanıcı: ${member} | (${member.id})\n\`•\` Yetkili: ${message.author} | (${message.author.id})\n\n\`•\` Yeni İsim: \`${ServerName}\`\n\`•\` Kullanıcının Cinsiyeti: \`Erkek\`\n\`•\` Verilen Rol: <@&${env.Roles.man_role}>\n\`•\` Kayıt Saati: \`${kayıtsaat}\`\n\`•\` Kayıt Tarihi: \`${moment(Date.now()).format("DD MMMM YYYY")}\``).setThumbnail(member.user.avatarURL({dynamic:true})).setColor(env.Colors.blue).setFooter(`Developed By Striga.`))

const nickNamePush = new UserDB({userID: member.id, userMod: message.author.id, userName: `${Name} | ${Age}`, userNick: ServerName, userRegisterDate: kayıtsaat, userRole: env.Roles.man_role, userSex: "E"})
nickNamePush.save().catch(err => console.log(`İsim kayıt edilirken bir sorun ile karşılaştım.\nLütfen Düzeltin.`))

let staffData = await StaffDB.findOne({userID: message.author.id});
if(!staffData) {
let newStaffScore = new StaffDB({_id: new mongoose.Types.ObjectId(), userID: message.author.id, allRegistry: 1, womanRegistry: 0, manRegistry: 1}).save(); 
} else {
staffData.manRegistry++
staffData.allRegistry++
staffData.save();}
}

let womanCheck = registerCheck.first() 
if(womanCheck.content.toLowerCase().includes(`kadın`)) {
message.channel.send(new MessageEmbed().setDescription(`${member} kullanıcısının ismi "${ServerName}" olarak değiştirildi \nKullanıcıya ${message.author} tarafından <@&${env.Roles.woman_role}> verildi.`).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setColor(env.Colors.pink).setFooter(`Developed By Striga.`))
member.setNickname(`${ServerName}`)
member.roles.add(env.Roles.woman_role)
member.roles.remove(env.Roles.unregister_role)

client.channels.cache.get(env.Channels.register_channel).send(new MessageEmbed().setTitle(`Bir Üye Kayıt Edildi !`).setDescription(`\`•\` Kullanıcı: ${member} | (${member.id})\n\`•\` Yetkili: ${message.author} | (${message.author.id})\n\n\`•\` Yeni İsim: \`${ServerName}\`\n\`•\` Kullanıcının Cinsiyeti: \`Kadın\`\n\`•\` Verilen Rol: <@&${env.Roles.woman_role}>\n\`•\` Kayıt Saati: \`${kayıtsaat}\`\n\`•\` Kayıt Tarihi: \`${moment(Date.now()).format("DD MMMM YYYY")}\``).setThumbnail(member.user.avatarURL({dynamic:true})).setColor(env.Colors.pink).setFooter(`Developed By Striga.`))

const nickNamePush = new UserDB({userID: member.id, userMod: message.author.id, userName: `${Name} | ${Age}`, userNick: ServerName, userRegisterDate: kayıtsaat, userRole: env.Roles.woman_role, userSex: "K"})
nickNamePush.save().catch(err => console.log(`İsim kayıt edilirken bir sorun ile karşılaştım.\nLütfen Düzeltin.`))

let staffData = await StaffDB.findOne({userID: message.author.id});
if(!staffData) {
let newStaffScore = new StaffDB({_id: new mongoose.Types.ObjectId(), userID: message.author.id, allRegistry: 1, womanRegistry: 1, manRegistry: 0}).save(); 
} else {
staffData.womanRegistry++
staffData.allRegistry++
staffData.save();}
}

let cancel = registerCheck.first()
if(cancel.content.toLowerCase().includes(`${config.BotPrefix}iptal`)) {
message.channel.send(new MessageEmbed()
.setAuthor(member.user.tag, member.user.avatarURL({dynamic:true}))
.setDescription(`İşlem iptal edilmiştir.`)
.setColor(env.Colors.red)
.setFooter(`Developed By Striga`)).then(m => m.delete({timeout:6500}))}

}

exports.config = {name: 'kayıt', aliases: ['erkek', 'kadın', 'k', 'e']}
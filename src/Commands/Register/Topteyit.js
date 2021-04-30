const { MessageEmbed } = require('discord.js')
const mongoose = require("mongoose");
const StaffDB = require('../../ClientModels/StaffData')
const env = require('../../Managment/Inventory.json')
exports.run = async(client, message, args) => {
let yanlisEmbed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(env.Colors.red)
if(![env.Staff.register_staff, env.Staff.all_commands].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(yanlisEmbed.setDescription(`Bu komutu sadece (<@&${env.Staff.register_staff}>, <@&${env.Staff.all_commands}>) yetkisine sahip olanlar kullanabilir.`).setFooter(`Developed By Striga.`)).then(m => m.delete({timeout:6500}))

let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setColor(env.Colors.NoEmbed).setThumbnail(message.guild.iconURL({ dynamic: true}));
let TopRegister = await StaffDB.find().sort({ allRegistry: -1 });
TopRegister = TopRegister.filter(x => message.guild.members.cache.has(x.userID)).splice(0, 15)
message.channel.send(embed.setDescription(`**${message.guild.name}** Sunucusunun En Çok Kayıt Yapan İlk 15 Kişinin Listesi; \n\n${TopRegister.length  ?  TopRegister.map((d, index) => `${index+1}. <@${d.userID}> | Toplam: \`${d.allRegistry}\` \n Toplam Erkek: \`${d.manRegistry}\` Toplam Kadın: \`${d.womanRegistry}\` `).join("\n\n") : "Bulunamadı!"}`));}

exports.config = {name: "topteyit", aliases: ["kayıt-liste", "top-teyit", "kayıtliste", "topteyit"]}      
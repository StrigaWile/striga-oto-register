const { MessageEmbed, Message, User, RoleManager, Role } = require('discord.js')
const moment = require('moment')
const udb = require('../ClientModels/UserData')
const env = require('../Managment/Inventory.json')
module.exports = client => {

client.on('guildMemberAdd', member => {
udb.find({userID: member.id}, async(err, data) => {
if(err) return console.log(err.message)
if(data.length > 0) {
let UserData = data.reverse().reverse()
let userServerNick = UserData.map(x => `${x.userName}`)  
let userServerRole = UserData.map(x => `${x.userRole}`) 
let userRegisterDateTime = UserData.map(x => `${x.userRegisterDate}`)
member.setNickname(`${member.user.username.includes(env.Server.ServerTag) ? env.Server.ServerTag : env.Server.UnServerTag} ${userServerNick}`)     
member.roles.add(userServerRole)   
member.roles.remove(env.Roles.unregister_role)    
member.roles.remove(env.Roles.suspect_role) 
if(member.user.username.includes(env.Server.ServerTag)){
await member.roles.add(env.Roles.tag_role)
}
client.channels.cache.get(env.Channels.oto_kayıt).send(new MessageEmbed().setDescription(`${member} sunucumuza ${userRegisterDateTime} tarihinde kayıt olmuş \n\n⤷ Kullanıcının Bilgileri;\n⤷ Kullanıcının İsmi: \`${userServerNick}\`\n⤷ Kullanıcının Rolü: <@&${userServerRole}>\n⤷ Kullanıcının Kayıt Tarihi: ${userRegisterDateTime}`).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setColor('RANDOM'))
}})
})


}
module.exports.config = {name: "guildMemberAdd"};
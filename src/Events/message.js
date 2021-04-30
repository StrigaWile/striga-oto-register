
module.exports = async (message) => {
if(message.author.bot || !message.guild || !message.content) return;
let client = message.client;
let prefix = client.config.prefixes.find(p => message.content.toLowerCase().startsWith(p));
if(!prefix) return;
let args = message.content.split(" ").slice(1);
let command = message.content.split(" ")[0].slice(prefix.length);
let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
if(cmd) {
if(!client.config.developers.includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR") && (client.config.invalids.some(id => message.member.roles.cache.has(id) || message.channel.id === id) || !client.config.staffRoles.some(r => message.member.roles.cache.has(r)))) return;
cmd.run(client, message, args);};};
module.exports.config = {name: "message"};
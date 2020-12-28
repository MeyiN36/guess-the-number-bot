const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('İlk Önce Mesajları Yönet İznin Olmalı')
    var mes = message.mentions.channels.first();
       message.reply(`Oyun Kanalı Başarıyla ${mes} Olarak Ayarlandı!`);
     db.set(`numarak_${message.guild.id}`, `${mes.id}`)
};
exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'kanal',
description: 'Botun pingini gösterir',
usage: 'ping' 
};
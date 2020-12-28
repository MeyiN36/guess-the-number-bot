const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('İlk Önce Mesajları Yönet İznin Olmalı')
var num = 0;
    var mes = args[0]
        num = Math.floor((Math.random() * mes) + 1);
       message.reply(`1 ile ${mes} Arasında Bir Sayı Tuttum :) Hadi Bulun Bakalım`);
     db.set(`numara_${message.guild.id}`, `${num}`)
     db.set(`olusnumara_${message.guild.id}`, `${mes}`)
};
exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'random',
description: 'Botun pingini gösterir',
usage: 'ping' 
};
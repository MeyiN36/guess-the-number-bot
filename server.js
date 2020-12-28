const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const db = require("quick.db")
const ayarlar = require('./ayarlar.json')
require("./util/eventLoader")(client);


const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`selam!`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


let prefix = ayarlar.prefix;

const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${prefix}${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
//KOMUTLARA BAŞLIYOZ
client.on("message", mes => {
let kanal = db.fetch(`numarak_${mes.guild.id}`)
if(mes.channel.id == kanal){
let numara = db.fetch(`numara_${mes.guild.id}`);
let olusnumara = db.fetch(`olusnumara_${mes.guild.id}`)
var num = 0;
       if(mes.content == numara){
            mes.reply('Tebrikler Doğru Bildin! Doğru Sayımız : '+numara+" ve Tekrardan 1 ila "+olusnumara+" Arasında Oluşturdum :) Bulun Bakalım");
            num = Math.floor((Math.random() * olusnumara) + 1);
           db.set(`numara_${mes.guild.id}`, `${num}`)
       }
}
})














client.login(ayarlar.token)
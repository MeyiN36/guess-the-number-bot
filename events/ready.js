module.exports = async(client, user) => {
var oynuyorkısmı = [
`1`,
  `2`,
  `3`,
  `4`
  //uzatabilirsin
];
setInterval(function() {
    var random = Math.floor(Math.random()*(oynuyorkısmı.length-0+1)+0);
   client.user.setActivity(oynuyorkısmı[random], { type: 'PLAYING' });
    }, 2 * 3000);


}
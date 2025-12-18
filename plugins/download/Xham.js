const axios = require('axios');
const { readEnv } = require('../../database');

// Xhamster Search  KX ( KaliyaX ) 🤍

module.exports = [
{
  command: 'xham',
  alias: ['xh', 'xhamster'],
  category: 'download',
  description: 'Search and download videos from xhamster.',
  react: '🎬',
  ownerOnly: false,
  groupOnly: false,
  privateOnly: false,
  
  async execute(cmdData) {
    const { conn, from, q, m, reply, kxq, kxf } = cmdData;
    
    try {
      if (!q) {
        return reply('🔞 Please provide a search term.\n*Example:* `.xham mia khalifa`');
      }

      await m.react('🔍');

      const searchUrl = `https://xham.vercel.app/api/search?query=${encodeURIComponent(q)}`;
      const { data: searchResult } = await axios.get(searchUrl);

      if (!searchResult || searchResult.length === 0) {
        await m.react('❌');
        return reply("⚠️ No videos found for your query. Please try another search term.");
      }
      const botNumber = conn.user.id.split(':')[0];
      const config = await readEnv(botNumber);
      const thumb = "https://i.ibb.co/mVRP9Tgj/logo-xhamster-2007-2016.png";
      const msg = `
┏━❐
┃ \`• xʜᴀᴍꜱᴛᴇʀ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ •\`
┗━❐`

	  

      var rows = [];  
  searchResult.map((v) => {
	rows.push({
        buttonId: `${config.PRIFIX}kx_xhdl_x ${v.url}`,
        buttonText: { displayText: `${v.title}` },
        type: 1
          });
        })

const buttonMessage = {
 
image: {url: thumb },	
  caption: msg,
  footer: kxf,
  buttons: rows,
  headerType: 4
}
return await conn.buttonMessage(from, buttonMessage, kxq)
  
} catch (e) {
  reply('*ERROR !!*')
console.log(e)
}
}
},

// Xhamster Download  KX ( KaliyaX ) 🤍
	
{
  command: 'kx_xhdl_x',
  alias: ['xh', 'xhamster'],
  category: 'nsfw',
  description: 'Search and download videos from xhamster.',
  react: '🎬',
  dontAddCommandList: true,
  ownerOnly: false,
  groupOnly: false,
  privateOnly: false,
  
  async execute(cmdData) {
    const { conn, from, q, m, reply, kxq, kxf } = cmdData;
    
    try {
      
     await m.react('⏳');
      
      const searchUrl = `https://xham.vercel.app/api/search?query=${encodeURIComponent(q)}`;
      const { data: searchResult } = await axios.get(searchUrl);


           const detailUrl = `https://xham.vercel.app/api/detail?url=${encodeURIComponent(q)}`;
            
            const { data: detailResult } = await axios.get(detailUrl);

            if (!detailResult || !detailResult.videoUrl) {
                await conn.sendMessage(from, { react: { text: '❌', key: msg.key } });
                return reply("⚠️ Sorry, I couldn't find a download link for this video.", { quoted: msg });
            }

            const downloadLink = detailResult.videoUrl;
            const videoTitle = detailResult.title;
            const res = detailResult
            let cap = `
┏━❐
┃ \`• xʜᴀᴍꜱᴛᴇʀ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ •\`
┗━❐

> ✘ Title: _${res.title || 'Null'}_

> ✘ Views: ${res.viewCount || 'Null'}

> ✘ Likes Precentage: ${res.likePercentage || 'Null'}

${kxf}`

            await conn.sendMessage(from, { react: { text: '📥', key: m.key } });
            await conn.sendMessage(from, { image: { url: searchResult[0].thumbnail }, caption: cap }, { quoted: kxq });
            await conn.sendMessage(from, {
              document: { url: downloadLink },
              mimetype: "video/mp4",
              fileName: `${videoTitle}.mp4`,
              caption: `${videoTitle}\n\n${kxf}`
            }, { quoted: m });
          
    } catch (e) {
  reply('*ERROR !!*')
console.log(e)
}
  }
	}
	
];
	
       

/*====================================================
Created By KiiCode
Instagram = @kiicodeit
Tiktok = @kiicodeproject
YouTube = @KiiCodeProject
Channel = https://whatsapp.com/channel/0029VaZSdai5Ui2TMoNsYo0J
Note: minimal follow sosmed admin dan jangan hapus cr rek
=====================================================*/
require('./system/settings.js')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys")
const axios = require('axios')
const FileType = require('file-type')
const fetch = require('node-fetch')
const crypto = require('crypto')
const cheerio = require('cheerio');
const fs = require('fs-extra')
const { sizeFormatter } = require("human-readable")
const format = sizeFormatter()
const os = require('os');
const { exec } = require("child_process");
const speed = require('performance-now');
const util = require('util')
const chalk = require('chalk')
const moment = require('moment-timezone');
const md5 = require('md5');
const search = require('yt-search');
//=================================================//
const { clockString, tanggal, getTime, isUrl, sleep, runtime, fetchJson, getBuffer, jsonformat, reSize, generateProfilePicture } = require('./function/myfunc')
const ms = toMs = require('ms');
const { color, bgcolor } = require('./function/color')
//=================================================//

const path = require('path');
const nodemailer = require('nodemailer');

const databasePath = path.join(__dirname, './system/database.json');
const readDatabase = () => JSON.parse(fs.readFileSync(databasePath, 'utf8'));
const saveDatabase = (data) => fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));

let database = readDatabase();
let users = readDatabase();
let user = users.find(user => user.number === m.sender);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${mail}`,
    pass: `${pwmail}`,
  },
});

const sendVerifiEmail = async (email, otp) => {
  const mailOptions = {
    from: `${mail}`,
    to: email,
    subject: 'Kode Verifikasi',
    html: `
      <h1>Email Verification</h1>
      <p>Thank you for registering. Your verification code is:</p>
      <h2>${otp}</h2>
      <p>This code will expire in 30 seconds.</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = kiicode = async (kiicode, m, chatUpdate, store) => {
  try {
    const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '';
    const bady = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'interactiveResponseMessage') ? appenTextMessage(JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, chatUpdate) : (m.mtype == 'templateButtonReplyMessage') ? appenTextMessage(m.msg.selectedId, chatUpdate) : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '';

    const budy = (typeof m.text == 'string' ? m.text : '');
    const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '.';

    async function appenTextMessage(text, chatUpdate) {
      let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
        userJid: kiicode.user.id,
        quoted: m.quoted && m.quoted.fakeObj
      });
      messages.key.fromMe = areJidsSameUser(m.sender, kiicode.user.id);
      messages.key.id = m.key.id;
      messages.pushName = m.pushName;
      if (m.isGroup) messages.participant = m.sender;
      let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: 'append'
      };
      kiicode.ev.emit('messages.upsert', msg);
    }

    // =================================================//

    const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : '';
    const isGroup = m.key.remoteJid.endsWith('@g.us');
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const { type, quotedMsg, mentioned, now, fromMe } = m;
    const isCmd = body.startsWith(prefix);
    const from = m.key.remoteJid;
    const pushname = m.pushName || "No Name";
    const botNumber = await kiicode.decodeJid(kiicode.user.id);
    const groupMetadata = m.isGroup ? await kiicode.groupMetadata(m.chat).catch(e => { }) : '';
    const groupName = m.isGroup ? groupMetadata.subject : '';
    const participants = m.isGroup ? await groupMetadata.participants : '';
    const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : '';
    const groupOwner = m.isGroup ? groupMetadata.owner : '';
    const groupMembers = m.isGroup ? groupMetadata.participants : '';
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;

    // ====================================== //		         

    const itsMe = m.sender == botNumber ? true : false;
    const text = q = args.join(" ");
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const jam = moment.tz('asia/Jakarta').format('HH:mm:ss');
    const tanggal = moment().tz("Asia/Jakarta").format("ll");
    const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a');
    const ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1);
    const isMedia = /image|document|file|video|sticker|audio/.test(mime);
    const isImage = (type == 'imageMessage');
    const isVideo = (type == 'videoMessage');
    const isAudio = (type == 'audioMessage');
    const isSticker = (type == 'stickerMessage');
    const isDocument = (type == 'documentMessage');
    const isFile = (type == 'fileMessage');

    // ====================================== //		

    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
    const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage');
    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
    const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
    const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
    const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage');
    const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage');
    const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid;
    const isOwner = [`${owner}@s.whatsapp.net`] == sender ? true : [`${owner}@s.whatsapp.net`].includes(sender) ? true : false;
    const senderNumber = sender.split('@')[0];
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];

    // ====================================== //		

    var mdu = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
    var halalu = mdu[Math.floor(Math.random() * mdu.length)];
    var mdo = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
    var halalo = mdo[Math.floor(Math.random() * mdo.length)];
    var mdi = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
    var halali = mdi[Math.floor(Math.random() * mdi.length)];
    var mda = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
    var halala = mda[Math.floor(Math.random() * mda.length)];
    var mde = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
    var halale = mde[Math.floor(Math.random() * mde.length)];
    if (isCmd) {
      console.log(chalk.white.bgBlue.bold('KiiCode'), color(`[ PESAN BARU ]`, `${halalu}`), color(`DARI`, `${halalo}`), color(`${pushname}`, `${halali}`), color(`PESAN :`, `${halala}`), color(`${body}`, `${halale}`));
    }

    async function sendkiicodeMessage(chatId, message, options = {}) {
      let generate = await generateWAMessage(chatId, message, options);
      let type2 = getContentType(generate.message);
      if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo;
      if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo;
      return await kiicode.relayMessage(chatId, generate.message, { messageId: generate.key.id });
    }

const kiibut = (anu) => {
const {message, key} = generateWAMessageFromContent(m.chat, {
  interactiveMessage: {
    body: {text: anu},
    footer: {text: `\n${global.ownername}`},
    nativeFlowMessage: {
      buttons: [{text: "KiiCode"}
           ],
    }
  },
}, {quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: `${body}`}}})
 kiicode.relayMessage(m.chat, {viewOnceMessage:{message}}, {messageId:key.id})
}

/// AUTO UPDATE SIIKOMIK ///
const lastUpdateFile = './lastUpdate.json';

const getLastUpdateUrl = async () => {
  if (fs.existsSync(lastUpdateFile)) {
    const data = await fs.readJSON(lastUpdateFile);
    return data.lastUpdateUrl || '';
  }
  return '';
};
      
const setLastUpdateUrl = async (url) => {
  await fs.writeJSON(lastUpdateFile, { lastUpdateUrl: url });
};
      
const url = 'https://siikomik.com/';
let lastUpdateUrl = '';

const sendProjectUpdate = (project) => {
  const latestChapter = project.chapters[0];
  const message = `
*UPDATE KOMIK*

*TITLE:* ${project.title}
*CHAPTERS:* ${latestChapter.title}
*RELEASE DATE:* ${latestChapter.updated}
*URL CHAPTERS:* ${latestChapter.url}

*© Jaki*`;
  kiicode.sendMessage(`${gcid}`, { image: { url: `${project.imageUrl}`}, caption: `${message}`}, m)
};
      
const siikomikUpdate = async () => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const projects = [];

    $('div.bixbox').each((i, element) => {
      if ($(element).find('h2').text().trim() === 'Project Update') {
        $(element).find('div.utao.styletwo > div.uta').each((j, el) => {
          const project = {};

          project.title = $(el).find('div.luf > a.series > h4').text().trim();
          project.url = $(el).find('div.imgu > a.series').attr('href');
          project.imageUrl = $(el).find('div.imgu > a.series > img').attr('src');

          project.chapters = [];
          $(el).find('div.luf > ul > li').each((k, li) => {
            const chapter = {};
            chapter.title = $(li).find('a').text().trim();
            chapter.url = $(li).find('a').attr('href');
            chapter.updated = $(li).find('span').text().trim();
            project.chapters.push(chapter);
          });

          projects.push(project);
        });
      }
    });
      
    if (projects.length > 0) {
      const latestProject = projects[0];
      const latestChapterUrl = latestProject.chapters[0].url;

      const lastUpdateUrl = await getLastUpdateUrl();

      if (latestChapterUrl !== lastUpdateUrl) {
        await setLastUpdateUrl(latestChapterUrl);
        sendProjectUpdate(latestProject);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

setInterval(siikomikUpdate, 10000);
////////////////////////////
      
//// AUTO INFO JADWAL SHOLAT /////
 /*     setInterval(async () => {
            const now = moment().tz(timezone);
            const messagePromises = [];

            for (const [prayerName, prayerTime] of Object.entries(prayerTimes)) {
                const prayerMoment = moment.tz(prayerTime, 'hh:mm A', timezone);
                const notifyTime = prayerMoment.clone().subtract(5, 'minutes');

                if (now.isSameOrAfter(notifyTime) && now.isBefore(prayerMoment)) {
                    const message = `Ingat! ${prayerName} di Solok, Sumatra Barat, Indonesia akan dimulai dalam 5 menit pada ${prayerMoment.format('HH:mm')}.`;
                    messagePromises.push(kiibut(`${gcid}`, message));
                }
            }

            await Promise.all(messagePromises);
        }, 60000);*/
/////////////////////////////////

const idgc = `${gcid}`
const groupData = {
    chats: {},
    lastActive: {}
};

      if(m.text) {
          await kiicode.readMessages([m.key])
          }
    //=================================================//

    switch (command) {

      case 'promosi': {
      if (!user) {
        user = {
          username: pushname,
          number: m.sender,
          delayPromosi: 0
        };
        users.push(user);
        saveDatabase(users);
      }
      if(!text) return kiibut(mess.text)
      if(!/\#shareboost/gi.test(text)) return kiibut("Wajib memasukkan #SHAREBOOST")
      kiicode.sendMessage(chid, { text: `${text}`}, m);
      if (user.delayPromosi && Date.now() < user.delayPromosi) {
        const remainingTime = moment.duration(user.delayPromosi - Date.now());
        return kiibut(`Anda sudah melakukan promosi. Silakan coba lagi setelah ${remainingTime.minutes()} menit ${remainingTime.seconds()} detik.`);
      }

      user.delayPromosi = Date.now() + 15 * 60 * 1000;
      saveDatabase(users);
      const remainingTime = moment.duration(user.delayPromosi - Date.now());
      await kiibut(`sukses promosi anda bisa promosi lagi setelah ${remainingTime.minutes()} menit ${remainingTime.seconds()} detik.`);
          }
        break;
            
       
      default:

    }
  } catch (err) {
    console.log(util.format(err));
    let e = String(err);
    kiicode.sendMessage(`${owner}@s.whatsapp.net`, { text: "Hey there is an error:" + util.format(e), 
      contextInfo: {
        forwardingScore: 5, 
        isForwarded: true
      }
    });
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});

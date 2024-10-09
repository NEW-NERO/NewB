global.chalk = require("chalk")
global.fs = require("fs")

global.owner = "6289604363344";
global.ownername = "ᴋɪɪᴄᴏᴅᴇ ᴘʀᴏᴊᴇᴄᴛꜱ"
global.botname = "ᴇʟxʏᴢ"
global.botNumber = '6285974563066'
global.thumb = 'https://telegra.ph/file/79f40d2ff8f3fd21ef893.jpg'
global.author = 'ᴋɪɪᴄᴏᴅᴇ ᴘʀᴏᴊᴇᴄᴛꜱ'
global.chid = '120363315754436714@newsletter'
global.gcid = '120363302489531660@g.us'
global.mail = 'kiicodeofficial@gmail.com'
global.pwmail = 'dbkzzhgtfrgrtonh'
global.kii = 'キ'
global.mess = {
    wait: 'Loading...',
    succes: 'Sip, Berhasil',
    admin: 'Gagal, Khusus Admin Group',
    botAdmin: 'Gagal, Bot Belum Admin',
    owner: 'Gagal, Khusus Developer',
    group: 'Gagal, Fitur Untuk Grup',
    private: 'Gagal, Fitur Untuk Chat Pribadi',
    bot: 'Gagal, Bot Number User Special Features!!!',
    error: 'Eror...',    
    text: 'Gagal, Text Nya Mana?',
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})

const util = require("util");
const fs = require("fs-extra");
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

// Menu Command
zokou(
  {
    nomCom: "menu",
    categorie: "General",
    reaction: "⚡",
  },
  async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");

    // Initial loading message
    let loadingMsg = await zk.sendMessage(
      dest,
      {
        text: "𝐋𝐨𝐚𝐝𝐢𝐧𝐠....\n▰▱▱▱▱▱▱▱▱▱ 10%",
      },
      { quoted: ms }
    );

    // Function to update loading progress
    const updateProgress = async (percent) => {
      const filled = Math.floor(percent / 10);
      const empty = 10 - filled;
      const batteryBar = "▰".repeat(filled) + "▱".repeat(empty);
      await zk.sendMessage(
        dest,
        {
          text: `𝐋𝐨𝐚𝐝𝐢𝐧�{g...\n${batteryBar} ${percent}%`,
          edit: loadingMsg.key,
        },
        { quoted: ms }
      );
    };

    // Custom loading steps with skips (10%, 30%, 50%, 70%, 100%)
    const loadingSteps = [10, 30, 50, 70, 100];
    for (let percent of loadingSteps) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      await updateProgress(percent);
    }

    // Command categorization
    var coms = {};
    var mode = "public";
    if (s.MODE.toLocaleLowerCase() !== "yes") {
      mode = "private";
    }

    cm.map(async (com) => {
      if (!coms[com.categorie]) {
        coms[com.categorie] = [];
      }
      coms[com.categorie].push(com.nomCom);
    });

    // Set timezone and get current time
    moment.tz.setDefault("EAT");
    const temps = moment().format("HH:mm:ss");

    // Info section
    let infoMsg = `
◈━━━━━━━━━━━━━━━━◈
  
     𝐓𝐎𝐗𝐈𝐂-𝐌𝐃 𝐕𝟐
  
> ✦ 𝐎𝐰𝐧𝐞𝐫: 
@254735342808

> ✦ 𝐌�{o𝐝𝐞: 
${mode}

> ✦ 𝐓𝐢𝐦𝐞: 
${temps} (EAT)

> ✦ �{R𝐀𝐌: 
${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}

◈━━━━━━━━━━━━━━━━◈
`;

    // Menu section
    let menuMsg = `
◈━━━━━━━━━━━━━━━━◈
  ⚡ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐌𝐄𝐍𝐔 ⚡
  
  𝐔𝐬𝐞 ${prefixe}help <command>
  𝐟𝐨𝐫 𝐝𝐞𝐭𝐚𝐢𝐥𝐬
  
  ✦✦✦✦✦✦✦✦✦✦✦✦✦✦
`;

    // Category styles with mature, realistic decor
    const categoryStyles = {
      General: { icon: "🌟", decor: "─" },
      Group: { icon: "👥", decor: "═" },
      Mods: { icon: "🛡️", decor: "≡" },
      Fun: { icon: "🎭", decor: "—" },
      Search: { icon: "🔍", decor: "┄" },
      Logo: { icon: "🎨", decor: "┈" },
      Utilities: { icon: "🛠", decor: "┃" },
    };

    // Build menu with all categories and vertical command listing
    for (const cat in coms) {
      const style = categoryStyles[cat] || { icon: "✨", decor: "⋯" };
      menuMsg += `\n  ${style.decor} ${style.icon} *${cat.toUpperCase()}* ${style.icon} ${style.decor}\n`;

      // List commands vertically with a bullet point
      coms[cat].forEach((cmd) => {
        menuMsg += `  • ${cmd}\n`;
      });
    }

    menuMsg += `
◈━━━━━━━━━━━━━━━━◈
> 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑𝐒
  
  @254735342808 (𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧)
  @254799283147 (𝐓𝐎𝐗𝐈𝐂-𝐌𝐃)
  
 ⃝⃪⃕🥀-〭⃛〬𓆩〭⃛〬❥
◈━━━━━━━━━━━━━━━━◈
`;

    try {
      const lien = mybotpic();
      const mentionedJids = [
        "254735342808@s.whatsapp.net",
        "254799283147@s.whatsapp.net",
      ];

      // Final loading confirmation
      await zk.sendMessage(
        dest,
        {
          text: "𝐌𝐄𝐍𝐔 𝐑𝐄𝐀𝐃𝐘!✅\n▰▰▰▰▰▰▰▰▰▰ 100%",
          edit: loadingMsg.key,
        },
        { quoted: ms }
      );

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Send menu based on media type
      if (lien.match(/\.(mp4|gif)$/i)) {
        await zk.sendMessage(
          dest,
          {
            video: { url: lien },
            caption: infoMsg + menuMsg,
            footer: "◄⏤͟͞ꭙͯ͢³➤⃝ ⃝⃪⃕𝚣⃪ꙴ-〭⃛〬𓆩〭⃛〬❥",
            mentions: mentionedJids,
            gifPlayback: true,
          },
          { quoted: ms }
        );
      } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        await zk.sendMessage(
          dest,
          {
            image: { url: lien },
            caption: infoMsg + menuMsg,
            footer: "◄⏤͟͞ꭙͯ͢³➤⃝ ⃝⃪⃕𝚣⃪ꙴ-〭⃛〬𓆩〭⃛〬❥",
            mentions: mentionedJids,
          },
          { quoted: ms }
        );
      } else {
        await zk.sendMessage(
          dest,
          {
            text: infoMsg + menuMsg,
            mentions: mentionedJids,
          },
          { quoted: ms }
        );
      }

      // Send random audio as a voice note
      const audioFolder = __dirname + "/../xh_clinton/";
      const audioFiles = Array.from({ length: 9 }, (_, i) => `menu${i + 1}.mp3`);
      const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
      const audioPath = audioFolder + randomAudio;

      console.log("Audio folder:", audioFolder);
      console.log("Selected audio:", randomAudio);
      console.log("Full audio path:", audioPath);

      if (fs.existsSync(audioPath)) {
        console.log("Audio file found, sending as voice note...");
        try {
          await zk.sendMessage(
            dest,
            {
              audio: { url: audioPath },
              mimetype: "audio/mpeg", // Changed to mpeg for MP3 compatibility
              ptt: true, // Voice note appearance
              fileName: `𝐓𝐎𝐗𝐈𝐂 𝐕𝐎𝐈𝐂𝐄 ✧`,
              caption: "✦⋆✗𝐓𝐎𝐗𝐈𝐂",
            },
            { quoted: ms }
          );
          console.log("Audio sent successfully:", randomAudio);
        } catch (audioError) {
          console.error("Error sending audio:", audioError);
          repondre(`𝐄𝐫𝐫𝐨𝐫 𝐬𝐞𝐧𝐝𝐢𝐧𝐠 𝐯𝐨𝐢𝐜𝐞 𝐧𝐨𝐭𝐞: ${audioError.message}`);
        }
      } else {
        console.log("Audio file not found at:", audioPath);
        repondre(`𝐀𝐮𝐝𝐢�{o 𝐟𝐢𝐥𝐞 𝐧�{o𝐭 𝐟�{o𝐮𝐧𝐝: ${randomAudio}`);
      }
    } catch (e) {
      console.error("◈ 𝐄𝐑𝐑𝐎𝐑 ◈", e);
      await zk.sendMessage(
        dest,
        {
          text: "◈ 𝐅𝐀𝐈𝐋𝐄𝐃 𝐓𝐎 𝐋𝐎𝐀�{D 𝐌𝐄𝐍𝐔 ◈\n�{P𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫",
          edit: loadingMsg.key,
        },
        { quoted: ms }
      );
    }
  }
);
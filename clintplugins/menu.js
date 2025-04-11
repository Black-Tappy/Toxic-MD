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
          text: `𝐋𝐨𝐚𝐝𝐢𝐧𝐠...\n${batteryBar} ${percent}%`,
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

> ✦ 𝐌𝐨𝐝𝐞: 
${mode}

> ✦ 𝐓𝐢𝐦𝐞: 
${temps} (EAT)

> ✦ 𝐑𝐀𝐌: 
${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}

◈━━━━━━━━━━━━━━━━◈
`;

    // Categories list with numbers
    const categories = Object.keys(coms).sort();
    let categoriesMsg = `
◈━━━━━━━━━━━━━━━━◈
  ⚡ 𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐈𝐄𝐒 ⚡
  
  𝐑𝐞𝐩𝐥𝐲 𝐰𝐢𝐭𝐡 𝐚 𝐧𝐮𝐦𝐛𝐞𝐫 𝐭𝐨 𝐯𝐢𝐞𝐰 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬
  
  ✦✦✦✦✦✦✦✦✦✦✦✦✦✦
`;

    categories.forEach((cat, index) => {
      categoriesMsg += `  ${index + 1}. ${cat}\n`;
    });

    categoriesMsg += `
◈━━━━━━━━━━━━━━━━◈
> 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑𝐒
  
  @254735342808 (𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧)
  @254799283147 (𝐓𝐎𝐗𝐈𝐂-𝐌𝐃)
  
 ⃝⃪⃕🥀-〭⃛〬𓆩〭⃛〬❥
◈━━━━━━━━━━━━━━━━◈
`;

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

    // Send categories list based on media type
    let categoryMessage;
    if (lien.match(/\.(mp4|gif)$/i)) {
      categoryMessage = await zk.sendMessage(
        dest,
        {
          video: { url: lien },
          caption: infoMsg + categoriesMsg,
          footer: "◄⏤͟͞ꭙͯ͢³➤⃝ ⃝⃪⃕𝚣⃪ꙴ-〭⃛〬𓆩〭⃛〬❥",
          mentions: mentionedJids,
          gifPlayback: true,
        },
        { quoted: ms }
      );
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
      categoryMessage = await zk.sendMessage(
        dest,
        {
          image: { url: lien },
          caption: infoMsg + categoriesMsg,
          footer: "◄⏤͟͞ꭙͯ͢³➤⃝ ⃝⃪⃕𝚣⃪ꙴ-〭⃛〬𓆩〭⃛〬❥",
          mentions: mentionedJids,
        },
        { quoted: ms }
      );
    } else {
      categoryMessage = await zk.sendMessage(
        dest,
        {
          text: infoMsg + categoriesMsg,
          mentions: mentionedJids,
        },
        { quoted: ms }
      );
    }

    // Temporary message handler to capture the user's reply
    let userInput = null;
    const filter = (message) => message.sender === nomAuteurMessage && message.quoted && message.quoted.key.id === categoryMessage.key.id;

    const messageHandler = (message) => {
      if (filter(message)) {
        userInput = message.conversation.trim();
        zk.removeListener("message", messageHandler); // Remove the listener after capturing the reply
      }
    };

    zk.on("message", messageHandler);

    // Wait for 30 seconds to collect the response
    await new Promise((resolve) => setTimeout(resolve, 30000));

    if (!userInput) {
      repondre("𝐓𝐢𝐦𝐞𝐨𝐮𝐭! 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐰𝐢𝐭𝐡 .𝐦𝐞𝐧𝐮.");
      zk.removeListener("message", messageHandler); // Clean up the listener
      return;
    }

    const categoryIndex = parseInt(userInput) - 1;

    if (isNaN(categoryIndex) || categoryIndex < 0 || categoryIndex >= categories.length) {
      repondre(`𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲 𝐧𝐮�{m𝐛𝐞𝐫. 𝐔𝐬𝐞 .𝐦𝐞𝐧𝐮 𝐭𝐨 𝐬𝐞𝐞 𝐭𝐡𝐞 𝐥𝐢𝐬𝐭.`);
      return;
    }

    const selectedCategory = categories[categoryIndex];

    // Build menu for the selected category
    let categoryMenuMsg = `
◈━━━━━━━━━━━━━━━━◈
  ⚡ ${selectedCategory.toUpperCase()} 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ⚡
  
  𝐔𝐬𝐞 ${prefixe}help <command>
  𝐟𝐨𝐫 𝐝𝐞𝐭𝐚𝐢𝐥𝐬
  
  ✦✦✦✦✦✦✦✦✦✦✦✦✦✦
`;

    coms[selectedCategory].forEach((cmd) => {
      categoryMenuMsg += `  • ${cmd}\n`;
    });

    categoryMenuMsg += `
◈━━━━━━━━━━━━━━━━◈
> 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑𝐒
  
  @254735342808 (𝐱𝐡_�{c𝐥𝐢𝐧𝐭𝐨𝐧)
  @254799283147 (𝐓𝐎𝐗𝐈𝐂-𝐌𝐃)
  
 ⃝⃪⃕🥀-〭⃛〬𓆩〭⃛〬❥
◈━━━━━━━━━━━━━━━━◈
`;

    // Send the selected category's commands
    if (lien.match(/\.(mp4|gif)$/i)) {
      await zk.sendMessage(
        dest,
        {
          video: { url: lien },
          caption: infoMsg + categoryMenuMsg,
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
          caption: infoMsg + categoryMenuMsg,
          footer: "◄⏤͟͞ꭙͯ͢³➤⃝ ⃝⃪⃕𝚣⃪ꙴ-〭⃛〬𓆩〭⃛〬❥",
          mentions: mentionedJids,
        },
        { quoted: ms }
      );
    } else {
      await zk.sendMessage(
        dest,
        {
          text: infoMsg + categoryMenuMsg,
          mentions: mentionedJids,
        },
        { quoted: ms }
      );
    }

    // Send random audio as a voice note
    const audioFolder = __dirname + "/../xh_clinton/";
    console.log("Audio folder path:", audioFolder);

    if (!fs.existsSync(audioFolder)) {
      console.log("Audio folder does not exist:", audioFolder);
      repondre(`𝐀𝐮𝐝𝐢𝐨 𝐟𝐨𝐥𝐝𝐞𝐫 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝: ${audioFolder}`);
      return;
    }

    const audioFiles = fs.readdirSync(audioFolder).filter(f => f.endsWith(".mp3"));
    console.log("Available audio files:", audioFiles);

    if (audioFiles.length === 0) {
      console.log("No MP3 files found in folder");
      repondre(`𝐍𝐨 𝐚𝐮𝐝𝐢𝐨 𝐟𝐢𝐥𝐞𝐬 𝐟𝐨𝐮𝐧𝐝 𝐢𝐧 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭�{o𝐧 𝐟𝐨𝐥𝐝𝐞𝐫`);
      return;
    }

    const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
    const audioPath = audioFolder + randomAudio;

    console.log("Randomly selected audio:", randomAudio);
    console.log("Full audio path:", audioPath);

    if (fs.existsSync(audioPath)) {
      console.log("Audio file exists, sending as voice note...");
      try {
        const audioMessage = await zk.sendMessage(
          dest,
          {
            audio: { url: audioPath },
            mimetype: "audio/mpeg",
            ptt: true,
            fileName: `𝐓𝐎𝐗𝐈𝐂 𝐕𝐎𝐈𝐂𝐄 ✧`,
            caption: "✦⋆✗𝐓𝐎𝐗𝐈𝐂",
          },
          { quoted: ms }
        );
        console.log("Audio sent successfully:", randomAudio);
        console.log("Audio message details:", audioMessage);
      } catch (audioError) {
        console.error("Error sending audio:", audioError);
        repondre(`𝐄𝐫𝐫𝐨𝐫 𝐬𝐞𝐧�{d𝐢𝐧𝐠 𝐯�{o𝐢𝐜𝐞 𝐧𝐨𝐭𝐞: ${audioError.message}`);
      }
    } else {
      console.log("Selected audio file not found at:", audioPath);
      repondre(`𝐀𝐮𝐝𝐢�{o 𝐟𝐢𝐥𝐞 𝐧�{o𝐭 𝐟�{o𝐮𝐧𝐝: ${randomAudio}\n𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐟𝐢𝐥𝐞�{s: ${audioFiles.join(", ")}`);
    }
  }
);
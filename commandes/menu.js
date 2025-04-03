const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

// Helper function to apply fancy font
const fancy = (text) => {
    const fancyMap = {
        a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡",
        i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩",
        q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱",
        y: "𝐲", z: "𝐳",
        A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇",
        I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏",
        Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗",
        Y: "𝐘", Z: "𝐙",
        0: "𝟎", 1: "𝟏", 2: "𝟐", 3: "𝟑", 4: "𝟒", 5: "𝟓", 6: "𝟔", 7: "𝟕",
        8: "𝟖", 9: "𝟗"
    };
    return text.split('').map(char => fancyMap[char] || char).join('');
};

// Add help as an alias for menu
zokou({ 
    nomCom: ["menu", "help"], 
    categorie: "General", 
    reaction: "🔥" 
}, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");

    // Stylish loading animation with fancy font
    let loadingMsg = await zk.sendMessage(dest, { 
        text: fancy("🔄 𝐓𝐎𝐗𝐈𝐂-𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐎𝐀𝐃𝐈𝐍𝐆...\n▰▱▱▱▱▱▱▱▱ 10%")
    }, { quoted: ms });

    // Update progress with stylish bars and fancy font
    const updateProgress = async (percent) => {
        const filled = Math.round(percent/10);
        const empty = 10 - filled;
        const progressBar = '▰'.repeat(filled) + '▱'.repeat(empty);
        await zk.sendMessage(dest, {
            text: fancy(`🔄 𝐓𝐎𝐗𝐈𝐂-𝐌𝐃 𝐌𝐄𝐍𝐔 𝐋𝐎𝐀𝐃𝐈𝐍𝐆...\n${progressBar} ${percent}%`),
            edit: loadingMsg.key
        });
    };

    // Simulate loading process with smooth transitions
    for (let i = 20; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 400));
        await updateProgress(i);
    }

    // Prepare menu content
    var coms = {};
    var mode = "public";
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Stylish header with gradient effect and fancy font
    let infoMsg = fancy(`
╔═════◇ 𝐓𝐎𝐗𝐈𝐂-𝐌𝐃 𝐕𝟐 ◇═════╗
║
║  🔥 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐓𝐎𝐗𝐈𝐂 𝐃𝐄𝐕 🔥
║
╠════◇ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐍𝐅𝐎 ◇════╣
║
║ 👑 𝐎𝐰𝐧𝐞𝐫: @254735342808
║ ⚡ 𝐌𝐨𝐝𝐞: ${mode}
║ ⏰ 𝐓𝐢𝐦𝐞: ${temps} (𝐄𝐀𝐓)
║ 💾 𝐑𝐀𝐌: ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
║
╚════◇ 𝐒𝐓𝐀𝐓𝐔𝐒 ◇════╝
`);

    let menuMsg = fancy(`
╔═════◇ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐌𝐄𝐍𝐔 ◇═════╗
║
║ 📌 𝐔𝐬𝐚𝐠𝐞: ${prefixe}𝐡𝐞𝐥𝐩 <𝐜𝐨𝐦𝐦𝐚𝐧𝐝>
║ 𝐟𝐨𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐝𝐞𝐭𝐚𝐢𝐥𝐬
║
╠════◇ 𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐈𝐄𝐒 ◇════╣
`);

    // Enhanced category styling with emojis and colors
    const categoryStyles = {
        "General": { icon: "📌", color: "#FFD700" },
        "Group": { icon: "👥", color: "#00BFFF" },
        "Mods": { icon: "🛡️", color: "#FF4500" },
        "Fun": { icon: "🎭", color: "#9370DB" },
        "Search": { icon: "🔍", color: "#32CD32" }
    };

    for (const cat in coms) {
        const style = categoryStyles[cat] || { icon: "✨", color: "#FFFFFF" };
        menuMsg += fancy(`║\n║ ${style.icon} ${cat.toUpperCase()} ${style.icon}\n║\n`);

        // Split commands into chunks of 3 for better layout
        const chunkSize = 3;
        for (let i = 0; i < coms[cat].length; i += chunkSize) {
            const chunk = coms[cat].slice(i, i + chunkSize);
            menuMsg += fancy(`║ ➤ ${chunk.join(" • ")}\n`);
        }
    }

    menuMsg += fancy(`
╠════◇ 𝐂𝐑𝐄𝐃𝐈𝐓𝐒 ◇════╣
║
║ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐝 𝐛𝐲:
║ @254735342808 (𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧)
║ @254799283147 (𝐓𝐎𝐗𝐈𝐂-𝐌𝐃)
║
╚════◇ 𝐄𝐍𝐃 ◇════╝
`);

    try {
        const lien = mybotpic();
        const mentionedJids = [
            '254735342808@s.whatsapp.net', 
            '254799283147@s.whatsapp.net'
        ];

        // Remove the "Menu Ready" message and directly show the menu
        await zk.sendMessage(dest, {
            text: "",
            edit: loadingMsg.key
        });

        // Small delay before showing menu
        await new Promise(resolve => setTimeout(resolve, 300));

        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    video: { url: lien }, 
                    caption: infoMsg + menuMsg,
                    footer: fancy("🔥 𝐓𝐎𝐗𝐈𝐂-𝐌𝐃 - 𝐓𝐡𝐞 𝐌𝐨𝐬𝐭 𝐏𝐨𝐰𝐞𝐫𝐟𝐮𝐥 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭"),
                    mentions: mentionedJids,
                    gifPlayback: true
                },
                { quoted: ms }
            );
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    image: { url: lien }, 
                    caption: infoMsg + menuMsg,
                    footer: fancy("🔥 𝐓𝐎𝐗𝐈𝐂-𝐌𝐃 - 𝐓𝐡𝐞 𝐌𝐨𝐬𝐭 𝐏𝐨𝐰𝐞𝐫𝐟𝐮𝐥 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭"),
                    mentions: mentionedJids
                },
                { quoted: ms }
            );
        } else {
            await zk.sendMessage(
                dest,
                { 
                    text: infoMsg + menuMsg,
                    mentions: mentionedJids
                },
                { quoted: ms }
            );
        }
    } catch (e) {
        console.error(fancy("❌ 𝐄𝐫𝐫𝐨𝐫:"), e);
        await zk.sendMessage(dest, {
            text: fancy("❌ 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐥𝐨𝐚𝐝 𝐦𝐞𝐧𝐮. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫."),
            edit: loadingMsg.key
        });
    }
});
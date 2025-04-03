zokou({
  nomCom: "gpt",
  categorie: "AI",
  reaction: "🤖"
}, async (dest, zk, command) => {
  const { ms, repondre, arg } = command;
  
  if (!arg[0]) {
    return repondre(`
╭───── • ─────╮
   𝐓𝐎𝐗𝐈𝐂-𝐌𝐃 𝐀𝐈
╰───── • ─────╯

🤖 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧
👑 𝐎𝐰𝐧𝐞𝐫: 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧

╰── ⋅ ⋅ ⋅ ── ✦ ── ⋅ ⋅ ⋅ ──╯`);
  }

  try {
    const question = arg.join(" ");
    const apiUrl = `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(question)}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Handle empty responses more gracefully
    if (!data || !data.result || data.result.trim() === "") {
      return repondre(`
╭───── • ─────╮
   𝐓𝐎𝐗𝐈𝐂-𝐌𝐃 𝐀𝐈
╰───── • ─────╯

🤖 𝐓𝐡𝐞 𝐀𝐈 𝐝𝐢𝐝 𝐧𝐨𝐭 𝐫𝐞𝐭𝐮𝐫𝐧 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞
💡 𝐓𝐫𝐲 𝐚𝐬𝐤𝐢𝐧𝐠 𝐝𝐢𝐟𝐟𝐞𝐫𝐞𝐧𝐭𝐥𝐲
👑 𝐎𝐰𝐧𝐞𝐫: 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧

╰── ⋅ ⋅ ⋅ ── ✦ ── ⋅ ⋅ ⋅ ──╯`);
    }

    // Format response
    await repondre(`
╭───── • ─────╮
   𝐓𝐎𝐗𝐈𝐂-𝐌𝐃 𝐀𝐈
╰───── • ─────╯

🗣️ 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧: ${question}

🤖 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞:
${data.result}

👑 𝐎𝐰𝐧𝐞𝐫: 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧

╰── ⋅ ⋅ ⋅ ── ✦ ── ⋅ ⋅ ⋅ ──╯`);

  } catch (error) {
    console.error("GPT Error:", error);
    await repondre(`
╭───── • ─────╮
   𝐓𝐎𝐗𝐈𝐂-𝐌𝐃 𝐀𝐈
╰───── • ─────╯

⚠️ 𝐀𝐈 𝐬𝐞𝐫𝐯𝐢𝐜𝐞 𝐭𝐞𝐦𝐩𝐨𝐫𝐚𝐫𝐢𝐥𝐲 𝐮𝐧𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞
👑 𝐎𝐰𝐧𝐞𝐫: 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧

╰── ⋅ ⋅ ⋅ ── ✦ ── ⋅ ⋅ ⋅ ──╯`);
  }
});
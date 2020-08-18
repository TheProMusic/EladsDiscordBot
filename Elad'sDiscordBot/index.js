const Discord = require("discord.js");
const bot = new Discord.Client();

const prefix = "*";

bot.on("ready", () => {
  console.log("This bot is online!");
});

bot.on("guildMemberAdd", (member) => {
  var role = member.guild.roles.cache.find((r) => r.name === "Normal 🌈-- NL");

  member.roles.add(role);

  let channel = member.guild.channels.cache.find(
    (ch) => ch.name === "ברוכים-הקופים"
  );

  if (!channel) return;

  channel.send(
    `ברוך הבא ${member}, לשרת המלכים של קופיקו האגדי! אנחנו מקווים שתהנה! :monkey_face:`
  );

  let embed = new Discord.MessageEmbed()
    .setTitle(`שלום לך ${member.tag}! אני מאוד שמח שאתה בשרת The Kofiko Clab`)
    .setDescription(
      "אתה תהנה מכל רגע ואני תמיד יהיה פנוי 24/7 בכל שעה ובכל דקה (אפילו בשלוש בלילה), מקווה שתהנה ותאכל מלא בננות :banana:"
    );

  member.send(embed);
});

bot.on("guildMemberRemove", (member) => {
  let channel = member.guild.channels.cache.find(
    (ch) => ch.name === "עוזבים-הקופים-שהם-בוגדים"
  );

  if (!channel) return;

  channel.send(`לצערנו ${member} עזב את השרת. אנחנו מקווים שתחזור. :sob:`);
});

bot.on("message", (message) => {
  let args = message.content.substring(prefix.length).split(" ");

  switch (args[0]) {
    case "report":
      let user = message.mentions.users.first() || null;
      let reason = message.content.slice(bot.prefix + 22 + 7) || null;

      if (user === null) {
        return message.reply("אתה צריך @לתייג את מי שעבר על החוקים");
      } else {
        if (reason === null)
          return message.reply("בבקשה @תתיג את מי שעבר על החוקים");

        let avatar = user.displayAvatarURL();
        let channel = message.guild.channels.cache.find(
          (ch) => ch.name === "דיווחים"
        );

        if (!channel)
          return message.reply(
            "אני לא יודע לאן לישלוח את הדיווח... תכתוב לצוות שמישהו יוסיף דיווחים"
          );

        let embed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setThumbnail(avatar)
          .setTitle("דיווח חדש!")
          .setDescription(
            `המשתמש: \`${message.author.tag}\`דווח על: \`${user.tag}\`!`
          )
          .addFields(
            { name: "User Id:", value: `${message.author.id}`, inline: true },
            { name: "User Tag", value: `${message.author.tag}`, inline: true },
            { name: "Reported Id:", value: `${user.id}`, inline: true },
            { name: "Reported Tag:", value: `${user.tag}`, inline: true },
            { name: "Reason:", value: `${reason}`, inline: true }
          );

        channel.send(embed);
      }
      break;
  }
});

bot.login(process.env.token);

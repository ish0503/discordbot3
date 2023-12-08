const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("유저정보")
    .setType(ApplicationCommandType.User),
  /**
   *
   * @param {import("discord.js").UserContextMenuCommandInteraction} interaction
   */
  async execute(interaction) {
    await interaction.deferReply();
    const User = interaction.targetUser;
    let bot;
    if (User.bot == true) {
      bot = "봇입니다";
    } else {
      bot = "이 사람이 봇이겠어요?";
    }
    const embed = new EmbedBuilder()
      .setTitle(`${User.tag} 또는 ${User.globalName}님의 유저정보`)
      .setColor(User.accentColor || "Green")
      .setTimestamp()
      .setThumbnail(`${User.displayAvatarURL({ dynamic: true })}`)
      .addFields(
        { name: "아이디", value: `**${User.id}**` },
        { name: "봇 여부", value: `**${bot}**` },
        {
          name: "배지",
          value: `**${User.flags.toArray().join(", ") || "없음"}**`,
        },
        {
          name: "유저 이름",
          value: `**${User.username}#${User.discriminator}**`,
        }
      );
    interaction.editReply({ embeds: [embed] });
  },
};
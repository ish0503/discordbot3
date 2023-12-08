const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("인증")
    .setDescription("이 서버의 일원이 되보세요!"),
    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        interaction.member.roles.add("1063276919652622418")

        const embed = new EmbedBuilder()
        .setTitle(`인증이 완료되었습니다! `)
        .setDescription(`역할이 지급되었습니다. 이제 채팅방에서 채팅을 쳐보세요!`)
        .setColor(0x00FFFF)

        interaction.reply({ embeds: [embed] })
    }
}

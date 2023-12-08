const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gambling_Schema = require("../../models/Money")
const comma = require("comma-number")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("돈")
    .setDescription("이 봇은 공짜로! 당신께 돈을 줄 수 있습니다."),

    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        const gambling_find = await gambling_Schema.findOne({
            userid:interaction.user.id
        })

        if (gambling_find){
            const canGiveTime = Number(gambling_find.cooltime) + (5 * 60 * 1000)
            if (canGiveTime && canGiveTime > Date.now()){
                interaction.reply({
                    content: `**돈 못줘.\n<t:${Math.round(
                        canGiveTime / 1000
                    )}> (<t:${Math.round(canGiveTime / 1000)}:R>)**`,
                });
                return;
            }
        }

        await gambling_Schema.updateOne(
            {userid: interaction.user.id},
            {money: Number(gambling_find?.money || 0) + 5000, cooltime: Date.now()},
            {upsert:true}
        );

        const moneyvalue = Number(gambling_find?.money || 0) + 5000

        const embed = new EmbedBuilder()
            .setDescription(
                `**💰 봇이 당신께 상납하는 돈입니다. ${
                    moneyvalue.toLocaleString()
                }재화가 당신에게 있습니다.**`
            )
            .setColor("Green");
        
        interaction.reply({embeds: [embed]});
            
    }
}
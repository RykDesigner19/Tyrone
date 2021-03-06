import { MessageAttachment, MessageEmbed } from 'discord.js'
import { Weather } from '../../utils/Weather'

export const desc = 'Retorna as informações do clima de uma cidade'
export const help = 'Você pode definir a sua cidade usando ty!weather --city nome'
export const usage = '[<cidade>] | --city sua cidade'
export const aliases = ['w', 'clima']
export const cooldown = 5
export const flags = true
export async function run (msg, suffix) {
    if (!suffix && !msg.props.has('city')) {
        let city = await this.bot.database.get(`users/${msg.author.id}/city`).then(d => d.val())

        if (city)
            suffix = city.trim()
        else
            return 'wrong usage'
    }

    if (msg.props.has('city')) {
        let city = msg.props.get('city')

        this.bot.database.set(`users/${msg.author.id}/city`, city)
        return msg.send(`Sua cidade foi definida para ${city}`)
    }

    try {
        const card = await Weather.card(suffix).then(canvas => canvas.toBuffer())

        msg.send(new MessageAttachment(card, 'weather.png'))
    } catch (e) {
        msg.send(new MessageEmbed()
            .setAuthor('Clima', 'https://img.icons8.com/dusk/100/d5d5d5D5/no-rain.png')
            .setDescription(e.message)
            .setColor('RED'))
    }
}

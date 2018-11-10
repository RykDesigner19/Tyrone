export const desc = 'Responde com o ping.'
export const details = 'Usado pra ver se eu tô funcionando.\nResponde com o atraso de resposta.'
export const aliases = ['p']
export const cooldown = 2
export async function run (msg) {
    let m = await msg.send(':ping_pong: Pong!')

    m.edit(m.content + ` **${Date.now() - (msg.editedTimestamp || m.createdTimestamp)}**ms`)
}

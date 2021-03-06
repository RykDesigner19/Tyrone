import chess from 'chess'
import { Game } from './structures/Game'
import { Player } from './structures/Chess/Player'
import { Renderer } from './structures/Chess/Renderer'

export class Chess extends Game {
    constructor (opponent, scheme) {
        super()

        this.opponent = opponent
        this.game = chess.createSimple()
        this.scheme = scheme
    }

    addPlayer (member) {
        if (!this.players.has(member.id)) {
            let player = new Player(member, this)
            this.players.set(member.id, player)

            this.queue.push(player)
            return player
        } else
            return null
    }

    get status () {
        return this.game.getStatus()
    }

    next () {
        this.queue.push(this.queue.shift())
        return this.player.username
    }

    play (src, dest) {
        this.lastMove = this.game.move(src, dest, true)

        return this.lastMove
    }

    render (attacker) {
        return Renderer.render(this, attacker)
    }
}

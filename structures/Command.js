import Discord from 'discord.js';
import {Logger} from './Logger';
import config from '../config.json';

const logger = new Logger();
const getMatches = (string, regex) => {
	var matches = [];
	var match;
	while (match = regex.exec(string)) {
		matches.push([match[1], match[2]]);
	}
	return matches;
}

export class Command {
	constructor(name, prefix, cmd, bot) {
		this.name = name;
		this.prefix = prefix;
		this.bot = bot;
		this.usage = cmd.usage || '';
		this.desc = cmd.desc || 'Sem descrição';
		this.aliases = cmd.aliases || [];
		this.cooldown = cmd.cooldown || 0;
		this.hidden = cmd.hidden || false;
		this.ownerOnly = cmd.ownerOnly || false;
		this.run = cmd.run;
		this.usersOnCooldown = new Set();
	}

	get correctUsage() {
		return `${this.prefix}${this.name} ${this.usage}`;
	}

	get commandCooldown() {
		return this.cooldown > 60 ? (this.cooldown / 60) + ' minutos' : this.cooldown + ' segundos';
	}

	get helpMessage() {
		return new Discord.RichEmbed()
			.addField('Comando', `\`${this.correctUsage}\``, true)
			.addField('Descrição', this.desc)
			.addField('Cooldown', this.commandCooldown, true)
			.addField('Aliases', `${this.aliases.join(', ') || "Nenhuma"}`, true)
			.setColor('#e67e22');
	}

	async process(msg, suffix) {
		if (msg.author.bot)
			return;

		if (this.ownerOnly && msg.author.id !== this.bot.ownerId)
			return;

		let regex = /--(\w+)\s?(.+?(?=--|$))?/g;
		let flags = new Map();
		getMatches(suffix, regex).forEach(k =>
			flags.set(k[0], k[1] && k[1].trim())
		);
		suffix = suffix.replace(regex, '').trim();

		msg.flags = flags;
		
		let result;
		try {
			result = await this.run(msg, suffix);
		} catch (err) {
			logger.error(`${err}\n${err.stack}`, 'ERRO DE EXECUÇÃO DE COMANDO');
			if (config.errorMessage) {
				try {
					msg.channel.send(config.errorMessage);
				} catch (e) {} // se der erro de perm cai no nada pq eu n quero dar handle nisso
			}
		}

		if (result === 'wrong usage') {
			let m = await msg.channel.send(new Discord.RichEmbed()
				.setTitle(":interrobang: Uso incorreto")
				.setDescription(`Tente de novo:\n${this.correctUsage}`)
				.setColor('RED'));
			
			setTimeout(() => m.delete(), 3E3);
		} 
		else if (!config.adminIds.includes(msg.author.id)) {
			this.usersOnCooldown.add(msg.author.id);
			setTimeout(() => {
				this.usersOnCooldown.delete(msg.author.id);
			}, this.cooldown * 1000);
		}
	}
}
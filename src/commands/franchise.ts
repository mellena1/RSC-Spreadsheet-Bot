import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import axios from 'axios';

interface Team {
    teamID: string,
    name: string,
    franchise: string,
    tier: string,
    conference: string,
    division?: string,
}

interface FranchiseArgs {
    franName: string,
}

export default class FranchiseCommand extends Command {
    constructor() {
        super('franchise', {
            aliases: ['fran'],
            args: [
                {
                    id: 'franName',
                    type: 'string',
                    match: 'content',
                },
            ],
        });
    }

    async exec(message: Message, args: FranchiseArgs) {
        const teams = await this.getTeams(args.franName);
        if (teams.length === 0) {
            return message.channel.send('Franchise not found!');
        }
        let teamStr = `${args.franName}:\n`;
        teams.forEach((team) => { teamStr += `${team}\n` });
        return message.channel.send(teamStr);
    }

    async getTeams(franchise: string): Promise<string[]> {
        const resp = await axios.get<{teams: Team[]}>(`http://localhost:8080/team?franchise=${franchise}`);
        return resp.data.teams.map((team) => `${team.name} (${team.tier})`);
    }
}

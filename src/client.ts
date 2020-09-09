import { AkairoClient, CommandHandler } from 'discord-akairo';

export class RSCClient extends AkairoClient {
    commandHandler: CommandHandler;

    constructor() {
        super({

        }, {
            disableMentions: 'everyone',
        });

        this.commandHandler = new CommandHandler(this, {
            directory: `${__dirname}/commands/`,
            prefix: '?rsc',
        });

        this.commandHandler.loadAll();
    }
}

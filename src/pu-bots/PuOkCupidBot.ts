import { PuOkCupidModel, PuOkCupidClient, PuOkCupidMode } from "../pu-clients";
import { PuOkCupidCredentials } from "../pu-clients/pu-okcupid/SharedTypes";
import { PuBotApi } from "../pu-api";
import { Logger } from "../pu-utils";
import { puOkCupidMessages } from "../pu-static-data";

export default class PuOkCupidBot implements PuBotApi{
    public credentials: PuOkCupidCredentials;
    private logger: Logger = new Logger(PuOkCupidBot.name);
    
    constructor(credentials: PuOkCupidCredentials) {
        this.credentials = credentials;
        this.logger.log("Bot spawned!");
    }

    public run(mode:PuOkCupidMode, location?:any, iterations?:number, sleepBetwen?:number): void {
        const model = new PuOkCupidModel(mode, this.credentials)
        model.withSearchQuery(location);

        const client = new PuOkCupidClient(model);

        this.logger.warn("Bot running in " + mode + " mode!");

        switch(mode) { 
            case PuOkCupidMode.MATCH_USERS: { 
                client.login()
                    .then(() => this.likeAndMessageLoop(client));
            }  
        }; 
    };

    private async likeAndMessageLoop(client: PuOkCupidClient,iterations: number = 10, sleepBetween: number = 3000): Promise<void> {
        for(let index = 0; index < iterations; index++) {
            client.getUserIds()
            .then((userIds: Array<string>) => {
                for(let index in userIds) {
                    client.likeProfile(userIds[index])
                        .then(() => client.messageProfile(userIds[index],
                            puOkCupidMessages.random[Math.floor(Math.random() * puOkCupidMessages.random.length)]));
                }
            });
            
            this.logger.log("Sleeping between iterations for: " + sleepBetween + "ms");
            await new Promise(resolve => setTimeout(resolve, sleepBetween));
        }
    }
}
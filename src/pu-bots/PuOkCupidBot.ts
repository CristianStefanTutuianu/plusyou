import { PuOkCupidModel, PuOkCupidClient, PuOkCupidMode } from "../pu-clients";
import { PuOkCupidCredentials } from "../pu-clients/pu-okcupid/SharedTypes";
import { PuBotApi } from "../pu-api";
import { Logger } from "../pu-utils";

export default class PuOkCupidBot implements PuBotApi{
    public credentials: PuOkCupidCredentials;
    private logger: Logger = new Logger(PuOkCupidBot.name);
    
    constructor(credentials: PuOkCupidCredentials) {
        this.credentials = credentials;
        this.logger.log("Bot spawned!");
    }

    public run(mode:PuOkCupidMode, location?:any): void {
        const model = new PuOkCupidModel(mode, this.credentials)
        model.withSearchQuery(location);

        const client = new PuOkCupidClient(model);

        this.logger.warn("Bot running in " + mode + " mode!");
        switch(mode) { 
            case PuOkCupidMode.MATCH_USERS: { 
                client.login()
                    .then(() => client.getUserIds())
                    .then((userIds: Array<string>) => {
                        for(let index in userIds) {
                            client.likeProfile(userIds[index])
                                .then(() => client.messageProfile(userIds[index]));
                        }
                });
            }  
         } 
    };
}
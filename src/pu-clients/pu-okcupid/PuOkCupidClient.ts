import PuApi from "../../pu-api";
import {RequestAPI, Logger} from "../../pu-utils";
import { getOkCupidLoginForm, getOkCupidHeaders, getOkCupidOauthToken, getOkCupidUserIdListFromSearchQuery,  } from "./Utils";
import { PuOkCupidEndpoint, PuOkCupidMode } from "./SharedTypes";
import PuOkCupidModel from "./PuOkCupidModel";

class PuOkCupidClient implements PuApi {
    private puOkCupidModel: PuOkCupidModel;
    private logger: Logger = new Logger(PuOkCupidClient.name);

    public constructor(puOkCupidModel: PuOkCupidModel) {
        this.puOkCupidModel = puOkCupidModel;
        this.logger.log("Initialized client for user: " + puOkCupidModel.credentials.username);
    };

    // TODO: move to PUOKCupidBot
    public run(): void {
        switch(this.puOkCupidModel.mode) { 
            case PuOkCupidMode.MATCH_USERS: { 
                this.login()
                    .then(() => this.getUserIds())
                    .then((userIds: Array<string>) => {
                        for(let index in userIds) {
                            this.likeProfile(userIds[index])
                                .then(() => this.messageProfile(userIds[index]));
                        }
                });
            }  
         } 
    };

    public login(): Promise<any> {         
        return RequestAPI.htmlFormPostRequest(
            PuOkCupidEndpoint.LOGIN,
            getOkCupidLoginForm(this.puOkCupidModel.credentials),
            getOkCupidHeaders()
        ).then(loginResponse => {
            // Status code returned in case of invalid password + email
            if (loginResponse.status == 104) {
                throw new Error(loginResponse.status_str);
            }
            this.logger.log("Login success!")
            this.puOkCupidModel.setOauthToken(getOkCupidOauthToken(loginResponse));
        }).catch(error => {
            this.logger.error("Missing Auth token. ", error);
            this.logger.warn("User search will default to random values!");
        });
    };

    public getUserIds(): Promise<Array<string>> {
        return RequestAPI.restPostRequest(PuOkCupidEndpoint.SEARCH,
                                          this.puOkCupidModel.searchQuery || {},
                                          getOkCupidHeaders(this.puOkCupidModel.oauthToken))
                .then(response => { return getOkCupidUserIdListFromSearchQuery(response); })
                .catch((error) => { this.logger.error(error); }); 
    };

    public likeProfile(puOkCupidUserId: string): Promise<void> {
        return RequestAPI.restPostRequest(PuOkCupidEndpoint.LIKE.replace("{userid}", puOkCupidUserId), 
                                          {},
                                          getOkCupidHeaders(this.puOkCupidModel.oauthToken))
                .then(() => { this.logger.log("Liked User: " + puOkCupidUserId) })
                .catch((error) => { this.logger.error(error) });
    };

    // TODO
    public messageProfile(puOkCupidUserId: string): Promise<void> {
        return new Promise(()=> {this.logger.log("Messaged profile: " + puOkCupidUserId)})
    };

    // TODO
    public getProfilesLiked(): Promise<Array<string>> {
        return new Promise(()=> {this.logger.log("Message placeholder for getProfilesLiked")});
    };

    public getMessages(): any {};
    public unlikeProfile(): void {};
        
}

export default PuOkCupidClient;
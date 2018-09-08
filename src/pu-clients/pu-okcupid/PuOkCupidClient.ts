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

    public run(): void {
        switch(this.puOkCupidModel.mode) { 
            case PuOkCupidMode.MATCH_USERS: { 
                this.getProspectMatches();
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

    public getUsers(): Promise<any> {
        return RequestAPI.restPostRequest(PuOkCupidEndpoint.SEARCH,
                this.puOkCupidModel.searchQuery || {},
                getOkCupidHeaders(this.puOkCupidModel.oauthToken)); 
    };

    public getProfilesLiked(): any {};
    public getMessages(): any {};
    public unlikeProfile(): void {};

    public likeProfile(puOkCupidUserId: string): Promise<any> {
        console.log(getOkCupidHeaders(this.puOkCupidModel.oauthToken));
        console.log(PuOkCupidEndpoint.LIKE.replace("{userid}", puOkCupidUserId));
        return RequestAPI.restPostRequest(PuOkCupidEndpoint.LIKE.replace("{userid}", puOkCupidUserId), 
            {},
            getOkCupidHeaders(this.puOkCupidModel.oauthToken))
        .then(() => {
                this.logger.warn("A mers sa moara ma-sa");
        }).catch((error) => {
                this.logger.warn(error);  
        });
    };

    public messageProfile(): void {};

    private getProspectMatches(): Promise<any> {
        return this.login()
            .then(() => { 
                return this.getUsers()} )
            .then((prospectMatches) => {
                // TODO: implement pagination
                return getOkCupidUserIdListFromSearchQuery(prospectMatches);
            }).then((puOkCupidUserIds) => {
                for(let index in puOkCupidUserIds) {
                    this.logger.log("Trying to like " + puOkCupidUserIds[index]);
                    this.likeProfile(puOkCupidUserIds[index]);

                }
            });
    }
}

export default PuOkCupidClient;
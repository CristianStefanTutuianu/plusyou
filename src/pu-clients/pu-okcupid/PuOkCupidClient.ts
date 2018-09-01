import PuApi from "../../pu-api";
import {RequestAPI} from "../../pu-utils";

import { getOkCupidLoginForm, getOkCupidHeaders, getOkCupidOauthToken, getOkCupidMatchesFromSearchQuery } from "./Utils";
import { PuOkCupidEndpoint, PuOkCupidMode } from "./SharedTypes";
import PuOkCupidModel from "./PuOkCupidModel";

class PuOkCupidClient implements PuApi {
    private puOkCupidModel: PuOkCupidModel;

    public constructor(puOkCupidModel: PuOkCupidModel) {
        this.puOkCupidModel = puOkCupidModel;
        console.log("PuOkCupid initialized for user:" + puOkCupidModel.credentials.username);
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
            this.puOkCupidModel.setOauthToken(getOkCupidOauthToken(loginResponse));
        }).catch(error => {
            return new Promise(()=> {
                throw new Error("Missing Auth token" + JSON.stringify(error));
            });
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
    public likeProfile(): void {};
    public messageProfile(): void {};

    private getProspectMatches(): Promise<any> {
        return this.login()
            .then(() => { return this.getUsers()} )
            .then((prospectMatches) => {
                const parsedMatches = getOkCupidMatchesFromSearchQuery(prospectMatches);
                console.log(parsedMatches);
            });
    }
}

export default PuOkCupidClient;
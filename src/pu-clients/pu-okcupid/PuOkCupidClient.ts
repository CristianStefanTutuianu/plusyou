import PuApi from "../../pu-api";
import {RequestAPI} from "../../pu-utils";

import { getOkCupidLoginForm, getOkCupidHeaders, getOkCupidOauthToken, getOkCupidSearchQuery, getOkCupidMatchesFromSearchQuery } from "./Utils";
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
        });
    };

    public getUsers(): Promise<any> {
        let promise: Promise<any>;

        if (this.puOkCupidModel.oauthToken) {
            promise =  RequestAPI.restPostRequest(PuOkCupidEndpoint.SEARCH,
                getOkCupidSearchQuery(this.puOkCupidModel.searchQuery),
                getOkCupidHeaders(this.puOkCupidModel.oauthToken)); 
        } else {
            promise = new Promise(()=> {
                throw new Error("Missing Auth token");
            });
        }

        return promise;
    };

    public getProfilesLiked(): any {};
    public getMessages(): any {};

    public unlikeProfile(): void {};
    public likeProfile(): void {};
    public messageProfile(): void {};

    private getProspectMatches(): Promise<any> {
        return this.login()
            .then(() => this.getUsers())
            .then((prospectMatches) => {
                const parsedMatches = getOkCupidMatchesFromSearchQuery(prospectMatches);
                console.log(parsedMatches);
            });
    }
}

export default PuOkCupidClient;
import PuApi from "../../pu-api";
import {RequestAPI} from "../../pu-utils";

import { getOkCupidLoginForm, getOkCupidHeaders, getOkCupidOauthToken, getOkCupidSearchQuery, getOkCupidMatchesFromSearchQuery } from "./Utils";
import { PuOkCupidEndpoint, PuOkCupidMode } from "./SharedTypes";
import PuOkCupidModel from "./PuOkCupidModel";

class PuOkCupidClient implements PuApi {
    private puOkCupidModel: PuOkCupidModel;
    private oauthToken: string | undefined;

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
        return RequestAPI.makeHTMLFormPostRequest(
            PuOkCupidEndpoint.LOGIN,
            getOkCupidLoginForm(this.puOkCupidModel.credentials),
            getOkCupidHeaders()
        );
    };

    // TO-DO: port these
    public getUsers(): Promise<any> {
        // uses body instead of form where body is the query
        return RequestAPI.makeRESTPostRequest(
            PuOkCupidEndpoint.SEARCH,
            getOkCupidSearchQuery(this.puOkCupidModel.searchQuery),
            getOkCupidHeaders(this.oauthToken)
        )
    };

    public getProfilesLiked(): any {};
    public getMessages(): any {};

    public unlikeProfile(): void {};
    public likeProfile(): void {};
    public messageProfile(): void {};

    private getProspectMatches(): Promise<any> {
        return this.login()
            .then((responseBody) => {
                this.oauthToken = getOkCupidOauthToken(responseBody)
                return this.getUsers();
            })
            .then((prospectMatches) => {
                const parsedMatches = getOkCupidMatchesFromSearchQuery(prospectMatches);
                console.log(parsedMatches);
            });
    }
}

export default PuOkCupidClient;
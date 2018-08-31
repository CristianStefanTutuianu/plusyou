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
        if (this.puOkCupidModel.mode = PuOkCupidMode.MATCH_USERS) {
            this.login()
            .then((responseBody) => getOkCupidOauthToken(responseBody))
            .then((oauthToken) => {
                this.oauthToken = oauthToken;
                return this.getPossibleMatches();
            })
            .then((prospectMatches) => getOkCupidMatchesFromSearchQuery(prospectMatches))
            .then((parsedProspectMatches) => {
                console.log(parsedProspectMatches);
            });
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
    public getPossibleMatches(): any {
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
}

export default PuOkCupidClient;
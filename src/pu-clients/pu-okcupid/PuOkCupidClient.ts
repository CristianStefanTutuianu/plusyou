import PuApi from "../../pu-api";
import {RequestAPI} from "../../pu-utils";

import { getOkCupidLoginForm, getOkCupidHeaders, getOkCupidOauthToken } from "./Utils";
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
        // TODO handle puOkCupidModel.mode
        if (this.puOkCupidModel.mode = PuOkCupidMode.MATCH_USERS) {
            this.login()
            .then((responseBody) => getOkCupidOauthToken(responseBody))
            .then((oauthToken) => {
                this.oauthToken = oauthToken;
                console.log(oauthToken);
            });
        }

    };

    public login(): Promise<any> {         
        return RequestAPI.makeWebPostRequest(
            PuOkCupidEndpoint.LOGIN,
            getOkCupidLoginForm(this.puOkCupidModel.credentials),
            getOkCupidHeaders()
        );
    };

    // TO-DO: port these
    public getPossibleMatches(query: any): any {
        // uses body instead of form where body is the query
        return RequestAPI.makeWebPostRequest(
            PuOkCupidEndpoint.SEARCH,
            query,
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
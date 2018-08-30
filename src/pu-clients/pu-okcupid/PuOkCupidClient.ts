import PuApi from "../../pu-api";
import {RequestAPI} from "../../pu-utils";

import { getOkCupidLoginForm, getOkCupidHeaders, getOkCupidOauthToken } from "./Utils";
import { OkCupidEndpoint, OkCupidCredentials } from "./SharedTypes";

class PuOkCupidClient implements PuApi {
    private user: OkCupidCredentials;

    public constructor(user: OkCupidCredentials) {
        this.user = user;
        console.log("PuOkCupid initialized!");
    };

    public run(): void {
        this.login()
            .then((responseBody) => getOkCupidOauthToken(responseBody))
            .then((oauth_token) => {
                console.log(oauth_token);
            });
    };

    public login(): Promise<any> {         
        return RequestAPI.makeWebPostRequest(
            OkCupidEndpoint.LOGIN,
            getOkCupidLoginForm(this.user),
            getOkCupidHeaders()
        );
    };

    // TO-DO: port these
    public getProfilesLiked(): any {};
    public getPossibleMatches(): any {};
    public getMessages(): any {};

    public unlikeProfile(): void {};
    public likeProfile(): void {};
    public messageProfile(): void {};
}

export default PuOkCupidClient;
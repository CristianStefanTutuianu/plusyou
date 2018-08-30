import PuApi from "../../pu-api";
import testCredentials from "../../pu-static-data";
import {requestAPI} from "../../pu-utils";

import { getOkCupidHeaders } from "./Utils";
import { OkCupidEndpoint } from "./SharedTypes";

/*
* Singleton class - OkCupid client
*/
class PuOkCupid implements PuApi {
    private static puOkCupidClientInstance:PuOkCupid;

    public static getInstance() {
        if(!PuOkCupid.puOkCupidClientInstance) {
            PuOkCupid.puOkCupidClientInstance = new PuOkCupid();
        }

        return PuOkCupid.puOkCupidClientInstance;
    }

    public oauthToken: string | undefined;

    private constructor() {
        console.log("PuOkCupid initialized!");
    };

    public run(): void {
        this.login(testCredentials.mock_user.username, testCredentials.mock_user.password)
            .then((body:any)  => {
                this.oauthToken = JSON.parse(body).oauth_accesstoken;
                console.log(this.oauthToken);

                // Subsequent PuOkCupidClient method calls go here;

            }).catch((err:any)=>{
                console.log("PuOkCupidClient login error" + JSON.parse(err));
            });
    };

    public login(username: string, password: string): Promise<any> {
        // TODO: formalize this inside request API
        const loginForm = {
            okc_api: 1,
            username: username,
            password: password,
        };

        const options = {
            method: 'POST',
            uri: OkCupidEndpoint.LOGIN,
            form: loginForm,
            headers: getOkCupidHeaders()
        };
         
        return requestAPI(options);
    };

    public getProfilesLiked(): any {};
    public getPossibleMatches(): any {};
    public getMessages(): any {};

    public unlikeProfile(): void {};
    public likeProfile(): void {};
    public messageProfile(): void {};
}

const puOkCupidClient = PuOkCupid.getInstance();

export default puOkCupidClient;
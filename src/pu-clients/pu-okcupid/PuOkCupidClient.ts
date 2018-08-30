import PuApi from "../../pu-api";
import { RequestAPI } from "../../pu-utils";

/*
* Singleton class - OkCupid client
*/
class PuOkCupid implements PuApi {
    private static puOkCupidClientInstance:PuOkCupid;

    public static getInstance() {
        if(!PuOkCupid.puOkCupidClientInstance) {
            PuOkCupid.puOkCupidClientInstance = new PuOkCupid(new RequestAPI());
        }

        return PuOkCupid.puOkCupidClientInstance;
    }

    public oauthToken: string | undefined;
    public requestAPI: RequestAPI;
    public hasAuthToken: boolean = false;

    private constructor(requestAPI: RequestAPI) {
        this.requestAPI = requestAPI;
        console.log("PuOkCupid initialized!");
    };

    public run(): void {
        this.login();
    };

    public login(): void {
        //TO-DO set it in the callback - when it becomes available
        this.oauthToken = "mockAuthToken";
        this.hasAuthToken = true;
        console.log("PuOkCupid login successful");
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

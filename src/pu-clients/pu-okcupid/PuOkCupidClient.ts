import {PuClientApi} from "../../pu-api";
import {RequestAPI, Logger} from "../../pu-utils";
import { getOkCupidLoginForm, getOkCupidHeaders, getOkCupidOauthToken, getOkCupidUserIdListFromSearchQuery,  } from "./Utils";
import { PuOkCupidEndpoint } from "./SharedTypes";
import PuOkCupidModel from "./PuOkCupidModel";

class PuOkCupidClient implements PuClientApi {
    private puOkCupidModel: PuOkCupidModel;
    private logger: Logger = new Logger(PuOkCupidClient.name);

    public constructor(puOkCupidModel: PuOkCupidModel) {
        this.puOkCupidModel = puOkCupidModel;
        this.logger.log("Initialized client for user: " + puOkCupidModel.credentials.username);
    };

    public login(): Promise<void> {         
        return RequestAPI.htmlFormPostRequest(
            PuOkCupidEndpoint.LOGIN,
            getOkCupidLoginForm(this.puOkCupidModel.credentials),
            getOkCupidHeaders()
        ).then(loginResponse => {
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

    public messageProfile(puOkCupidUserId: string, message: string): Promise<void> {
        const payload = {
            body: message,
            receiverid: puOkCupidUserId
        };

        return RequestAPI.restPostRequest(PuOkCupidEndpoint.SEND_MESSAGE, payload, getOkCupidHeaders(this.puOkCupidModel.oauthToken))
                         .then(() => { this.logger.log("Messaged user: " + puOkCupidUserId + " with " + message); })
                         .catch((error) => { this.logger.error(error) });
    };

    // TODO - there is a bug in retrieving paginated results - right endpoint gets called - wrong results
    public getProfilesLiked(query:any = {}, userIds: Array<string> = []): Promise<any> {
        let queryStrings = [];

        for(let key in query) {
            if(query.hasOwnProperty(key)) {
                queryStrings.push(key + "=" + query[key]);
            }
        }

        const queryString: string = queryStrings.join("&");
        let url: string =  PuOkCupidEndpoint.CONNECTIONS;

        if(queryString) {
            url += "?" + queryString;
        }

        this.logger.warn(url);

        return RequestAPI.getRequest(url, getOkCupidHeaders(this.puOkCupidModel.oauthToken)).then((results: any) => {
            const userData: Array<any> = results.data;
            
            if(userData) {
                userData.forEach(data => {
                    userIds.push(data.user.userid);
                });
            }

            // Pagination
            const totalCount: number = results.paging.total;
            const after: string = results.paging.cursors.after;
            const before: string = results.paging.cursors.before;
            if(after != null && userIds.length < totalCount) {
                if (query.after!= after ) {
                    query = {
                        "after": after
                    }
                } else {
                    query = {
                        "before": before
                    }
                }
                return this.getProfilesLiked(query, userIds);
            } else {
                this.logger.log("Finished paginating :: getProfilesLiked");
                this.logger.log(JSON.stringify(userIds));
                return Promise.resolve(userIds);
            }
        });
    };

    public getMessages(): any {};
    public unlikeProfile(): void {};
        
}

export default PuOkCupidClient;
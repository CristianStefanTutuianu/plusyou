import { PuOkCupidMode, PuOkCupidCredentials } from "./SharedTypes";

/**
 * Simple POJO used in PuOKCupidCLient
 */
export default class PuOkCupidModel {
    public mode: PuOkCupidMode;
    public credentials: PuOkCupidCredentials;
    public searchQuery: JSON | undefined;
    public quickSearchQuery: any;

    public constructor(mode: PuOkCupidMode,
                    credentials: PuOkCupidCredentials) {
        this.mode = mode;
        this.credentials = credentials;
    }

    public withSearchQuery(searchQuery: JSON) {
        this.searchQuery = searchQuery;
    }
}
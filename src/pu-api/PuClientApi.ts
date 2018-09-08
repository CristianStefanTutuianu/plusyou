export default interface PuClientApi {    
    login(): any | Promise<any>;

    getProfilesLiked(): any | Promise<any>;
    getUserIds(query: any): any | Promise<any>; // search
    getMessages(): any | Promise<any>;

    unlikeProfile(): any | Promise<any>;
    likeProfile(userid: number | string): any | Promise<any>;
    messageProfile(userid: number | string): any | Promise<any>;

}

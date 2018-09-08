export default interface PuApi {    
    login(): any | Promise<any>;

    getProfilesLiked(): any | Promise<any>;
    getUsers(query: any): any | Promise<any>; // search
    getMessages(): any | Promise<any>;

    unlikeProfile(): any | Promise<any>;
    likeProfile(userid: number | string): any | Promise<any>;
    messageProfile(): any | Promise<any>;

    run(mode?:any): any | Promise<any>;
}

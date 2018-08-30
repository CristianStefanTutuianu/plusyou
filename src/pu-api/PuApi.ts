export default interface PuApi {    
    login(username:string, password:string): any | Promise<any>;

    getProfilesLiked(): any | Promise<any>;
    getPossibleMatches(): any | Promise<any>;
    getMessages(): any | Promise<any>;

    unlikeProfile(): any | Promise<any>;
    likeProfile(): any | Promise<any>;
    messageProfile(): any | Promise<any>;

    run(mode?:any): any | Promise<any>;
}

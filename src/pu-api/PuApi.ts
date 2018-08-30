export default interface PuApi {    
    login(): void | Promise<void>;

    getProfilesLiked(): any | Promise<any>;
    getPossibleMatches(): any | Promise<any>;
    getMessages(): any | Promise<any>;

    unlikeProfile(): void | Promise<void>;
    likeProfile(): void | Promise<void>;
    messageProfile(): void | Promise<void>;

    run(mode?:any): void | any | Promise<void | any>;
}

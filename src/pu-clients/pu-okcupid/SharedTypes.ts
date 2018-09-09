enum PuOkCupidEndpoint {
    //Non-OAuth
    LOGIN =  "https://www.okcupid.com/login",
    RATE = "http://www.okcupid.com/quickmatch",
    VISIT_PROFILE = "http://www.okcupid.com/profile/{username}?okc_api=1",
    QUICKMATCH = "http://www.okcupid.com/quickmatch?okc_api=1", 
    GET_PROFILE_QUESTIONS = "http://www.okcupid.com/profile/{username}/questions?okc_api=1&low={low}",
    GET_VISITORS = "http://www.okcupid.com/visitors?okc_api=1",
    GET_THREAD = "https://www.okcupid.com/messages?okc_api=1&readmsg=true&threadid={thread_id}",

    // OAuth API
    GET_MESSAGES = "https://www.okcupid.com/messages?okc_api=1",
    SEND_MESSAGE = "https://www.okcupid.com/1/apitun/messages/send",
    LIKE = "https://www.okcupid.com/1/apitun/profile/{userid}/like",
    UNLIKE = "https://www.okcupid.com/1/apitun/profile/{userid}/unlike",
    SEARCH = "https://www.okcupid.com/1/apitun/match/search",
    EDIT_PROFILE = "https://www.okcupid.com/1/apitun/profile/edit/{editCategory}",
    CONNECTIONS = "https://www.okcupid.com/1/apitun/connections/outgoing",
}

type PuOkCupidCredentials = {
    username: string,
    password: string
}

enum PuOkCupidMode {
    DOWNLOAD_PROFILES="DOWNLOAD PROFILES",
    MATCH_USERS="MATCH AND MESSAGE"
}

type PuOkCupidShortUserProfile = {
    online: boolean,
    userinfo: any,
    last_login: number,
    inactive: boolean,
    userid: string,
    username: string,
    staff: boolean,
    thumbs: Array<any>,
    isAdmin: boolean
}

type PuOkCupidSearchUserProfileModel = {
    total_matches: string,
    data: Array<PuOkCupidShortUserProfile>,
    paging: {
        cursors: {
            before: string,
            current: string,
            after: string
        }
    }
}

export {
    PuOkCupidCredentials,
    PuOkCupidSearchUserProfileModel,
    PuOkCupidEndpoint,
    PuOkCupidMode
}

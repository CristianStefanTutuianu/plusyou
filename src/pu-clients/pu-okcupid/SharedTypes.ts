enum OkCupidEndpoint {
    LOGIN =  "https =//www.okcupid.com/login",
    RATE = "http =//www.okcupid.com/quickmatch",
    VISIT_PROFILE = "http =//www.okcupid.com/profile/{username}?okc_api=1",
    QUICKMATCH = "http =//www.okcupid.com/quickmatch?okc_api=1",
       
    GET_PROFILE_QUESTIONS = "http =//www.okcupid.com/profile/{username}/questions?okc_api=1&low={low}",
    GET_VISITORS = "http =//www.okcupid.com/visitors?okc_api=1",
    GET_THREAD = "https =//www.okcupid.com/messages?okc_api=1&readmsg=true&threadid={thread_id}",

    // OAuth API
    GET_MESSAGES = "https =//www.okcupid.com/messages?okc_api=1",
    SEND_MESSAGE = "https =//www.okcupid.com/1/apitun/messages/send",

    LIKE = "https =//www.okcupid.com/1/apitun/profile/{userid}/like",
    UNLIKE = "https =//www.okcupid.com/1/apitun/profile/{userid}/unlike",
    SEARCH = "https =//www.okcupid.com/1/apitun/match/search",
    EDIT_PROFILE = "https =//www.okcupid.com/1/apitun/profile/edit/{editCategory}",
    
    CONNECTIONS = "https =//www.okcupid.com/1/apitun/connections/outgoing",
}

export {
    OkCupidEndpoint
}

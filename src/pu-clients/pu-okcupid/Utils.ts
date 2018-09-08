import { PuOkCupidCredentials, PuOkCupidSearchUserProfileModel } from "./SharedTypes";

function getOkCupidLoginForm(user: PuOkCupidCredentials) {
  return {
    okc_api: 1,
    username: user.username,
    password: user.password,
  };
}

function getOkCupidOauthToken(responseBody: any) {
  return responseBody.oauth_accesstoken;
}

function getOkCupidHeaders(oauthToken?: string) {
  if (oauthToken) {
    return {
        'x-okcupid-platform':'DESKTOP',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
        'authorization' : 'Bearer ' + oauthToken
      }
  }
  else {
    return {
      'x-okcupid-platform':'DESKTOP',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
    }
  }
}

function getOkCupidUserIdListFromSearchQuery(matches: PuOkCupidSearchUserProfileModel): any {
  const usersList: any = matches.data;
  let userIds: Array<string> = [];

  for(let index in usersList) {
    userIds.push(usersList[index].userid)
  }

  return userIds;
}

export {
  getOkCupidLoginForm,
  getOkCupidHeaders,
  getOkCupidUserIdListFromSearchQuery,
  getOkCupidOauthToken,
}

import { OkCupidCredentials } from "./SharedTypes";

function getOkCupidLoginForm(user: OkCupidCredentials) {
  return {
    okc_api: 1,
    username: user.username,
    password: user.password,
  };
}

function getOkCupidOauthToken(responseBody: any) {
  return responseBody.oauth_accesstoken;
}

function getOkCupidHeaders(oauth_token ?: string) {
  if (oauth_token) {
    return {
        'x-okcupid-platform':'DESKTOP',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
        'authorization' : 'Bearer ' + oauth_token
      }
  }
  else {
    return {
      'x-okcupid-platform':'DESKTOP',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
    }
  }
}

export {
  getOkCupidLoginForm,
  getOkCupidHeaders,
  getOkCupidOauthToken
}

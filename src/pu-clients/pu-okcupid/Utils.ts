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
  getOkCupidHeaders
}

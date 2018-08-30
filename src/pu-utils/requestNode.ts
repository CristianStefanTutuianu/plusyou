let requestModule = require('request');

const cookie_jar = requestModule.jar()
const requestInstance = requestModule.defaults({
    jar: cookie_jar,
    strictSSL: false
})

export default requestInstance;

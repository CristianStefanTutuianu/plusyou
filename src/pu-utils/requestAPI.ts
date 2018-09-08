// DOCS: https://www.npmjs.com/package/request-promise
let requestAPI = require('request-promise');
let cookie_jar = requestAPI.jar();
requestAPI = requestAPI.defaults({jar: cookie_jar, strictSSL: false})

class RequestAPI {
    public static htmlFormPostRequest(uri: string, form?: any, headers?: any): Promise<any> {
        const options = {
            method: 'POST',
            uri: uri,
            form: form,
            headers: headers,
            json: true
        }

        return requestAPI(options, ()=> {});
    }

    public static restPostRequest(uri: string, body?: any, headers?: any): Promise<any> {
        const options = {
            method: 'POST',
            url: uri,
            body: body,
            headers: headers,
            json: true
        }

        return requestAPI(options);
    }

    //TODO
    public static getRequest() {
        return Promise.resolve(console.log("makeGetRequest"));
    }
}

    
export default RequestAPI;

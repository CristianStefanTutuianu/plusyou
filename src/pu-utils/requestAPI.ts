// Usage: https://www.npmjs.com/package/request-promise
let requestAPI = require('request-promise');

class RequestAPI {
    public static makeWebPostRequest(uri: string, form?: any, headers?: any): Promise<any> {
        const options = {
            method: 'POST',
            uri: uri,
            form: form,
            headers: headers,
            json: true
        }

        return requestAPI(options);
    }

    //TODO
    public static makeWebGetRequest() {
        return Promise.resolve(console.log("makeWebGetRequest"));
    }
}

    
export default RequestAPI;

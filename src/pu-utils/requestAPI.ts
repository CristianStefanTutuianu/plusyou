// DOCS: https://www.npmjs.com/package/request-promise
let requestAPI = require('request-promise');

class RequestAPI {
    public static makeHTMLFormPostRequest(uri: string, form?: any, headers?: any): Promise<any> {
        const options = {
            method: 'POST',
            uri: uri,
            form: form,
            headers: headers,
            json: true
        }

        return requestAPI(options);
    }

    public static makeRESTPostRequest(uri: string, body?: JSON, headers?: any): Promise<any> {
        const options = {
            method: 'POST',
            uri: uri,
            body: body,
            headers: headers,
            json: true
        }

        return requestAPI(options);
    }

    //TODO
    public static makeGetRequest() {
        return Promise.resolve(console.log("makeGetRequest"));
    }

    //TODO: implement more use cases as described in DOCS
}

    
export default RequestAPI;

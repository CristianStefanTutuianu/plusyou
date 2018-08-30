import requestInstance from "./requestNode";

enum RequestMethod {
    POST = "POST",
    GET = "GET"
}

class RequestAPI {
    public set headers(headers: any) {
        this.headers = headers;
    };

    public get headers() {
        return this.headers;
    }

    public getInstance() {
        return new RequestAPI();
    }

    public post(endpoint: string, data: any, callback: any) {
        const requestPayload = {
            method: RequestMethod.POST,
            url: endpoint,
            form: data,
            headers: this.headers,
            json: true
        }

        requestInstance(requestPayload, callback);
    }

    public get(endpoint: string, callback: any) {
        const requestPayload = {
            method: RequestMethod.GET,
            url: endpoint,
            headers: this.headers,
            json: true
        }
        requestInstance(requestPayload, callback);
    }
}

function buildQueryString(query: any) {
    const queryStrings = [];

    for (let key in query) {
        if (query.hasOwnProperty(key)) {
            queryStrings.push(key + '=' + query[key])
        }
    }

    return queryStrings.length === 0 ? '' : '?' + queryStrings.join("&");
}

export {
    RequestMethod,
    RequestAPI,
    buildQueryString
}

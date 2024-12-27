
export const callFetch = (endpoint: string, method: string, json: string) => {
    let myHeadersNoAuth = {

        "Content-Type" : "application/json",
        "Accept" : "application/json",

        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
    };
    


    let myInit = {method: method, headers: myHeadersNoAuth};

    let myInitWithBody = {method: method, headers: myHeadersNoAuth, body: json};

    if (json) {
        return fetch (endpoint, myInitWithBody);
    }

    return (fetch (endpoint, myInit));
    
};
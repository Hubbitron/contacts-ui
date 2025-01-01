export const callFetch = (endpoint: string, method: string, json: string) => {
    const jwt = sessionStorage.getItem("jwt");
    let headerJwt = "Bearer " + jwt;
    const serverName: string = process.env.REACT_APP_API_DOMAIN + "/" + process.env.REACT_APP_API_CONTEXT_PATH + "/" + process.env.REACT_APP_API_PATH;

    const myHeaders = {
      "Content-Type" : "application/json",
      "Accept" : "application/json",
  
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Authorization': headerJwt,
    };

    const myHeadersNoAuth = {       
      "Content-Type" : "application/json",
      "Accept" : "application/json",

      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
    };
    
    const finalEndpoint = serverName + endpoint;
    
    let myInit = {
      method: method,
      headers: jwt ? myHeaders : myHeadersNoAuth
    };

    let myInitWithBody = {
      method: method,
      headers: jwt ? myHeaders : myHeadersNoAuth,
      body: json
    };

    if (json) {
        return fetch(finalEndpoint, myInitWithBody);
    }

    return fetch(finalEndpoint, myInit);
};

export const callFetchFile = (endpoint: string, method: string, json: string) => {
    const jwt = sessionStorage.getItem("jwt");
    let headerJwt = "Bearer " + jwt;
    const serverName: string = process.env.REACT_APP_API_DOMAIN + "/" + process.env.REACT_APP_API_CONTEXT_PATH + "/" + process.env.REACT_APP_API_PATH;
    let myHeaders = {       
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        "responseType": "blob",
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Authorization': headerJwt
    };
    
    // myHeadersNoAuth.responseType = "blob";

    const finalEndpoint = serverName + endpoint;

    let myInit = {method: method, headers: myHeaders};

    let myInitWithBody = {method: method, headers: myHeaders, body: json};

    

    if (json) {
        return fetch (finalEndpoint, myInitWithBody);
    }

    return (fetch (finalEndpoint, myInit));

};

export const callFetchMultipart = (endpoint: string, method: string, data: any) => {
    const jwt = sessionStorage.getItem("jwt");
    let headerJwt = "Bearer " + jwt;
    const serverName: string = process.env.REACT_APP_API_DOMAIN + "/" + process.env.REACT_APP_API_CONTEXT_PATH + "/" + process.env.REACT_APP_API_PATH;
    let myHeaders = {       
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Authorization': headerJwt
    };
    
    // myHeadersNoAuth.responseType = "blob";

    const finalEndpoint = serverName + endpoint;

    let myInit = {method: method, headers: myHeaders};

    let myInitWithBody = {method: method, headers: myHeaders, body: data};

    

    if (data) {
        return fetch (finalEndpoint, myInitWithBody);
    }

    return (fetch (finalEndpoint, myInit));

};
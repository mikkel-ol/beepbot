let callbackUrl;
let redirectUrl;
let port;

switch (process.env.NODE_ENV) {
    case "production":
        callbackUrl = "http://beepbot.dk/auth/callback";
        redirectUrl = "/";
        port = 443;
        break;
    
    case "dev":
        callbackUrl = "http://localhost/auth/callback";
        redirectUrl = "http://localhost:8080/";
        port = 80;
        break;
    
    default:
        callbackUrl = undefined;
        break;
}

module.exports = {
    port: port,
    url: {
        callback: callbackUrl,
        redirect: redirectUrl
    }
}
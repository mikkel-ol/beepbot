let callbackUrl;
let redirectUrl;

switch (process.env.NODE_ENV) {
    case "production":
        callbackUrl = "http://beepbot.dk/auth/callback";
        redirectUrl = "/";
        break;
    
    case "dev":
        callbackUrl = "http://localhost/auth/callback";
        redirectUrl = "http://localhost:8080/";
        break;
    
    default:
        callbackUrl = undefined;
        break;
}

module.exports = {
    port: 80,
    url: {
        callback: callbackUrl,
        redirect: redirectUrl
    }
}
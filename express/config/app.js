let callbackUrl;
let redirectUrl;
let port;

switch (process.env.NODE_ENV) {
    case "production":
        callbackUrl = "https://beepbot.dk/auth/callback";
        redirectUrl = "/";
        port = 8443;
        break;
    
    case "dev":
        callbackUrl = "http://localhost:8080/auth/callback";
        redirectUrl = "http://localhost:8080/";
        port = 8080;
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
    },
    cert: {
        privatekey: "/etc/letsencrypt/live/beepbot.dk/privkey.pem",
        certificate: "/etc/letsencrypt/live/beepbot.dk/cert.pem",
        authority: "/etc/letsencrypt/live/beepbot.dk/chain.pem"
    }
}
let callbackUrl;

switch (process.env.NODE_ENV) {
    case "production":
        callbackUrl = "http://beepbot.dk/auth/callback"
        break;
    
    case "dev":
        callbackUrl = "http://localhost/auth/callback"
        break;
    
    default:
        callbackUrl = undefined;
        break;
}

module.exports = {
    port: 80,
    url: {
        callback: callbackUrl
    }
}
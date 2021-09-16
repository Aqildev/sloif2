// export var OidcSettings = {    
//     authority:"https://demo.sloif.dk/oidc/.well-known/openid-configuration",// "https://" + "demo.sloif.dk" + "/oidc/auth",
//     redirect_uri: window.location.origin,
//     client_id:'appication',

// };
export var OidcSettings = {    
    authority:"https://demo.sloif.dk/oidc",// "https://" + "demo.sloif.dk" + "/oidc/auth",
    redirect_uri: window.location.origin,
    client_id:'app',
    response_types: 'code',
    scope: 'openid',
    post_logout_redirect_uri: 'https://demo.sloif.dk/oidc/session/end'
};


"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginProvider = void 0;
const url_1 = __importDefault(require("url"));
const SAMLStrategy = __importStar(require("passport-saml"));
const passport_1 = __importDefault(require("passport"));
const Config_1 = require("./Config");
const body_parser_1 = __importDefault(require("body-parser"));
class LoginProvider {
    static isLoggedIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.isAuthenticated())
                return next();
            if (req.originalUrl !== '/jwt') {
                res.cookie('originalUrl2', req.originalUrl, { maxAge: 900000, httpOnly: true });
            }
            res.redirect('/saml');
        });
    }
    static configure(logger, app, baseurl) {
        return __awaiter(this, void 0, void 0, function* () {
            this._logger = logger;
            app.use(passport_1.default.initialize());
            app.use(passport_1.default.session());
            // tslint:disable-next-line:no-any
            passport_1.default.serializeUser((user, done) => __awaiter(this, void 0, void 0, function* () { return done(null, user); }));
            // tslint:disable-next-line:no-any
            passport_1.default.deserializeUser((user, done) => done(null, user));
            app.get('/logout', (req, res, next) => {
                try {
                    this.samlStrategy.logout(
                    // tslint:disable-next-line:no-any
                    req, (err, requestUrl) => {
                        // LOCAL logout
                        req.logout();
                        // redirect to the IdP with the encrypted SAML logout request
                        res.redirect(requestUrl);
                    });
                }
                catch (error) {
                    req.logout();
                    res.redirect('/');
                }
            });
            yield LoginProvider.RegisterProviders(app, baseurl);
            app.get('/config', (req, res, next) => {
                const baseurl = Config_1.Config.SAML_FEDERATION_METADATA;
                let _wsurl = '';
                let _loginurl = '';
                const _url = Config_1.Config.baseurl();
                if (url_1.default.parse(baseurl).protocol === 'http:') {
                    _wsurl = 'ws://' + url_1.default.parse(baseurl).host;
                    _loginurl = 'http://' + url_1.default.parse(baseurl).host;
                }
                else {
                    _wsurl = 'wss://' + url_1.default.parse(baseurl).host;
                    _loginurl = 'https://' + url_1.default.parse(baseurl).host;
                }
                _wsurl += '/';
                const res2 = {
                    wsurl: _wsurl,
                    loginurl: _loginurl,
                    wshost: _wsurl,
                    url: _url,
                    version: Config_1.Config.VERSION,
                };
                res.end(JSON.stringify(res2));
            });
            app.get('/jwt', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const up = url_1.default.parse(Config_1.Config.SAML_FEDERATION_METADATA);
                    // @ts-ignore
                    const res2 = { rawAssertion: req.user.token2 };
                    console.log(res2.rawAssertion);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(res2));
                }
                catch (error) {
                    res.setHeader('Content-Type', 'application/json');
                    if (error.message) {
                        res.end(JSON.stringify({ error: error.message, jwt: null, rawAssertion: null }));
                    }
                    else {
                        res.end(JSON.stringify({ error, jwt: null, rawAssertion: null }));
                    }
                }
            }));
            app.get('/failimpersonate', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                if (req.isAuthenticated()) {
                    res.send('<html><head></head><body><h1>Impersonation failed</h1>Efterligning mislykkedes<br><p><a href=\'/logout\'>Log ind igen</a></p></body></html>');
                }
                else {
                    res.redirect('/');
                }
            }));
        });
    }
    static RegisterProviders(app, baseurl) {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = yield Config_1.Config.parseFederationMetadata(Config_1.Config.SAML_FEDERATION_METADATA);
            console.log(metadata);
            this.samlStrategy = LoginProvider.CreateSAMLStrategy(app, 'saml', 
            // TODO: understand what should be there
            metadata.cert.toString(), 
            // @ts-ignore
            metadata.identityProviderUrl, Config_1.Config.SAML_ISSUER, baseurl);
            console.log("*******************************************/n", this.samlStrategy);
        });
    }
    static CreateSAMLStrategy(app, key, cert, singinUrl, issuer, baseurl) {
        const options = {
            entryPoint: singinUrl,
            cert,
            issuer,
            acceptedClockSkewMs: 5000,
            callbackUrl: url_1.default.parse(baseurl).protocol + '//' + url_1.default.parse(baseurl).host + '/' + key + '/',
            logoutUrl: url_1.default.parse(singinUrl).protocol + '//' + url_1.default.parse(singinUrl).host + '/logout/',
        };
        const strategy = new SAMLStrategy.Strategy(options, (LoginProvider.samlverify).bind(this));
        // tslint:disable-next-line:no-any
        passport_1.default.use(key, strategy);
        strategy.name = key;
        this._logger.info(options.callbackUrl);
        app.use('/' + key, body_parser_1.default.urlencoded({ extended: false }), passport_1.default.authenticate(key, { failureRedirect: '/' + key, failureFlash: true }), (req, res) => {
            const originalUrl2 = req.cookies.originalUrl2;
            console.log(originalUrl2);
            if (originalUrl2 !== undefined && originalUrl2 !== null) {
                res.cookie('originalUrl2', '', { expires: new Date() });
                res.redirect(originalUrl2);
            }
            else {
                console.log(originalUrl2);
                res.redirect('/');
            }
        });
        return strategy;
    }
    static samlverify(profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            if (profile !== null && profile !== undefined) {
                profile.token2 = profile.getAssertionXml();
            }
            done(null, profile);
        });
    }
}
exports.LoginProvider = LoginProvider;
//# sourceMappingURL=LoginProvider.js.map
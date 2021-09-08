import url from 'url';
import * as SAMLStrategy from 'passport-saml';
import passport from 'passport';
import { Config } from './Config';
import winston from 'winston';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Profile, SamlConfig } from 'passport-saml/lib/passport-saml/types';

export class LoginProvider {
    private static _logger: winston.Logger;
    // tslint:disable-next-line:no-any
    private static samlStrategy: any;

    static async isLoggedIn(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated())
            return next();
        if (req.originalUrl !== '/jwt') {
            res.cookie('originalUrl2', req.originalUrl, { maxAge: 900000, httpOnly: true });
        }
        res.redirect('/saml');
    }

    static async configure(logger: winston.Logger, app: express.Express, baseurl: string): Promise<void> {
        this._logger = logger;
        app.use(passport.initialize());
        app.use(passport.session());
        // tslint:disable-next-line:no-any
        passport.serializeUser(async (user: any, done: any): Promise<void> => done(null, user));
        // tslint:disable-next-line:no-any
        passport.deserializeUser((user: any, done: any): void => done(null, user));

        app.get(
            '/logout',
            (req: Request, res: Response, next: NextFunction): void => {
                try {
                    this.samlStrategy.logout(
                        // tslint:disable-next-line:no-any
                        req as any,
                        (err: Error, requestUrl: string) => {
                            // LOCAL logout
                            req.logout();
                            // redirect to the IdP with the encrypted SAML logout request
                            res.redirect(requestUrl);
                        }
                    );
                } catch (error) {
                    req.logout();
                    res.redirect('/');
                }
            }
        );

        await LoginProvider.RegisterProviders(app, baseurl);
        app.get(
            '/config',
            (req: Request, res: Response, next: NextFunction): void => {
                const baseurl: string = Config.SAML_FEDERATION_METADATA;
                let _wsurl: string = '';
                let _loginurl: string = '';
                const _url: string = Config.baseurl();
                if (url.parse(baseurl).protocol === 'http:') {
                    _wsurl = 'ws://' + url.parse(baseurl).host;
                    _loginurl = 'http://' + url.parse(baseurl).host;
                } else {
                    _wsurl = 'wss://' + url.parse(baseurl).host;
                    _loginurl = 'https://' + url.parse(baseurl).host;
                }
                _wsurl += '/';
                const res2 = {
                    wsurl: _wsurl,
                    loginurl: _loginurl,
                    wshost: _wsurl,
                    url: _url,
                    version: Config.VERSION,
                }
                res.end(JSON.stringify(res2));
            }
        );

        app.get(
            '/jwt',
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const up = url.parse(Config.SAML_FEDERATION_METADATA);
                // @ts-ignore
                const res2 = { rawAssertion: req.user.token2 };
                console.log(res2.rawAssertion)
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(res2));
            } catch (error) {
                res.setHeader('Content-Type', 'application/json');
                if (error.message) {
                    res.end(JSON.stringify({ error: error.message, jwt: null, rawAssertion: null }));
                } else {
                    res.end(JSON.stringify({ error, jwt: null, rawAssertion: null }));
                }

            }
        });

        app.get(
            '/failimpersonate',
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                if (req.isAuthenticated()) {
                    res.send('<html><head></head><body><h1>Impersonation failed</h1>Efterligning mislykkedes<br><p><a href=\'/logout\'>Log ind igen</a></p></body></html>');
                } else {
                    res.redirect('/');
                }
            }
        );

    }
    static async RegisterProviders(app: express.Express, baseurl: string) {
        const metadata = await Config.parseFederationMetadata(Config.SAML_FEDERATION_METADATA);
        console.log(metadata)
        this.samlStrategy = LoginProvider.CreateSAMLStrategy(
            app,
            'saml',
            // TODO: understand what should be there
            metadata.cert.toString(),
            // @ts-ignore
            metadata.identityProviderUrl,
            Config.SAML_ISSUER,
            baseurl
        );
        console.log("*******************************************/n",this.samlStrategy)
    }

    static CreateSAMLStrategy(
        app: express.Express,
        key: string,
        cert: string,
        singinUrl: string,
        issuer: string,
        baseurl: string
    ) {
        const options: SamlConfig = {
            entryPoint: singinUrl,
            cert,
            issuer,
            acceptedClockSkewMs: 5000,
            callbackUrl: url.parse(baseurl).protocol + '//' + url.parse(baseurl).host + '/' + key + '/',
            logoutUrl: url.parse(singinUrl).protocol + '//' + url.parse(singinUrl).host + '/logout/',
        };
        const strategy = new SAMLStrategy.Strategy(options, (LoginProvider.samlverify).bind(this));
        // tslint:disable-next-line:no-any
        passport.use(key, strategy as any);
        strategy.name = key;
        this._logger.info(options.callbackUrl);

        app.use(
            '/' + key,
            bodyParser.urlencoded({ extended: false }),
            passport.authenticate(key, { failureRedirect: '/' + key, failureFlash: true }),
            (req: Request, res: Response): void => {

                const originalUrl2: string = req.cookies.originalUrl2;
                console.log(originalUrl2)
                if (originalUrl2 !== undefined && originalUrl2 !== null) {
                    res.cookie('originalUrl2', '', { expires: new Date() });
                    res.redirect(originalUrl2);
                } else {
                    console.log(originalUrl2)
                    res.redirect('/');
                }
            }
        );

        return strategy;
    }

    static async samlverify(profile: Profile, done: SAMLStrategy.VerifiedCallback): Promise<void> {
        if (profile !== null && profile !== undefined) {
            profile.token2 = profile.getAssertionXml();
        }
        done(null, profile);
    }

}

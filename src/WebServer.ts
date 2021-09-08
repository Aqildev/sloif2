import path from 'path';
import winston from 'winston';
import http from 'http';
import https, { ServerOptions } from 'https';
import express, { Request, Response } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import proxy from 'express-http-proxy';
import cors from 'cors'
import { LoginProvider } from './LoginProvider';
import { Config } from './Config';

export class WebServer {
    private static _logger: winston.Logger;
    private static app: express.Express;

    static async configure(logger: winston.Logger, baseurl: string): Promise<http.Server> {
        this._logger = logger;

        this.app = express();
        this.app.use(cookieParser());
        this.app.use(session({ secret: 'secrettexthere' }));
        this.app.use(compression());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors())
        this.app.use('/', express.static(path.join(__dirname, '/public')));
        this.app.use('/android', express.static(path.join(__dirname, '/public')));
        this.app.use('/ios', express.static(path.join(__dirname, '/public')));
        await LoginProvider.configure(this._logger, this.app, baseurl);

        if (process.env.MODE === 'dev') {
            this.app.use('/', proxy('http://localhost:3000'));
        } else {
            this.app.use(express.static(path.join(__dirname, 'public')));

            this.app.get(
                '*',
                async (request: Request, response: Response) =>
                    response.send("working")
                    // response.sendFile(path.join(__dirname, './public/index.html'))
            );
        }

        let server: http.Server = null;
        if (Config.TLS_CRT !== '' && Config.TLS_KEY !== '') {
            let options: ServerOptions = {
                cert: Config.TLS_CRT,
                key: Config.TLS_KEY,
            };
            if (Config.TLS_CRT.indexOf('---') === -1) {
                options = {
                    cert: Buffer.from(Config.TLS_CRT, 'base64').toString('ascii'),
                    key: Buffer.from(Config.TLS_KEY, 'base64').toString('ascii'),
                    ca: '',
                    passphrase: '',
                    // requestCert: true
                };
            }
            let ca: string = Config.TLS_CA;
            if (ca !== '') {
                if (ca.indexOf('---') === -1) {
                    ca = Buffer.from(Config.TLS_CA, 'base64').toString('ascii');
                }
                // options.cert += "\n" + ca;
                options.ca += ca;
            }
            if (Config.TLS_PASSPHRASE !== '') {
                // options.cert = [options.cert, Config.tls_passphrase];
                // options.key = [options.key, Config.tls_passphrase];
                options.passphrase = Config.TLS_PASSPHRASE;
            }
            server = https.createServer(options, this.app);
        } else {
            server = http.createServer(this.app);
        }


        server.listen(Config.PORT);
        return server;
    }
}

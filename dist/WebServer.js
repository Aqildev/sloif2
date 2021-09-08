"use strict";
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
exports.WebServer = void 0;
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const cors_1 = __importDefault(require("cors"));
const LoginProvider_1 = require("./LoginProvider");
const Config_1 = require("./Config");
class WebServer {
    static configure(logger, baseurl) {
        return __awaiter(this, void 0, void 0, function* () {
            this._logger = logger;
            this.app = express_1.default();
            this.app.use(cookie_parser_1.default());
            this.app.use(express_session_1.default({ secret: 'secrettexthere' }));
            this.app.use(compression_1.default());
            this.app.use(body_parser_1.default.urlencoded({ extended: true }));
            this.app.use(body_parser_1.default.json());
            this.app.use(cors_1.default());
            this.app.use('/', express_1.default.static(path_1.default.join(__dirname, '/public')));
            this.app.use('/android', express_1.default.static(path_1.default.join(__dirname, '/public')));
            this.app.use('/ios', express_1.default.static(path_1.default.join(__dirname, '/public')));
            yield LoginProvider_1.LoginProvider.configure(this._logger, this.app, baseurl);
            if (process.env.MODE === 'dev') {
                this.app.use('/', express_http_proxy_1.default('http://localhost:3000'));
            }
            else {
                this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
                this.app.get('*', (request, response) => __awaiter(this, void 0, void 0, function* () { return response.send("working"); })
                // response.sendFile(path.join(__dirname, './public/index.html'))
                );
            }
            let server = null;
            if (Config_1.Config.TLS_CRT !== '' && Config_1.Config.TLS_KEY !== '') {
                let options = {
                    cert: Config_1.Config.TLS_CRT,
                    key: Config_1.Config.TLS_KEY,
                };
                if (Config_1.Config.TLS_CRT.indexOf('---') === -1) {
                    options = {
                        cert: Buffer.from(Config_1.Config.TLS_CRT, 'base64').toString('ascii'),
                        key: Buffer.from(Config_1.Config.TLS_KEY, 'base64').toString('ascii'),
                        ca: '',
                        passphrase: '',
                    };
                }
                let ca = Config_1.Config.TLS_CA;
                if (ca !== '') {
                    if (ca.indexOf('---') === -1) {
                        ca = Buffer.from(Config_1.Config.TLS_CA, 'base64').toString('ascii');
                    }
                    // options.cert += "\n" + ca;
                    options.ca += ca;
                }
                if (Config_1.Config.TLS_PASSPHRASE !== '') {
                    // options.cert = [options.cert, Config.tls_passphrase];
                    // options.key = [options.key, Config.tls_passphrase];
                    options.passphrase = Config_1.Config.TLS_PASSPHRASE;
                }
                server = https_1.default.createServer(options, this.app);
            }
            else {
                server = http_1.default.createServer(this.app);
            }
            server.listen(Config_1.Config.PORT);
            return server;
        });
    }
}
exports.WebServer = WebServer;
//# sourceMappingURL=WebServer.js.map
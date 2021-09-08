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
exports.Config = void 0;
const passport_saml_metadata_1 = require("passport-saml-metadata");
const async_retry_1 = __importDefault(require("async-retry"));
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Config {
    static baseurl() {
        return (Config.TLS_CRT !== '' && Config.TLS_KEY !== '' ? 'https' : Config.PROTOCOL) +
            '://' + Config.FRONTEND_DOMAIN +
            (Config.PORT !== 80 && Config.PORT !== 443 ? ':' + Config.PORT : '') + '/';
    }
    static getEnv(name, defaultvalue) {
        let value = process.env[name];
        if (!value || value === '') {
            value = defaultvalue;
        }
        return value;
    }
    static parseFederationMetadata(url) {
        return __awaiter(this, void 0, void 0, function* () {
            // if anything throws, we retry
            // rootCas.addFile(path.join(__dirname, '../config/ssl/gd_bundle-g2-g1.crt'));
            if (Config.TLS_CA !== '') {
                const tlsCa = Buffer.from(Config.TLS_CA, 'base64').toString('ascii');
                const rootCas = require('ssl-root-cas/latest').create();
                rootCas.push(tlsCa);
                // rootCas.addFile( tls_ca );
                https_1.default.globalAgent.options.ca = rootCas;
                require('https').globalAgent.options.ca = rootCas;
            }
            const metadata = yield async_retry_1.default((bail) => __awaiter(this, void 0, void 0, function* () {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                const reader = yield passport_saml_metadata_1.fetch({ url });
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
                if (reader === null || reader === undefined) {
                    bail(new Error('Failed getting result'));
                    return;
                }
                const config = passport_saml_metadata_1.toPassportConfig(reader);
                // we need this, for Office 365 :-/
                if (reader.signingCerts && reader.signingCerts.length > 1) {
                    config.cert = reader.signingCerts;
                }
                return config;
            }), {
                retries: 50,
                onRetry(error, count) {
                    console.debug('retry ' + count + ' error ' + error.message + ' getting ' + url);
                },
            });
            return metadata;
        });
    }
}
exports.Config = Config;
Config.VERSION = Config.getEnv('VERSION', '');
Config.TLS_CRT = Config.getEnv('TLS_CRT', '');
Config.TLS_KEY = Config.getEnv('TLS_KEY', '');
Config.TLS_CA = Config.getEnv('TLS_CA', '');
Config.TLS_PASSPHRASE = Config.getEnv('TLS_PASSPHRASE', '');
Config.PORT = parseInt(Config.getEnv('SERVER_PORT', '3000'), 10);
Config.SAML_FEDERATION_METADATA = Config.getEnv('SAML_FEDERATION_METADATA', '');
Config.SAML_ISSUER = Config.getEnv('SAML_ISSUER', '');
Config.SAML_ENTRYPOINT = Config.getEnv('SAML_ENTRYPOINT', '');
Config.SAML_CRT = Config.getEnv('SAML_CRT', '');
Config.PROTOCOL = Config.getEnv('PROTOCOL', 'http');
Config.FRONTEND_DOMAIN = Config.getEnv('FRONTEND_DOMAIN', 'localhost');
//# sourceMappingURL=Config.js.map
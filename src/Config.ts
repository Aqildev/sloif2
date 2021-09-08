import { fetch, MetadataReader, toPassportConfig } from 'passport-saml-metadata';
import retry from 'async-retry';
import https from 'https';

import dotenv from 'dotenv';
dotenv.config();

export class Config {
    public static VERSION: string = Config.getEnv('VERSION', '');
    public static TLS_CRT: string = Config.getEnv('TLS_CRT', '');
    public static TLS_KEY: string = Config.getEnv('TLS_KEY', '');
    public static TLS_CA: string = Config.getEnv('TLS_CA', '');
    public static TLS_PASSPHRASE: string = Config.getEnv('TLS_PASSPHRASE', '');

    public static PORT: number = parseInt(Config.getEnv('SERVER_PORT', '3000'), 10);
    public static SAML_FEDERATION_METADATA: string = Config.getEnv('SAML_FEDERATION_METADATA', '');
    public static SAML_ISSUER: string = Config.getEnv('SAML_ISSUER', '');
    public static SAML_ENTRYPOINT: string = Config.getEnv('SAML_ENTRYPOINT', '');
    public static SAML_CRT: string = Config.getEnv('SAML_CRT', '');
    public static PROTOCOL: string = Config.getEnv('PROTOCOL', 'http');

    public static FRONTEND_DOMAIN: string = Config.getEnv('FRONTEND_DOMAIN', 'localhost');

    public static baseurl(): string {
        return (Config.TLS_CRT !== '' && Config.TLS_KEY !== '' ? 'https' : Config.PROTOCOL) +
            '://' + Config.FRONTEND_DOMAIN +
            (Config.PORT !== 80 && Config.PORT !== 443 ? ':' + Config.PORT : '') + '/';
    }

    public static getEnv(name: string, defaultvalue: string): string {
        let value = process.env[name];
        if (!value || value === '') { value = defaultvalue; }
        return value;
    }

    public static async parseFederationMetadata(url: string) {
        // if anything throws, we retry
        // rootCas.addFile(path.join(__dirname, '../config/ssl/gd_bundle-g2-g1.crt'));
        if (Config.TLS_CA !== '') {
            const tlsCa: string = Buffer.from(Config.TLS_CA, 'base64').toString('ascii')
            const rootCas = require('ssl-root-cas/latest').create();
            rootCas.push(tlsCa);
            // rootCas.addFile( tls_ca );
            https.globalAgent.options.ca = rootCas;
            require('https').globalAgent.options.ca = rootCas;
        }

        const metadata = await retry(
            async bail => {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                const reader: MetadataReader = await fetch({ url });
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
                if (reader === null || reader === undefined) { bail(new Error('Failed getting result')); return; }
                const config = toPassportConfig(reader);
                // we need this, for Office 365 :-/
                if (reader.signingCerts && reader.signingCerts.length > 1) {
                    config.cert = reader.signingCerts;
                }
                return config;
            },
            {
                retries: 50,
                onRetry (error: Error, count: number): void {
                    console.debug('retry ' + count + ' error ' + error.message + ' getting ' + url);
                },
            }
        );
        return metadata;
    }
}

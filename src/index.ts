import winston from 'winston';
import http from 'http';
import dotenv from 'dotenv';

import { Logger } from './Logger';
import { WebServer } from './WebServer';
import { Config } from './Config';

const logger: winston.Logger = Logger.configure();

(async (): Promise<void> => {
    try {
        // await Config.get_login_providers();
        const server: http.Server = await WebServer.configure(logger, Config.baseurl());
        logger.info('listening on ' + Config.baseurl());
    } catch (error) {
        logger.error(error.message);
        console.error(error);
    }

})();

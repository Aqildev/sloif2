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
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Logger");
const WebServer_1 = require("./WebServer");
const Config_1 = require("./Config");
const logger = Logger_1.Logger.configure();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await Config.get_login_providers();
        const server = yield WebServer_1.WebServer.configure(logger, Config_1.Config.baseurl());
        logger.info('listening on ' + Config_1.Config.baseurl());
    }
    catch (error) {
        logger.error(error.message);
        console.error(error);
    }
}))();
//# sourceMappingURL=index.js.map
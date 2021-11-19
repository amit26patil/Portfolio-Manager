"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("source-map-support/register");
const cams_service_1 = require("./services/cams-service");
const handler = async (event, _context) => {
    let request = JSON.parse(event["body"]);
    try {
        var camsService = new cams_service_1.CamsService(request);
        let browser = await getBrowser();
        var response = await camsService.run(browser);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: response,
                input: event,
            }, null, 2),
        };
    }
    catch (ex) {
        console.log(ex);
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: ex,
                input: event,
            }, null, 2),
        };
    }
};
exports.handler = handler;
async function getBrowser() {
    const chromium = require('chrome-aws-lambda');
    process.env.CHROME_PATH = await chromium.executablePath;
    var chromeArgs = await chromium.args;
    const { remote } = require('webdriverio');
    let browser = await remote({
        logLevel: 'trace',
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: chromeArgs,
            }
        }
    });
    return browser;
}
//# sourceMappingURL=index.js.map
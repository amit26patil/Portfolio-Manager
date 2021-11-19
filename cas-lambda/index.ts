import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { CamsService } from './services/cams-service';

export const handler: APIGatewayProxyHandler = async (event : APIGatewayProxyEvent, _context) => {

  let request = JSON.parse(event["body"]);
  // let request = {
  //     "email":"shraddha.patil.2189@gmail.com",
  //     "pan": "BTSPP6519B"
  // };
  try
  {
    var camsService = new CamsService(request);
    let browser = await getBrowser();
    var response = await camsService.run(browser);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: response,
        input: event,
      }, null, 2),
    };
  } catch(ex) {
    console.log(ex);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: ex,
        input: event,
      }, null, 2),
    }
  }
}
async function getBrowser() {
  const chromium = require('chrome-aws-lambda');
  process.env.CHROME_PATH = await chromium.executablePath;
  var chromeArgs = await chromium.args;

  //For debugging with serverless
  //var chromeArgs = ["--disable-gpu", "--window-size=800,600"];
  const { remote } = require('webdriverio');

  let browser = await remote({
    logLevel: 'trace',
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: chromeArgs,
        //headless: true
      }
    }
  });
  return browser;
}


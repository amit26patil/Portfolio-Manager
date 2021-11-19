"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamsService = void 0;
const field_details_1 = require("../models/field-details");
class CamsService {
    constructor(args) {
        this._email = args["email"];
        this._pan = args["pan"];
    }
    async run(browser) {
        await browser.url("https://www.camsonline.com/Investors/Statements/Consolidated-Account-Statement");
        await browser.pause(3000);
        await browser.execute(() => {
            document.querySelector('html').className = "";
            document.querySelector('html').removeAttribute("style");
            document.querySelector('.cdk-global-overlay-wrapper').remove();
            document.querySelector('.cdk-overlay-backdrop').remove();
        });
        let actionArray = [
            new field_details_1.DetailedRadioAction(browser),
            new field_details_1.SpecificPeriodRadioAction(browser),
            new field_details_1.DatePickerAction(browser),
            new field_details_1.SetEmailAction(browser, this._email),
            new field_details_1.SetPanAction(browser, this._pan),
            new field_details_1.SetPasswordAction(browser, this._pan),
            new field_details_1.SetConfirmPasswordAction(browser, this._pan),
            new field_details_1.SubmitButtonAction(browser)
        ];
        for (let i = 0; i < actionArray.length; i++) {
            const action = actionArray[i];
            var actionResult = await action.run();
            if (!actionResult.IsSuccess) {
                return "Validation Failed";
            }
        }
        await browser.pause(3000);
        let eleNodes = await browser.$$('.success');
        let res = "Failed";
        if (eleNodes.length) {
            res = "Success";
        }
        await browser.deleteSession();
        await browser.close();
        return res;
    }
}
exports.CamsService = CamsService;
//# sourceMappingURL=cams-service.js.map
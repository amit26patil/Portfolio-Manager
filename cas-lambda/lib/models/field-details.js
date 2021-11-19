"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitButtonAction = exports.SetConfirmPasswordAction = exports.SetPasswordAction = exports.SetPanAction = exports.SetEmailAction = exports.DatePickerAction = exports.SpecificPeriodRadioAction = exports.DetailedRadioAction = exports.ActionResult = exports.FieldType = exports.FieldDetails = void 0;
class FieldDetails {
    constructor(sel, type, val) {
        this.selector = sel;
        this.type = type;
        this.value = val;
    }
}
exports.FieldDetails = FieldDetails;
var FieldType;
(function (FieldType) {
    FieldType[FieldType["Radio"] = 0] = "Radio";
    FieldType[FieldType["Input"] = 1] = "Input";
    FieldType[FieldType["Button"] = 2] = "Button";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
class ActionResult {
    constructor(e, isS) {
        this.Errors = e;
        this.IsSuccess = isS;
    }
}
exports.ActionResult = ActionResult;
class DetailedRadioAction {
    constructor(browser) {
        this.browser = browser;
    }
    async run() {
        await this.browser.execute(() => {
            if (window["jQuery"]) {
                $('mat-radio-button label:eq(1)', $('mat-radio-group:eq(0)')).click();
            }
        });
        return new ActionResult([], true);
    }
}
exports.DetailedRadioAction = DetailedRadioAction;
class SpecificPeriodRadioAction {
    constructor(browser) {
        this.browser = browser;
    }
    async run() {
        await this.browser.execute(() => {
            if (window["jQuery"]) {
                $('mat-radio-button label:eq(2)', $('mat-radio-group:eq(1)')).click();
            }
        });
        return new ActionResult([], true);
    }
}
exports.SpecificPeriodRadioAction = SpecificPeriodRadioAction;
class DatePickerAction {
    constructor(browser) {
        this.browser = browser;
    }
    async run() {
        await this.browser.execute(() => {
            if (window["jQuery"]) {
                $('mat-datepicker-toggle button:eq(0)').click();
                $('button[aria-label="Choose month and year"]', $('mat-calendar-header')).click();
                $('button.mat-calendar-previous-button', $('mat-calendar-header')).click();
                $('[aria-label="1992"]', $('mat-multi-year-view')).click();
                $('[aria-label="01-Apr-1992"]', $('mat-year-view')).click();
                $('[aria-label="01-Apr-1992"]', $('mat-month-view')).click();
            }
        });
        return new ActionResult([], true);
    }
}
exports.DatePickerAction = DatePickerAction;
class SetEmailAction {
    constructor(browser, email) {
        this.browser = browser;
        this.email = email;
    }
    async run() {
        let e = await this.browser.$('[formcontrolname="email_id"]');
        await e.setValue(this.email);
        return new ActionResult([], true);
    }
}
exports.SetEmailAction = SetEmailAction;
class SetPanAction {
    constructor(browser, pan) {
        this.browser = browser;
        this.pan = pan;
    }
    async run() {
        let e = await this.browser.$('[formcontrolname="pan"]');
        await e.setValue(this.pan);
        return new ActionResult([], true);
    }
}
exports.SetPanAction = SetPanAction;
class SetPasswordAction {
    constructor(browser, pan) {
        this.browser = browser;
        this.pan = pan;
    }
    async run() {
        let e = await this.browser.$('[formcontrolname="password"]');
        await e.setValue(this.pan);
        return new ActionResult([], true);
    }
}
exports.SetPasswordAction = SetPasswordAction;
class SetConfirmPasswordAction {
    constructor(browser, pan) {
        this.browser = browser;
        this.pan = pan;
    }
    async run() {
        let e = await this.browser.$('[formcontrolname="confirmPassword"]');
        await e.setValue(this.pan);
        return new ActionResult([], true);
    }
}
exports.SetConfirmPasswordAction = SetConfirmPasswordAction;
class SubmitButtonAction {
    constructor(browser) {
        this.browser = browser;
    }
    async validate(errorEles) {
        let errors = [];
        for (let ind = 0; ind < errorEles.length; ind++) {
            const er = errorEles[ind];
            var r = await this.browser.execute(x => {
                if (x.tagName != "FORM") {
                    return x.innerText;
                }
            }, er);
            if (r) {
                errors.push(r);
            }
        }
        console.log(`Errors: ${errors.join(',')}`);
        return errors;
    }
    async run() {
        var errorEles = await this.browser.$$('.ng-invalid');
        if (errorEles.length) {
            let errors = await this.validate(errorEles);
            return new ActionResult(errors, false);
        }
        await this.browser.execute(() => {
            if (window["jQuery"]) {
                $('[type=submit]').filter((b, a) => $(a).text().trim() == 'Submit').click();
            }
        });
        return new ActionResult([], true);
    }
}
exports.SubmitButtonAction = SubmitButtonAction;
//# sourceMappingURL=field-details.js.map
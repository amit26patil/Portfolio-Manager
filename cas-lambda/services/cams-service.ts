import {DatePickerAction, DetailedRadioAction, FieldDetails, FieldType, IAction, SetConfirmPasswordAction, SetEmailAction, SetPanAction, SetPasswordAction, SpecificPeriodRadioAction, SubmitButtonAction} from "../models/field-details"
export class CamsService {

    private _email: any;
    private _pan: any;

    constructor(args: any){
        this._email = args["email"];
        this._pan = args["pan"];
    }

    public async run(browser) {

          await browser.url("https://www.camsonline.com/Investors/Statements/Consolidated-Account-Statement");
          await browser.pause(3000);
          await browser.execute(()=>{
            document.querySelector('html').className=""
            document.querySelector('html').removeAttribute("style");
            document.querySelector('.cdk-global-overlay-wrapper').remove()
            document.querySelector('.cdk-overlay-backdrop').remove()
          });
          let actionArray:Array<IAction>=[
            new DetailedRadioAction(browser),
            new SpecificPeriodRadioAction(browser),
            new DatePickerAction(browser),
            new SetEmailAction(browser, this._email),
            new SetPanAction(browser, this._pan),
            new SetPasswordAction(browser, this._pan),
            new SetConfirmPasswordAction(browser, this._pan),
            new SubmitButtonAction(browser)
          ]
          for (let i = 0; i < actionArray.length; i++) {
            const action = actionArray[i];
            var actionResult = await action.run();
            if(!actionResult.IsSuccess){
              return "Validation Failed";
            }
          }
          // let inputJson = [
          //   new FieldDetails("#mat-radio-3 > label", FieldType.Radio),
          //   new FieldDetails("#mat-radio-14 > label", FieldType.Radio),
          //   new FieldDetails("#mat-input-0",FieldType.Input, this._email),
          //   new FieldDetails("#mat-input-1",FieldType.Input, this._pan),
          //   new FieldDetails("#mat-input-2",FieldType.Input, this._pan),
          //   new FieldDetails("#mat-input-3",FieldType.Input, this._pan),
          //   new FieldDetails("[type=submit]",FieldType.Button),
          // ]
          // let radioFields = inputJson.filter(a=>a.type==FieldType.Radio);
          // await this.processFields(radioFields, browser, (ele)=> ele.click() );
          
          // let inputFields = inputJson.filter(a=>a.type==FieldType.Input);
          // await this.processFields(inputFields, browser, (e, field) => e.setValue(field.value));
          
          // await browser.execute(()=>{
          //   (document.querySelector("mat-datepicker-toggle > button") as any).click();
          //   (document.querySelector("#mat-datepicker-1 > mat-calendar-header > div > div > button.mat-calendar-period-button.mat-button") as any).click();
          //   (document.querySelector("#mat-datepicker-1 > mat-calendar-header > div > div > button.mat-calendar-previous-button.mat-icon-button") as any).click();
          //   (document.querySelector("[aria-label='1992']") as any).click();
          //   (document.querySelector('[aria-label="01-Apr-1992"]') as any).click();
          //   (document.querySelector("[aria-label='01-Apr-1992']") as any).click();
          // })
          // var errorEles = await browser.$$('.ng-invalid');
          // if(errorEles.length){
          //     return await this.validate(errorEles, browser);
          // }
          // let btnFields = inputJson.filter(a=>a.type==FieldType.Button);
          // await this.processFields(btnFields, browser, (ele)=> ele.click() );
          
          await browser.pause(3000);
          let eleNodes =await browser.$$('.success')
          let res= "Failed"
          if(eleNodes.length){
              res= "Success"
          }
          await browser.deleteSession();
          await browser.close();
          return res
    }
  // private async processFields(
  //     fields: Array<FieldDetails>, 
  //     browser: any,
  //     action: (ele: any, f:FieldDetails)=> Promise<any>
  //     ) {
  //     for (let i = 0; i < fields.length; i++) {
  //       const field = fields[i];
  //       await browser.pause(300);
  //       //await browser.waitForVisible(field.selector, 2000);
  //       let e = await browser.$(field.selector);
  //       await action(e, field);
  //     }
  // }
  // private async validate(errorEles: any, browser: any) {
  //   let errors = [];
  //   for (let ind = 0; ind < errorEles.length; ind++) {
  //     const er = errorEles[ind];
  //     var r = await browser.execute(x => {
  //       if (x.tagName != "FORM") {
  //         return x.innerText;
  //       }
  //     }, er);
  //     if (r) {
  //       errors.push(r);
  //     }
  //   }
  //   console.log(`Errors: ${errors.join(',')}`);
  //   return 'Validation Failed';
  // }
}




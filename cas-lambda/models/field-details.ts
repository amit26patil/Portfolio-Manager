declare const $
export class FieldDetails {
    selector: string;
    type: FieldType;
    value: any;
    constructor(sel:string, type:FieldType, val?:any){
      this.selector = sel;
      this.type = type;
      this.value = val;
    }
  }
export enum FieldType{
    Radio,
    Input,
    Button
}
export class ActionResult{
  constructor(e,isS){
    this.Errors = e;
    this.IsSuccess =isS ;
  }
  public Errors:Array<any>;
  public IsSuccess: boolean;
}
export interface IAction{
  run():Promise<ActionResult>;
}
export class DetailedRadioAction implements IAction{
  browser: any;
  constructor(browser){
    this.browser = browser;
  }
  async run():Promise<ActionResult> {
    await this.browser.execute(()=>{
      if(window["jQuery"]){
        $('mat-radio-button label:eq(1)',$('mat-radio-group:eq(0)')).click()
      }
    })
    return new ActionResult([],true);
  }
}
export class SpecificPeriodRadioAction implements IAction{
  browser: any;
  constructor(browser){
    this.browser = browser;
  }
  async run() {
    await this.browser.execute(()=>{
      if(window["jQuery"]){
        $('mat-radio-button label:eq(2)',$('mat-radio-group:eq(1)')).click()
      }
    })
    return new ActionResult([],true);
  }
}
export class DatePickerAction implements IAction{
  browser: any;
  constructor(browser){
    this.browser = browser;
  }
  async run() {
    await this.browser.execute(()=>{
      if(window["jQuery"]){
        $('mat-datepicker-toggle button:eq(0)').click()
        $('button[aria-label="Choose month and year"]',$('mat-calendar-header')).click()
        $('button.mat-calendar-previous-button',$('mat-calendar-header')).click()
        $('[aria-label="1992"]',$('mat-multi-year-view')).click()
        $('[aria-label="01-Apr-1992"]',$('mat-year-view')).click()
        $('[aria-label="01-Apr-1992"]',$('mat-month-view')).click()
      }
    })
    return new ActionResult([],true);
  }
}

export class SetEmailAction implements IAction{
  browser: any;
  email: any;
  constructor(browser, email){
    this.browser = browser;
    this.email = email;
  }
  async run() {
    let e = await this.browser.$('[formcontrolname="email_id"]');
    await e.setValue(this.email);
    return new ActionResult([],true);
  }
}

export class SetPanAction implements IAction{
  browser: any;
  pan: any;
  constructor(browser, pan){
    this.browser = browser;
    this.pan = pan;
  }
  async run() {
    let e = await this.browser.$('[formcontrolname="pan"]');
    await e.setValue(this.pan);
    return new ActionResult([],true);
  }
}

export class SetPasswordAction implements IAction{
  browser: any;
  pan: any;
  constructor(browser, pan){
    this.browser = browser;
    this.pan = pan;
  }
  async run() {
    let e = await this.browser.$('[formcontrolname="password"]');
    await e.setValue(this.pan);
    return new ActionResult([],true);
  }
}

export class SetConfirmPasswordAction implements IAction{
  browser: any;
  pan: any;
  constructor(browser, pan){
    this.browser = browser;
    this.pan = pan;
  }
  async run() {
    let e = await this.browser.$('[formcontrolname="confirmPassword"]');
    await e.setValue(this.pan);
    return new ActionResult([],true);
  }
}

export class SubmitButtonAction implements IAction{
  browser: any;
  constructor(browser){
    this.browser = browser;
  }
  private async validate(errorEles: any) {
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
    if(errorEles.length){
        let errors =  await this.validate(errorEles);
        return new ActionResult(errors,false);
    }
    await this.browser.execute(()=>{
      if(window["jQuery"]){
        $('[type=submit]').filter((b,a)=>$(a).text().trim()=='Submit').click()
      }
    })
    return new ActionResult([],true);
  }
}


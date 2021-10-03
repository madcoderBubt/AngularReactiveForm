import { AbstractControl, ValidationErrors } from "@angular/forms";


export class CustomValidator {
    constructor() {}

    static email(control: AbstractControl): {[key: string]: any;} | null{
        const email:string = control.value;
        if((email.lastIndexOf('@') < email.lastIndexOf('.')) && (email.lastIndexOf('.') < email.length-1))
            return null;
        else{
            return {'email': true};
        }
    };
    static emailDomain(preferedDomain:string){
        return (control: AbstractControl): {[key: string]: any;} | null => {
            const email:string = control.value;
            const domain = email.substring(email.lastIndexOf('@')+1);
            if( email === '' || domain.toLowerCase() === preferedDomain.toLowerCase())
                return null;
            else{
                return {'emailDomain': true};
            }
        }        
    };    
    static positiveNo(control: AbstractControl):{[key:string]:any}|null {
        const value:number = control.value;
        return (value >= 0) ? null : {'positiveNo':true}
    }
}
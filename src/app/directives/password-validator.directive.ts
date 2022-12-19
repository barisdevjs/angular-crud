import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validatePassword(): ValidatorFn {

  return (abstractControl: AbstractControl): ValidationErrors | null => {
    let password = abstractControl.get('password1')?.value;
    let confirmPassword = abstractControl.get('password2')?.value;

    if (password != confirmPassword) {
      abstractControl.get('password2')?.setErrors({
        MatchPassword: true,
        
      })
    } else {
      abstractControl.get('password2')?.setErrors({
        MatchPassword: null
      })
    }

    console.log(abstractControl.get('password2')?.hasError)
    return  abstractControl.get('password2')?.getError('MatchPassword')
  }; 

}

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi: true,
  }],
})

export class PasswordValidatorDirective implements Validator {
  constructor() {}

  public validate(control: AbstractControl): ValidationErrors | null {
    return validatePassword()(control);
  }

}

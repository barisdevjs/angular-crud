import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, ValidationErrors, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi: true,
  }],
})

export class PasswordValidatorDirective implements Validator {
  
  @Input() appPasswordValidator: string ='';

  public validate(control: FormControl) {
    if (!control || !control.value)  {
      return null;
    } 

    const password = control.root.get(this.appPasswordValidator);

    if (password) {
      const subscription: Subscription = password.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    
    return password?.value !== control.value ? { confirmPasswordError: true } : null;
  }

}

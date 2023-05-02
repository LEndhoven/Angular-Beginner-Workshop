import { AbstractControl, FormGroup } from '@angular/forms';

import { formControlDirty$ } from './form-control-dirty';
import { formControlDisabled$ } from './form-control-disabled';
import { formControlEnabled$ } from './form-control-enabled';
import { formControlErrors$ } from './form-control-errors';
import { formControlInvalid$ } from './form-control-invalid';
import { formControlPristine$ } from './form-control-pristine';
import { formControlRawValue$ } from './form-control-raw-value';
import { formControlStatus$ } from './form-control-status';
import { formControlValid$ } from './form-control-valid';
import { formControlValue$ } from './form-control-value';
import { SetFormControlDisabledOptions, setFormControlDisabled } from './set-form-control-disabled';
import { SetFormControlEnabledOptions, setFormControlEnabled } from './set-form-control-enabled';

/**
 * Extended version of the `FormGroup` from `@angular/forms` with additional functionality.
 */
class OopFormGroup<TControl extends { [K in keyof TControl]: AbstractControl }> extends FormGroup<TControl> {
  public readonly value$ = formControlValue$(this);
  public readonly rawValue$ = formControlRawValue$(this);
  public readonly valid$ = formControlValid$(this);
  public readonly invalid$ = formControlInvalid$(this);
  public readonly errors$ = formControlErrors$(this);
  public readonly enabled$ = formControlEnabled$(this);
  public readonly disabled$ = formControlDisabled$(this);
  public readonly status$ = formControlStatus$(this);
  public readonly pristine$ = formControlPristine$(this);
  public readonly dirty$ = formControlDirty$(this);

  public setEnabled(shouldBeEnabled: boolean, options?: SetFormControlEnabledOptions): void {
    setFormControlEnabled(this, shouldBeEnabled, options);
  }

  public setDisabled(shouldBeDisabled: boolean, options?: SetFormControlDisabledOptions): void {
    setFormControlDisabled(this, shouldBeDisabled, options);
  }
}

export { OopFormGroup as FormGroup };

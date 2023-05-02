/* eslint-disable sort-imports */
import {
  AbstractControlOptions, FormControl as NgFormControl, FormControlOptions, FormControlState, FormControlStatus, ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
/* eslint-enable sort-imports */
import { Observable } from 'rxjs';

import { formControlDirty$ } from './form-control-dirty';
import { formControlDisabled$ } from './form-control-disabled';
import { formControlEnabled$ } from './form-control-enabled';
import { formControlErrors$ } from './form-control-errors';
import { formControlInvalid$ } from './form-control-invalid';
import { formControlPristine$ } from './form-control-pristine';
import { formControlStatus$ } from './form-control-status';
import { formControlValid$ } from './form-control-valid';
import { formControlValue$ } from './form-control-value';
import { SetFormControlDisabledOptions, setFormControlDisabled } from './set-form-control-disabled';
import { SetFormControlEnabledOptions, setFormControlEnabled } from './set-form-control-enabled';
import { UNDEFINED_FORM_STATE } from './undefined-form-state.const';

export interface FormControl<TValue> extends NgFormControl<TValue> {
  readonly value$: Observable<TValue>;
  readonly valid$: Observable<boolean>;
  readonly invalid$: Observable<boolean>;
  readonly errors$: Observable<ValidationErrors | null>;
  readonly enabled$: Observable<boolean>;
  readonly disabled$: Observable<boolean>;
  readonly status$: Observable<FormControlStatus>;
  readonly pristine$: Observable<boolean>;
  readonly dirty$: Observable<boolean>;
  setEnabled(shouldBeEnabled: boolean, options?: SetFormControlEnabledOptions): void;
  setDisabled(shouldBeDisabled: boolean, options?: SetFormControlDisabledOptions): void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ɵFormControlConstructor {
  new<TValue>(value: FormControlState<TValue> | TValue): FormControl<TValue>;
  new<TValue>(value: FormControlState<TValue> | TValue, validator: ValidatorFn): FormControl<TValue>;
  new<TValue>(value: FormControlState<TValue> | TValue, validators: ValidatorFn[]): FormControl<TValue>;
  new<TValue>(value: FormControlState<TValue> | TValue, options: AbstractControlOptions): FormControl<TValue>;
}

/**
 * Extended version of the `FormControl` from `@angular/forms` with additional properties and methods. This version is also non-nullable
 * by default and supports `undefined` as initial value directly (instead of wrapping it inside a `FormControlState` model).
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const FormControl: ɵFormControlConstructor = class OopFormControl<TValue> extends NgFormControl implements NgFormControl<TValue> {
  public readonly value$ = formControlValue$<TValue>(this);
  public readonly valid$ = formControlValid$(this);
  public readonly invalid$ = formControlInvalid$(this);
  public readonly errors$ = formControlErrors$(this);
  public readonly enabled$ = formControlEnabled$(this);
  public readonly disabled$ = formControlDisabled$(this);
  public readonly status$ = formControlStatus$(this);
  public readonly pristine$ = formControlPristine$(this);
  public readonly dirty$ = formControlDirty$(this);

  constructor(value: FormControlState<TValue> | TValue, validatorOrOptions?: ValidatorFn | ValidatorFn[] | AbstractControlOptions) {
    const options: FormControlOptions = {
      ...(
        Array.isArray(validatorOrOptions)
          ? { validators: validatorOrOptions } :
        typeof validatorOrOptions === 'function'
          ? { validators: [validatorOrOptions] } :
        typeof validatorOrOptions === 'object'
          ? validatorOrOptions
          : {}
      ),
      nonNullable: true,
    };

    super(value === undefined ? UNDEFINED_FORM_STATE : value, options);
  }

  public setEnabled(shouldBeEnabled: boolean, options?: SetFormControlEnabledOptions): void {
    setFormControlEnabled(this, shouldBeEnabled, options);
  }

  public setDisabled(shouldBeDisabled: boolean, options?: SetFormControlDisabledOptions): void {
    setFormControlDisabled(this, shouldBeDisabled, options);
  }
};

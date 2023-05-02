import { AbstractControl } from '@angular/forms';

import { SetFormControlEnabledOptions, setFormControlEnabled } from './set-form-control-enabled';

export type SetFormControlDisabledOptions = SetFormControlEnabledOptions;

export function setFormControlDisabled(
  formControl: AbstractControl,
  shouldBeDisabled: boolean,
  options?: SetFormControlDisabledOptions,
): void {
  setFormControlEnabled(formControl, !shouldBeDisabled, options);
}

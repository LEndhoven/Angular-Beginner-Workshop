import { AbstractControl, FormControl } from '@angular/forms';

export type SetFormControlEnabledOptions = Exclude<Parameters<FormControl['enable']>[0], undefined>;

export function setFormControlEnabled(
  formControl: AbstractControl,
  shouldBeEnabled: boolean,
  options?: SetFormControlEnabledOptions,
): void {
  if (shouldBeEnabled) {
    formControl.enable(options);
  } else {
    formControl.disable(options);
  }
}

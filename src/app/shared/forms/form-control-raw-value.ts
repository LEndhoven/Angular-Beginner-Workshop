import { AbstractControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

/**
 * Returns an `Observable` stream that emits the current 'raw' value of the specified form control and the subsequent changes of the value.
 * The raw value includes disabled form controls.
 *
 * See: [`AbstractControl.getRawValue`](https://angular.io/api/forms/AbstractControl#getRawValue).
 */
export function formControlRawValue$<TValue, TRawValue extends TValue>(
  formControl: AbstractControl<TValue, TRawValue>,
): Observable<TRawValue> {
  return formControl.valueChanges.pipe(
    startWith(undefined),
    map(() => formControl.getRawValue()),
  );
}

import { AbstractControl, FormControlState } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

/**
 * Returns an `Observable` stream that emits the current value of the specified form control and the subsequent changes of the value.
 */
export function formControlValue$<T>(formControl: AbstractControl<T>): Observable<Exclude<T, FormControlState<T>>> {
  return formControl.valueChanges.pipe(
    startWith(undefined),
    map(() => formControl.value as unknown as Exclude<T, FormControlState<T>>),
  );
}

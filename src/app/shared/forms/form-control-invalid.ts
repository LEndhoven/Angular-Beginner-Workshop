import { AbstractControl } from '@angular/forms';
import { Observable, map } from 'rxjs';

import { formControlValid$ } from './form-control-valid';

/**
 * Returns an `Observable` stream that emits the current invalid state of the specified abstract control and subsequent changes.
 */
export function formControlInvalid$(formControl: AbstractControl): Observable<boolean> {
  return formControlValid$(formControl).pipe(
    map((isValid) => !isValid),
  );
}

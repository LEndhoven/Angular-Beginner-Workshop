import { AbstractControl } from '@angular/forms';
import { Observable, distinctUntilChanged, map, startWith } from 'rxjs';

/**
 * Returns an `Observable` stream that emits the current pristine state of the specified abstract control and subsequent changes.
 */
export function formControlPristine$(formControl: AbstractControl): Observable<boolean> {
  return formControl.valueChanges.pipe(
    startWith(undefined),
    map(() => formControl.pristine),
    distinctUntilChanged(),
  );
}

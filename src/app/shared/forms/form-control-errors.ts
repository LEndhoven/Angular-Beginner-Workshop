import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, distinctUntilChanged, map, startWith } from 'rxjs';

/**
 * Returns an `Observable` stream that emits the current error state of the specified abstract control and subsequent changes.
 */
export function formControlErrors$(formControl: AbstractControl): Observable<ValidationErrors | null> {
  return formControl.valueChanges.pipe(
    startWith(undefined),
    map(() => formControl.errors),
    distinctUntilChanged(),
  );
}

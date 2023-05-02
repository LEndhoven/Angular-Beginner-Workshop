import { AbstractControl } from '@angular/forms';
import { Observable, distinctUntilChanged, map, startWith } from 'rxjs';

/**
 * Returns an `Observable` stream that emits the current disabled state of the specified abstract control and subsequent changes.
 */
export function formControlDisabled$(formControl: AbstractControl): Observable<boolean> {
  return formControl.statusChanges.pipe(
    startWith(undefined),
    map(() => formControl.disabled),
    distinctUntilChanged(),
  );
}

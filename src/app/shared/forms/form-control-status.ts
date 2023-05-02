import { AbstractControl, FormControlStatus } from '@angular/forms';
import { Observable, distinctUntilChanged, map, startWith } from 'rxjs';

/**
 * Returns an `Observable` stream that emits the current status of the specified abstract control and subsequent changes.
 */
export function formControlStatus$(formControl: AbstractControl): Observable<FormControlStatus> {
  return formControl.statusChanges.pipe(
    startWith(undefined),
    map(() => formControl.status),
    distinctUntilChanged(),
  );
}

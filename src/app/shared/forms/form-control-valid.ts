import { AbstractControl } from '@angular/forms';
import { Observable, distinctUntilChanged, map, startWith } from 'rxjs';

/**
 * Returns an `Observable` stream that emits the current validity state of the specified abstract control and subsequent changes.
 */
export function formControlValid$(formControl: AbstractControl): Observable<boolean> {
  return formControl.statusChanges.pipe(
    startWith(undefined),
    map(() => formControl.valid),
    distinctUntilChanged(),
  );
}

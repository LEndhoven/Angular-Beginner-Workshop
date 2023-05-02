import { AbstractControl } from '@angular/forms';
import { Observable, map } from 'rxjs';

import { formControlPristine$ } from './form-control-pristine';

/**
 * Returns an `Observable` stream that emits the current dirty state of the specified abstract control and subsequent changes.
 */
export function formControlDirty$(formControl: AbstractControl): Observable<boolean> {
  return formControlPristine$(formControl).pipe(
    map((isPristine) => !isPristine),
  );
}

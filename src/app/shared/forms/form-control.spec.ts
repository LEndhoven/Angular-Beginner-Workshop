import { materializeStream } from '#shared/testing/rxjs';
import { expectThat, typeOf } from '#shared/testing/types';

import { FormControl } from './form-control';

describe('FormControl class', () => {
  it('supports `undefined` as initial value', () => {
    expect(new FormControl(undefined).value).toBe(undefined);
  });

  it('creates non-nullable `FormControl` instances', () => {
    const formControl = new FormControl('test');

    expectThat(typeOf(formControl.value).equals<string>());
  });

  it('has a `value$` stream property that emits the current value and subsequent changes', () => {
    const formControl = new FormControl('a');

    expect(formControl.value$).toBeDefined();

    materializeStream(formControl.value$, (events) => {
      expect(events[0]?.value).toEqual('a');
      formControl.setValue('b');
      expect(events[1]?.value).toEqual('b');
      formControl.setValue('c');
      expect(events[2]?.value).toEqual('c');
    });
  });
});

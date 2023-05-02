import { Observable } from 'rxjs';

import { materializeStream } from '#shared/testing/rxjs';
import { expectThat, typeOf } from '#shared/testing/types';

import { FormControl } from './form-control';
import { FormGroup } from './form-group';

describe('FormGroup class', () => {
  it('has a `value$` stream property that emits the current value and subsequent changes', () => {
    const formGroup = new FormGroup({
      a: new FormControl({ value: 123, disabled: true }),
      b: new FormControl('test'),
      c: new FormControl(false),
    });

    materializeStream(formGroup.value$, (events) => {
      expect(events[0]?.value).toEqual({ b: 'test', c: false });
      formGroup.controls.a.enable();
      expect(events[1]?.value).toEqual({ a: 123, b: 'test', c: false });
      formGroup.controls.c.setValue(true);
      expect(events[2]?.value).toEqual({ a: 123, b: 'test', c: true });
    });
  });

  it('has a `rawValue$` stream property that emits the current raw value and subsequent changes', () => {
    const formGroup = new FormGroup({
      a: new FormControl(123),
      b: new FormControl('test'),
      c: new FormControl(false),
    });

    materializeStream(formGroup.rawValue$, (events) => {
      expect(events[0]?.value).toEqual({ a: 123, b: 'test', c: false });
      formGroup.controls.a.setValue(-1);
      expect(events[1]?.value).toEqual({ a: -1, b: 'test', c: false });
      formGroup.controls.c.setValue(true);
      expect(events[2]?.value).toEqual({ a: -1, b: 'test', c: true });
    });
  });

  it('has the correct typings for the `value$` property', () => {
    const formGroup = new FormGroup({
      a: new FormControl(123),
      b: new FormControl('test'),
      c: new FormControl(false),
    });

    expectThat(typeOf(formGroup.value$).equals<Observable<Partial<{ a: number; b: string; c: boolean }>>>());
  });

  it('has the correct typings for the `rawValue$` property', () => {
    const formGroup = new FormGroup({
      a: new FormControl(123),
      b: new FormControl('test'),
      c: new FormControl(false),
    });

    expectThat(typeOf(formGroup.rawValue$).equals<Observable<{ a: number; b: string; c: boolean }>>());
  });
});

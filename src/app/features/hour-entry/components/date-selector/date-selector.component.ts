import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormControl } from '../../../../shared/forms/form-control';

import { HourEntryService } from '../../services/hour-entry.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrl: './date-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class DateSelectorComponent implements OnInit, OnDestroy {
  public readonly dateControl = new FormControl<DateTime>(
    getDateOnly(DateTime.now().startOf('day'))
  );

  private readonly hourEntryService = inject(HourEntryService);

  private readonly subscriptions = new Subscription();

  public ngOnInit(): void {
    this.subscriptions.add(this.initializeDateControl());
    this.subscriptions.add(this.updateServiceOnChanges());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public goToPreviousDay(): void {
    const currentDate = this.dateControl.value;
    const newDate = addDays(currentDate, -1);
    this.dateControl.setValue(newDate);
  }

  public goToNextDay(): void {
    const currentDate = this.dateControl.value;
    const newDate = addDays(currentDate, 1);
    this.dateControl.setValue(newDate);
  }

  private initializeDateControl(): Subscription {
    return this.hourEntryService.currentDate$
      .pipe(take(1))
      .subscribe((currentDate) => {
        const dateCopy = getDateOnly(DateTime.fromJSDate(currentDate));
        this.dateControl.setValue(dateCopy, { emitEvent: false });
      });
  }

  private updateServiceOnChanges(): Subscription {
    return this.dateControl.value$.subscribe((currentDate) =>
      this.hourEntryService.updateCurrentDate(currentDate.toJSDate())
    );
  }
}

function getDateOnly(date: DateTime): DateTime {
  return date.startOf('day');
}

function addDays(date: DateTime, days: number): DateTime {
  return date.plus({ days });
}

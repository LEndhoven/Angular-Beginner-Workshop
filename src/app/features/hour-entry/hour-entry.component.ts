import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { filter, map, Observable, Subscription, withLatestFrom } from 'rxjs';
import { cache } from '../../shared/rxjs-utils';
import { Memoized } from '../../shared/decorators';
import {
  convertTimeExpressinToMinutes,
  isValidTimeDuration,
} from '../../shared/utils';
import { ProjectEntry } from './models';
import { HourEntryService } from './services/hour-entry.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { ProjectEntryComponent } from './components/project-entry/project-entry.component';

interface ProjectEntryViewModel extends ProjectEntry {
  cssClass: string | undefined;
}

const PROJECT_CODE_TO_CLASS = new Map<string, string>([
  ['NGLIB', 'is-nglib'],
  ['MEETI', 'is-meetings'],
  ['AWORK', 'is-awesome-workshop'],
]);

@Component({
  selector: 'app-hour-entry',
  templateUrl: './hour-entry.component.html',
  styleUrl: './hour-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,

    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,

    // DateSelectorComponent,
    ProjectEntryComponent,
  ],
  providers: [HourEntryService],
})
export class HourEntryComponent implements OnInit, OnDestroy {
  private readonly hourEntryService = inject(HourEntryService);

  private readonly subscriptions = new Subscription();

  public ngOnInit(): void {
    // Ensure always one entry is visible
    this.subscriptions.add(
      this.hourEntryService.currentDate$
        .pipe(
          withLatestFrom(this.projectEntryViewModels$),
          filter(([_, projectEntries]) => projectEntries.length === 0)
        )
        .subscribe(() => this.hourEntryService.addEmptyProjectEntry())
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public trackById<T>(_: number, projectEntry: T & { id: string }): unknown {
    return projectEntry.id;
  }

  public duplicateProjectEntry(projectEntry: ProjectEntry): void {
    this.hourEntryService.duplicateProjectEntry(projectEntry);
  }

  public removeProjectEntry(projectEntry: ProjectEntry): void {
    this.hourEntryService.removeProjectEntry(projectEntry);
  }

  public droppedProjectEntry(cdkDragDrop: CdkDragDrop<ProjectEntry>): void {
    this.hourEntryService.moveProjectEntry(
      cdkDragDrop.previousIndex,
      cdkDragDrop.currentIndex
    );
  }

  @Memoized public get projectEntryViewModels$(): Observable<
    ProjectEntryViewModel[]
  > {
    return this.hourEntryService.currentProjectEntries$.pipe(
      map((projectEntries) =>
        projectEntries.map((projectEntry) => ({
          ...projectEntry,
          cssClass: projectEntry.projectCode
            ? PROJECT_CODE_TO_CLASS.get(projectEntry.projectCode)
            : undefined,
        }))
      ),
      cache()
    );
  }

  @Memoized public get totalTimeInMinutes$(): Observable<number> {
    return this.projectEntryViewModels$.pipe(
      map((projectEntries) =>
        projectEntries
          .filter(
            (projectEntry) =>
              projectEntry.timeSpent !== undefined &&
              isValidTimeDuration(projectEntry.timeSpent)
          )
          .reduce(
            (totalMinutes, projectEntry) =>
              totalMinutes +
              (projectEntry.timeSpent !== undefined
                ? convertTimeExpressinToMinutes(projectEntry.timeSpent)
                : 0),
            0
          )
      ),
      cache()
    );
  }
}

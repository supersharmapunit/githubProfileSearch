import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as GithubActions from '../../store/actions/github.actions';

@Component({
  selector: 'app-history',
  template: `
    <h2>Search History</h2>
    <table mat-table [dataSource]="history$ | async" class="mat-elevation-z8">
      <ng-container matColumnDef="query">
        <th mat-header-cell *matHeaderCellDef>Search Query</th>
        <td mat-cell *matCellDef="let item">{{item.query}}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let item">{{item.successful ? 'Successful' : 'Failed'}}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let item">
          <button mat-mini-fab color="warn" (click)="clearItem(item.query)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
    }
    .mat-column-actions {
      width: 80px;
    }
  `]
})
export class HistoryComponent {
  history$: Observable<{ query: string; successful: boolean }[]>;
  displayedColumns: string[] = ['query', 'status', 'actions'];

  constructor(private store: Store<any>) {
    this.history$ = this.store.select(state => state.github.history);
  }

  clearItem(query: string) {
    this.store.dispatch(GithubActions.clearHistoryItem({ query }));
  }
}
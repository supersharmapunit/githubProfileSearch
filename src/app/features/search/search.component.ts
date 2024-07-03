import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import * as GithubActions from '../../store/actions/github.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  template: `
    <h2>Search GitHub Users</h2>
    <mat-form-field appearance="outline">
      <mat-label>Enter username</mat-label>
      <input matInput #searchInput (keyup)="updateSearchValue(searchInput.value)">
    </mat-form-field>
    <button mat-raised-button color="primary" 
            (click)="search(searchInput.value)" 
            [disabled]="!searchValue">Search</button>

    <mat-spinner *ngIf="(loading$ | async)" diameter="40"></mat-spinner>

    <ng-container *ngIf="!(loading$ | async) && hasSearched">
      <mat-card *ngIf="(users$ | async)?.length === 0">
        <mat-card-content>
          <p>No users found. Please try a different search term.</p>
        </mat-card-content>
      </mat-card>

      <mat-card *ngFor="let user of (users$ | async)">
        <mat-card-header>
          <img mat-card-avatar [src]="user.avatar_url" [alt]="user.login">
          <mat-card-title>{{user.login}}</mat-card-title>
        </mat-card-header>
        <mat-card-actions>
          <a mat-button [routerLink]="['/user', user.login]">View Profile</a>
        </mat-card-actions>
      </mat-card>
    </ng-container>
  `,
  styles: [`
    mat-form-field { width: 100%; }
    button { margin-bottom: 20px; }
    mat-card { margin-bottom: 10px; }
  `]
})
export class SearchComponent {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  searchValue: string = '';
  hasSearched: boolean = false;

  constructor(
    private store: Store<any>,
    private snackBar: MatSnackBar
  ) {
    this.users$ = this.store.select(state => state.github.users);
    this.loading$ = this.store.select(state => state.github.loading);
    this.error$ = this.store.select(state => state.github.error);
  }

  updateSearchValue(value: string) {
    this.searchValue = value.trim();
  }

  search(query: string) {
    if (!query.trim()) {
      this.snackBar.open('Search box cannot be empty', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.hasSearched = true;
    this.store.dispatch(GithubActions.searchUsers({ query }));
    this.store.dispatch(GithubActions.addToHistory({ query, successful: true }));
  }
}
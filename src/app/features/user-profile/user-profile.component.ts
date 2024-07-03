import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import * as GithubActions from '../../store/actions/github.actions';

@Component({
    selector: 'app-user-profile',
    template: `
    <h2>User Profile</h2>
    <div *ngIf="(loading$ | async)">Loading...</div>
    <div *ngIf="(error$ | async) as error">Error: {{error}}</div>
    <div *ngIf="(user$ | async) as user">
      <img [src]="user.avatar_url" alt="{{user.login}}" width="100">
      <h3>{{user.name}}</h3>
      <p>{{user.bio}}</p>
      <p>Followers: {{user.followers}}</p>
      <p>Following: {{user.following}}</p>
      <p>Public Repos: {{user.public_repos}}</p>
    </div>
  `
})
export class UserProfileComponent implements OnInit {
    user$: Observable<User | null>;
    loading$: Observable<boolean>;
    error$: Observable<any>;

    constructor(
        private route: ActivatedRoute,
        private store: Store<any>
    ) {
        this.user$ = this.store.select(state => state.github.selectedUser);
        this.loading$ = this.store.select(state => state.github.loading);
        this.error$ = this.store.select(state => state.github.error);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const username = params['username'];
            this.store.dispatch(GithubActions.getUserProfile({ username }));
        });
    }
}
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { GithubService } from '../../core/services/github.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import * as GithubActions from '../actions/github.actions';

@Injectable()
export class GithubEffects {
    searchUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GithubActions.searchUsers),
            mergeMap(action =>
                this.githubService.searchUsers(action.query).pipe(
                    map(response => GithubActions.searchUsersSuccess({ users: response.items })),
                    catchError(error => {
                        this.errorHandler.handleError(error);
                        return of(GithubActions.searchUsersFailure({ error: error.message }));
                    })
                )
            )
        )
    );

    getUserProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GithubActions.getUserProfile),
            mergeMap(action =>
                this.githubService.getUserProfile(action.username).pipe(
                    map(user => GithubActions.getUserProfileSuccess({ user })),
                    catchError(error => {
                        this.errorHandler.handleError(error);
                        return of(GithubActions.getUserProfileFailure({ error: error.message }));
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private githubService: GithubService,
        private errorHandler: ErrorHandlerService
    ) { }
}
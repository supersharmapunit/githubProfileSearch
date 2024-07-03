import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as GithubActions from '../actions/github.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class LocalStorageEffects {
    saveHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                GithubActions.addToHistory,
                GithubActions.clearHistoryItem
            ),
            tap(() => {
                this.store.select(state => state.github.history).subscribe(history => {
                    localStorage.setItem('githubHistory', JSON.stringify(history));
                });
            })
        ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, private store: Store<any>) { }
}
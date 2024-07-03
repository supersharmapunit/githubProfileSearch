import { createReducer, on } from '@ngrx/store';
import * as GithubActions from '../actions/github.actions';
import { User } from '../../core/models/user.model';

export interface GithubState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: any;
    history: { query: string; successful: boolean }[];
}

const storedHistory = localStorage.getItem('githubHistory');

export const initialState: GithubState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    history: storedHistory ? JSON.parse(storedHistory) : []
};

export const githubReducer = createReducer(
    initialState,
    on(GithubActions.searchUsers, state => ({ ...state, loading: true })),
    on(GithubActions.searchUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
    on(GithubActions.searchUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(GithubActions.getUserProfile, state => ({ ...state, loading: true })),
    on(GithubActions.getUserProfileSuccess, (state, { user }) => ({ ...state, selectedUser: user, loading: false })),
    on(GithubActions.getUserProfileFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(GithubActions.addToHistory, (state, { query, successful }) => ({
        ...state,
        history: [{ query, successful }, ...state.history]
    })),
    on(GithubActions.clearHistoryItem, (state, { query }) => ({
        ...state,
        history: state.history.filter(item => item.query !== query)
    }))
);
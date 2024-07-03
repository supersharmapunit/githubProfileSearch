import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const searchUsers = createAction(
    '[GitHub] Search Users',
    props<{ query: string }>()
);

export const searchUsersSuccess = createAction(
    '[GitHub] Search Users Success',
    props<{ users: User[] }>()
);

export const searchUsersFailure = createAction(
    '[GitHub] Search Users Failure',
    props<{ error: any }>()
);

export const getUserProfile = createAction(
    '[GitHub] Get User Profile',
    props<{ username: string }>()
);

export const getUserProfileSuccess = createAction(
    '[GitHub] Get User Profile Success',
    props<{ user: User }>()
);

export const getUserProfileFailure = createAction(
    '[GitHub] Get User Profile Failure',
    props<{ error: any }>()
);

export const addToHistory = createAction(
    '[GitHub] Add To History',
    props<{ query: string, successful: boolean }>()
);

export const clearHistoryItem = createAction(
    '[GitHub] Clear History Item',
    props<{ query: string }>()
);
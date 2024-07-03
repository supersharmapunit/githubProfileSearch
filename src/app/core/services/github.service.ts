import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    private apiUrl = 'https://api.github.com';

    constructor(private http: HttpClient) { }

    searchUsers(query: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/search/users?q=${query}`);
    }

    getUserProfile(username: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/users/${username}`);
    }
}
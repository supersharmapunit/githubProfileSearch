import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    template: `
    <h1>GitHub Explorer Dashboard</h1>
    <nav>
      <a routerLink="/search">Search Users</a>
      <a routerLink="/history">Search History</a>
    </nav>
  `,
    styles: [`
    nav { display: flex; gap: 1rem; }
    a { padding: 0.5rem 1rem; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; }
  `]
})
export class DashboardComponent { }
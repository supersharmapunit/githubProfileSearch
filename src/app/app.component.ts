import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>GitHub Explorer</span>
      <a mat-button routerLink="/">Dashboard</a>
      <a mat-button routerLink="/search">Search</a>
      <a mat-button routerLink="/history">History</a>
    </mat-toolbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {
  constructor(private router: Router) { }
}
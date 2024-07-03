import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SearchComponent } from './features/search/search.component';
import { HistoryComponent } from './features/history/history.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';

import { githubReducer } from './store/reducers/github.reducers';
import { GithubEffects } from './store/effects/github.effects';
import { LocalStorageEffects } from './store/effects/local-storage.effects';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SearchComponent,
        HistoryComponent,
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatIconModule,
        MatSnackBarModule,
        StoreModule.forRoot({ github: githubReducer }),
        EffectsModule.forRoot([GithubEffects, LocalStorageEffects])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
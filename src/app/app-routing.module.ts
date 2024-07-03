import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SearchComponent } from './features/search/search.component';
import { HistoryComponent } from './features/history/history.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'search', component: SearchComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'user/:username', component: UserProfileComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
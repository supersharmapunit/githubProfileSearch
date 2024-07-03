import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule { }
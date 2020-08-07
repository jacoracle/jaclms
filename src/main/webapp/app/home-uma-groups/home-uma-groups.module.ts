import { NgModule } from '@angular/core';

import { ConstructorSharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HomeUmaGroupsComponent } from './home-uma-groups.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    RouterModule,
    ConstructorSharedModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule
  ],
  declarations: [HomeUmaGroupsComponent]
})
export class HomeUmaGroupsModule {}

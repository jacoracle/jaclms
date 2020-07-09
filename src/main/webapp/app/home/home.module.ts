import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConstructorSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { HomeModuleComponent } from 'app/home-module/home-module.component';

@NgModule({
  imports: [ConstructorSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, HomeModuleComponent]
})
export class HomeModule {}

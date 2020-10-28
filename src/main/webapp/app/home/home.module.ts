import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConstructorSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { HomeModuleComponent } from 'app/home-module/home-module.component';
import { HomeCalendarComponent } from 'app/home-calendar/home-calendar.component';

@NgModule({
  imports: [ConstructorSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, HomeModuleComponent, HomeCalendarComponent]
})
export class HomeModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ConstructorSharedModule } from 'app/shared/shared.module';
import { ConstructorCoreModule } from 'app/core/core.module';
import { ConstructorAppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { ConstructorLayoutModule } from './constructor-layout/constructor-layout.module';
import { ConstructorEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseConfigurationComponent } from './course-configuration/course-configuration.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CursoUpdateComponent } from './entities/curso/curso-update.component';
import { CursoComponent } from './entities/curso/curso.component';
import { FichaUpdateComponent } from './entities/ficha/ficha-update.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ConstructorHomeComponent } from './constructor-home/constructor-home.component';

@NgModule({
  imports: [
    BrowserModule,
    ConstructorSharedModule,
    ConstructorCoreModule,
    HomeModule,
    ConstructorLayoutModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ConstructorEntityModule,
    ConstructorAppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    CourseConfigurationComponent,
    HomePageComponent,
    CursoComponent,
    CursoUpdateComponent,
    FichaUpdateComponent,
    ConstructorHomeComponent
  ],
  bootstrap: [MainComponent]
})
export class ConstructorAppModule {}

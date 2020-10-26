import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ConstructorSharedModule } from 'app/shared/shared.module';
import { ConstructorCoreModule } from 'app/core/core.module';
import { ConstructorAppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { ConstructorLayoutModule } from './constructor-layout/constructor-layout.module';
import { ConstructorEntityModule } from './entities/entity.module';
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
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ConstructorHomeComponent } from './constructor-home/constructor-home.component';
import { ModuleConfigurationComponent } from './module-configuration/module-configuration.component';
import { ModuloUpdateComponent } from './entities/modulo/modulo-update.component';
import { TopicModuleComponent } from './entities/tema/temas-modulo.component';
import { TypeModuleComponent } from './entities/tipo-modulo/tipo-modulo.component';
import { ColaboradoresModuleComponent } from './entities/colaborador/colaboradores-modulo.component';
import { QuillModule } from 'ngx-quill';
import { HomeLearningModule } from './home-learning/home-learning.module';
import { HomeUmaGroupsModule } from './home-uma-groups/home-uma-groups.module';
import { AgrupadorUmaUpdateComponent } from './entities/agrupador/agrupador-uma-update.component';
import { GroupUmaConfigurationComponent } from './group-uma-configuration/group-uma-configuration.component';
import { SecuenciaAgrupadorUpdateComponent } from './entities/agrupador/secuencia-uma-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LearningPathUpdateComponent } from './entities/rutas-aprendizaje/learning-path-update.component';
import { RutasAprendizajeJerarquiaComponent } from './entities/rutas-aprendizaje/rutas-aprendizaje-jerarquia/rutas-aprendizaje-jerarquia.component';
import { LearningPathConfigurationComponent } from './learning-path-configuration/learning-path-configuration.component';
import { LearningPathHierarchicalLevelComponent } from './entities/nivel-jerarquico/learning-path-hierarchical-level.component';
import { LearningPathHierarchicalAddLevelComponent } from './entities/nivel-jerarquico/dialog-add-level/learning-path-hierarchical-add-level.component';

@NgModule({
  imports: [
    QuillModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    ConstructorSharedModule,
    ConstructorCoreModule,
    HomeModule,
    HomeLearningModule,
    HomeUmaGroupsModule,
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
    ModuleConfigurationComponent,
    GroupUmaConfigurationComponent,
    HomePageComponent,
    CursoComponent,
    CursoUpdateComponent,
    ModuloUpdateComponent,
    AgrupadorUmaUpdateComponent,
    SecuenciaAgrupadorUpdateComponent,
    FichaUpdateComponent,
    ColaboradoresModuleComponent,
    TopicModuleComponent,
    TypeModuleComponent,
    ConstructorHomeComponent,
    LearningPathConfigurationComponent,
    LearningPathUpdateComponent,
    LearningPathHierarchicalLevelComponent,
    LearningPathHierarchicalAddLevelComponent,
    RutasAprendizajeJerarquiaComponent
  ],
  bootstrap: [MainComponent]
})
export class ConstructorAppModule {}

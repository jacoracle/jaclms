import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ConstructorLayoutComponent } from './constructor-layout/constructor-layout.component';
import { CourseConfigurationComponent } from './course-configuration/course-configuration.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { HomeModuleComponent } from './home-module/home-module.component';
import { ModuleConfigurationComponent } from './module-configuration/module-configuration.component';
import { HomeLearningComponent } from './home-learning/home-learning.component';
import { HomeUmaGroupsComponent } from './home-uma-groups/home-uma-groups.component';
import { GroupUmaConfigurationComponent } from './group-uma-configuration/group-uma-configuration.component';
import { LearningPathConfigurationComponent } from './learning-path-configuration/learning-path-configuration.component';
import { LearningPathHierarchicalLevelComponent } from './entities/nivel-jerarquico/learning-path-hierarchical-level.component';
import { HomeCalendarComponent } from 'app/home-calendar/home-calendar.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: ['ROLE_ADMIN']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
        },
        {
          path: 'constructor-layout/:id/:type',
          component: ConstructorLayoutComponent,
          data: {
            reuse: true
          },
          canActivate: [UserRouteAccessService]
        },
        {
          path: 'home-page',
          component: HomePageComponent
        },
        {
          path: 'learning-home',
          component: HomeLearningComponent
        },
        {
          path: 'courses-home',
          component: HomeComponent
        },
        {
          path: 'uma-home',
          component: HomeModuleComponent
        },
        {
          path: 'calendar-home',
          component: HomeCalendarComponent
        },
        {
          path: 'uma-groups-home',
          component: HomeUmaGroupsComponent
        },
        {
          path: 'course-configuration',
          component: CourseConfigurationComponent
        },
        {
          path: 'uma-configuration',
          component: ModuleConfigurationComponent
        },
        {
          path: 'uma-configuration/:id',
          component: ModuleConfigurationComponent
        },
        {
          path: 'group-configuration',
          component: GroupUmaConfigurationComponent
        },
        {
          path: 'sequence-configuration/:id',
          component: GroupUmaConfigurationComponent
        },
        {
          path: 'path-configuration',
          component: LearningPathConfigurationComponent
        },
        {
          path: 'path-configuration/:id',
          component: LearningPathConfigurationComponent // LearningPathUpdateComponent
        },
        {
          path: 'path-hierarchical',
          component: LearningPathHierarchicalLevelComponent // RutasAprendizajeJerarquiaComponent
        },
        {
          path: 'path-hierarchical/:id',
          component: LearningPathHierarchicalLevelComponent // RutasAprendizajeJerarquiaComponent
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class ConstructorAppRoutingModule {}

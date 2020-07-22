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
          path: 'courses-home',
          component: HomeComponent
        },
        {
          path: 'modules-home',
          component: HomeModuleComponent
        },
        {
          path: 'course-configuration',
          component: CourseConfigurationComponent
        },
        {
          path: 'module-configuration',
          component: ModuleConfigurationComponent
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class ConstructorAppRoutingModule {}

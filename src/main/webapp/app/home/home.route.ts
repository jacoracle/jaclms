import { Route } from '@angular/router';
import { AuthGuardService } from 'app/services/auth-guard-service.service';
import { ConstructorHomeComponent } from 'app/constructor-home/constructor-home.component';

export const HOME_ROUTE: Route = {
  path: '',
  component: ConstructorHomeComponent,
  canActivate: [AuthGuardService],
  data: {
    authorities: [],
    pageTitle: 'home.title'
  }
};

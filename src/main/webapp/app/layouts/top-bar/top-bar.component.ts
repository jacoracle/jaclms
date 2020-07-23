import { Component } from '@angular/core';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { EventEmitterService } from 'app/services/event-emitter.service';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { ColorModeService } from 'app/services/color-mode.service';
import { CurrentCourseService } from 'app/services/current-course.service';
import { CurrentModuleService } from 'app/services/current-module.service';
import { IModulo } from 'app/shared/model/modulo.model';
import { ICurso } from 'app/shared/model/curso.model';

@Component({
  selector: 'jhi-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  title = '';
  objectType = '';
  openMenu = false;
  isNavbarCollapsed = true;
  colorModes = [
    {
      class: 'ni-light',
      text: 'Light mode'
    },
    {
      class: 'ni-dark',
      text: 'Dark mode'
    }
  ];
  selectedColorMode = {
    class: 'ni-light',
    text: 'Light mode'
  };
  sizeMenus = [
    {
      class: 'ni-desktop',
      value: 'desktop',
      text: 'Desktop'
    },
    {
      class: 'ni-tablet',
      value: 'tablet',
      text: 'Tablet'
    },
    {
      class: 'ni-smartphone',
      value: 'smartphone',
      text: 'Smartphone'
    }
  ];
  selectedSizeMenu = {
    class: 'ni-desktop',
    value: 'desktop',
    text: 'Desktop'
  };

  constructor(
    private loginService: LoginService,
    private loginModalService: LoginModalService,
    private currentCourseService: CurrentCourseService,
    private currentModuleService: CurrentModuleService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private navigationControlsService: NavigationControlsService,
    private colorModeService: ColorModeService
  ) {
    this.objectType =
      this.currentCourseService.getType() !== '' ? this.currentCourseService.getType() : this.currentModuleService.getType();

    if (this.objectType === 'course') {
      this.currentCourseService.getCurrentCourse().subscribe((actualCourse: ICurso) => {
        this.title = actualCourse.titulo!.toUpperCase();
      });
    } else if (this.objectType === 'module') {
      this.currentModuleService.getCurrentModule().subscribe((actualModule: IModulo) => {
        this.title = actualModule.titulo!.toUpperCase();
      });
    }
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.loginModalService.open();
  }

  logout(): void {
    this.router.navigate(['/']);
    this.collapseNavbar();
    this.loginService.logout();
  }

  save(): void {
    this.eventEmitterService.setInvokeSave();
  }

  changeVisorSize(size: string): void {
    this.navigationControlsService.setVisorSize(size);
  }

  redirectHome(): void {
    this.router.navigate(['/']);
  }

  selectColorMode(colorMode: any): void {
    this.selectedColorMode = colorMode;
    this.colorModeService.setColorMode(colorMode.class);
  }
}

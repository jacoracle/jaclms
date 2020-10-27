import { Component } from '@angular/core';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { EventEmitterService } from 'app/services/event-emitter.service';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { ColorModeService } from 'app/services/color-mode.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  openMenu = false;
  isNavbarCollapsed = true;
  colorModes: any;
  selectedColorMode: any;
  sizeMenus: any;
  selectedSizeMenu: any;

  constructor(
    private loginService: LoginService,
    private loginModalService: LoginModalService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private navigationControlsService: NavigationControlsService,
    private colorModeService: ColorModeService,
    private translate: TranslateService
  ) {
    this.colorModes = [
      {
        class: 'ni-light',
        text: translate.instant('topbar.color.ni-light')
      },
      {
        class: 'ni-dark',
        text: translate.instant('topbar.color.ni-dark')
      }
    ];
    this.selectedColorMode = {
      class: 'ni-light',
      text: translate.instant('topbar.color.ni-light')
    };

    this.sizeMenus = [
      {
        class: 'ni-desktop',
        value: 'desktop',
        text: translate.instant('topbar.size.desktop')
      },
      {
        class: 'ni-tablet',
        value: 'tablet',
        text: translate.instant('topbar.size.tablet')
      },
      {
        class: 'ni-smartphone',
        value: 'smartphone',
        text: translate.instant('topbar.size.smartphone')
      }
    ];
    this.selectedSizeMenu = {
      class: 'ni-desktop',
      value: 'desktop',
      text: translate.instant('topbar.size.desktop')
    };
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

  returnHomeUma(): void {
    this.router.navigate(['/uma-home']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-constructor-home',
  templateUrl: './constructor-home.component.html',
  styleUrls: ['./constructor-home.component.scss']
})
export class ConstructorHomeComponent {
  constructor(private router: Router) {}

  redirectHome(): void {
    this.router.navigate(['/courses-home']);
  }

  redirectUMAs(): void {
    this.router.navigate(['/modules-home']);
  }
}

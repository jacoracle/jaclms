import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-constructor-home',
  templateUrl: './constructor-home.component.html',
  styleUrls: ['./constructor-home.component.scss']
})
export class ConstructorHomeComponent {
  constructor(private router: Router) {}

  redirectLearningPath(): void {
    this.router.navigate(['/learning-home']);
  }

  redirectGroupUMA(): void {
    this.router.navigate(['/uma-groups-home']);
  }

  redirectHome(): void {
    this.router.navigate(['/courses-home']);
  }

  redirectUMAs(): void {
    this.router.navigate(['/uma-home']);
  }

  redirectCalendar(): void {
    this.router.navigate(['/calendar-home']);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { RutasAprendizajeConfigurationComponent } from 'app/entities/rutas-aprendizaje/rutas-aprendizaje-configuration.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-learning-path-configuration',
  templateUrl: './learning-path-configuration.component.html',
  styleUrls: ['./learning-path-configuration.component.scss']
})
export class LearningPathConfigurationComponent implements OnInit {
  @ViewChild(RutasAprendizajeConfigurationComponent, { static: false })
  learningPathConfigComponent!: RutasAprendizajeConfigurationComponent;

  account: Account | null = null;
  subscription?: Subscription;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        console.error('Usuario con sesión');
      }
    });
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  configLearningPath(evt: any): void {
    evt.stopPropagation();
    // this.umaUpdateComponent.saveSequenceGroup();
    this.learningPathConfigComponent.saveLearningPathToConfigure();
    // this.router.navigate(['/path-hierarchical']);
  }
}

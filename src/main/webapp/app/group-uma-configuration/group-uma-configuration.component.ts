import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AccountService } from 'app/core/auth/account.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Account } from 'app/core/user/account.model';
import { AgrupadorService } from 'app/entities/agrupador/agrupador.service';
import { Agrupador, IAgrupador } from 'app/shared/model/agrupador.model';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { AgrupadorUmaUpdateComponent } from 'app/entities/agrupador/agrupador-uma-update.component';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { SecuenciaAgrupadorUpdateComponent } from '../entities/agrupador/secuencia-uma-update.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'jhi-group-uma-configuration',
  templateUrl: './group-uma-configuration.component.html',
  styleUrls: ['./group-uma-configuration.component.scss']
})
export class GroupUmaConfigurationComponent implements OnInit, OnDestroy {
  @ViewChild(AgrupadorUmaUpdateComponent, { static: false }) umaUpdateComponent!: AgrupadorUmaUpdateComponent;
  @ViewChild(SecuenciaAgrupadorUpdateComponent, { static: false }) secuenciaUpdateComponent!: SecuenciaAgrupadorUpdateComponent;
  @ViewChild(MatHorizontalStepper, { static: false }) stepper!: MatHorizontalStepper;
  isSaving = false;
  authSubscription?: Subscription;
  account: Account | null = null;
  createdGroupSequence!: IAgrupador;

  formSteps = new FormArray([]);

  isStepEditable!: boolean;
  secondFormGroup!: FormGroup;
  // termina stepper

  isNewGroup!: boolean;
  // received param to load group by id
  idSequenceToLoad!: number;

  step = 1;

  constructor(
    private eventManager: JhiEventManager,
    private accountService: AccountService,
    private formbuilder: FormBuilder,
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    // private eventManager: JhiEventManager,
    protected agrupadorService: AgrupadorService
  ) {
    this.idSequenceToLoad = this.activatedRoute.snapshot.paramMap.get('id') as any;

    this.isStepEditable = this.idSequenceToLoad > 0;

    this.secondFormGroup = this.formbuilder.group({
      default: ['', Validators.required]
    });
    this.formSteps.push(this.secondFormGroup);
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  setAgrupador(event: any): void {
    if (event) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.agrupador.created',
          type: 'success'
        })
      );
      this.router.navigate(['/uma-groups-home']).then(r => {
        return r;
      });
    } else {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.agrupador.validations.saveError',
          type: 'danger'
        })
      );
    }
  }

  setCreateForm(evt: any): void {
    this.formSteps.removeAt(0);
    this.formSteps.push(evt);
    this.createdGroupSequence = this.mapFormDataToAgrupador(evt);
  }

  mapFormDataToAgrupador(groupUmaForm: FormControl): IAgrupador {
    return {
      ...new Agrupador(),
      id: this.idSequenceToLoad,
      titulo: groupUmaForm.get(['titleSequenceUmas'])!.value,
      descripcion: groupUmaForm.get(['desciptionSequenceUmas'])!.value
    };
  }

  /**
   * to verify if it is a exists group

  isViewDetailOrEdit(): boolean {
    return this.idSequenceToLoad > 0;
  }
   */

  /**
   * to indicate if user is creating a new group
   */
  isCreation(): boolean {
    return this.isNewGroup;
  }

  previusStep(evt: any): void {
    if (typeof evt === 'number') {
      this.step = evt;
    } else {
      evt.stopPropagation();
      this.step = 1;
    }
  }

  nextStep(evt: any): void {
    evt.stopPropagation();
    this.step = this.umaUpdateComponent.validSequenceGroup(this.step);
  }

  executeSave(evt: any): void {
    evt.stopPropagation();
    this.umaUpdateComponent.saveSequenceGroup();
  }

  tabClick($event: MatTabChangeEvent): void {
    if ($event.index === 0) {
      this.step = 1;
    } else {
      this.step = 2;
    }
  }

  /*  revertData(): void {
      // console.error('#### group-uma-configuration - 1');
      this.umaUpdateComponent.revertSequenceGroup(this.createdGroupSequence.id!);
      // console.error('#### group-uma-configuration - Last, terminó revert, viene redirect');
      /!*
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.agrupador.revert' })
      );

      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.agrupador.revert',
          type: 'success'
        })
      );
      *!/
      this.router.navigate(['/uma-groups-home']);
    }*/
}

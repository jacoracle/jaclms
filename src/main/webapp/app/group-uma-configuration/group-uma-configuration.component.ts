import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { AccountService } from 'app/core/auth/account.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Account } from 'app/core/user/account.model';
// import { JhiEventManager } from 'ng-jhipster';
import { AgrupadorService } from 'app/entities/agrupador/agrupador.service';
import { IAgrupador } from 'app/shared/model/agrupador.model';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { AgrupadorUmaUpdateComponent } from 'app/entities/agrupador/agrupador-uma-update.component';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { SecuenciaAgrupadorUpdateComponent } from '../entities/agrupador/secuencia-uma-update.component';

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

  // stepper
  isCompleted = false;
  isLinear = false;
  isStepEditable!: boolean;
  secondFormGroup!: FormGroup;
  // termina stepper

  isNewGroup!: boolean;
  // received param to load group by id
  idSequenceToLoad!: number;

  btnSaveUpdate = 'Guardar';

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
      if (this.account) {
        console.error('LOGUEADO');
      }
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

  private onQueryError(): void {
    console.error('#### ERROR AL REALIZAR LA CONSULTA');
  }

  setAgrupador(event: any): void {
    if (event) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.agrupador.created',
          type: 'success'
        })
      );
      this.router.navigate(['/uma-groups-home']);
    } else {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.agrupador.validations.saveError',
          type: 'danger'
        })
      );
    }

    /* lo comente por ajuste de tabs
    this.createdGroupSequence = event.param2;
    this.isNewGroup = true;
    this.btnSaveUpdate = 'Terminar y Salir';
    this.isCompleted = false;
    if (this.createdGroupSequence && !event.param1) {
      this.stepper.next();
    } else if (this.createdGroupSequence && event.param1) {
      this.router.navigate(['/uma-groups-home']);
    } else {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.agrupador.validations.saveError',
          type: 'danger'
        })
      );
    }
    */
  }

  setCreateForm(evt: any): void {
    this.formSteps.removeAt(0);
    this.formSteps.push(evt);
    // this.isCompleted = this.createdGroupSequence ? true : false;
    this.stepper.selected.completed = this.createdGroupSequence ? true : false;
  }

  /**
   * to verify if it is a exists group
   */
  isViewDetailOrEdit(): boolean {
    return this.idSequenceToLoad > 0;
  }

  /**
   * to indicate if user is creating a new group
   */
  isCreation(): boolean {
    return this.isNewGroup;
  }

  executeSave(evt: any): void {
    evt.stopPropagation();
    /*
    this.formSteps
      .get([0])!
      .get('sendRegisterForm')!
      .setValue(true); //  hack to validate form steps
    */
    // if (this.secuenciaUpdateComponent.getSizeSecuenciaUmas() > 0) {
    this.umaUpdateComponent.saveSequenceGroup();
    /*
    } else {

      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.agrupador.validations.formErrorSequence',
          type: 'danger'
        })
      );
    }
    */
  }

  revertData(): void {
    console.error('#### group-uma-configuration - 1');
    this.umaUpdateComponent.revertSequenceGroup(this.createdGroupSequence.id!);
    console.error('#### group-uma-configuration - Last, terminó revert, viene redirect');
    /*
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.agrupador.revert' })
    );
    
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.agrupador.revert',
        type: 'success'
      })
    );
    */
    this.router.navigate(['/uma-groups-home']);
  }
}

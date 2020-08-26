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

@Component({
  selector: 'jhi-group-uma-configuration',
  templateUrl: './group-uma-configuration.component.html',
  styleUrls: ['./group-uma-configuration.component.scss']
})
export class GroupUmaConfigurationComponent implements OnInit, OnDestroy {
  @ViewChild(AgrupadorUmaUpdateComponent, { static: false }) umaUpdateComponente!: AgrupadorUmaUpdateComponent;
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
  idSequenceToLoad!: number;

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
    // console.error('#### FORM ARRAY: ', this.formSteps);
    // console.error('#### Agrupador Recibido con ID: ', this.idSequenceToLoad);
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
    console.error('#### Dato del Output emitido: ');
    console.error(event);
    this.createdGroupSequence = event;
    this.isNewGroup = true;
    this.isCompleted = false;
    if (this.createdGroupSequence) {
      this.stepper.next();
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
    // console.error('#### Evento emitido para formulario de registro');
    // console.error(evt);
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

  executeSave(): void {
    this.umaUpdateComponente.saveSequenceGroup();
  }

  revertData(): void {
    this.umaUpdateComponente.revertSequenceGroup(this.createdGroupSequence.id!);
    this.router.navigate(['/group-configuration']);
  }
}

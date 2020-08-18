import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { AccountService } from 'app/core/auth/account.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Account } from 'app/core/user/account.model';
import { JhiEventManager } from 'ng-jhipster';
import { AgrupadorService } from 'app/entities/agrupador/agrupador.service';
import { IAgrupador } from 'app/shared/model/agrupador.model';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'jhi-group-uma-configuration',
  templateUrl: './group-uma-configuration.component.html',
  styleUrls: ['./group-uma-configuration.component.scss']
})
export class GroupUmaConfigurationComponent implements OnInit, OnDestroy {
  @ViewChild(MatHorizontalStepper, { static: false }) stepper!: MatHorizontalStepper;
  isSaving = false;
  authSubscription?: Subscription;
  account: Account | null = null;
  createdGroupSequence!: IAgrupador;

  formSteps = new FormArray([]);

  // stepper
  isCompleted = false;
  isLinear = false;
  secondFormGroup!: FormGroup;
  // termina stepper

  constructor(
    private accountService: AccountService,
    private formbuilder: FormBuilder,
    private eventManager: JhiEventManager,
    protected agrupadorService: AgrupadorService
  ) {
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

    console.error('FORM ARRAY: ', this.formSteps);
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
    console.error('Dato del Output emitido: ');
    console.error(event);
    this.createdGroupSequence = event;
    this.isCompleted = false;
  }

  setCreateForm(evt: any): void {
    console.error('#### Evento emitido para formulario de registro');
    console.error(evt);
    this.formSteps.removeAt(0);
    this.formSteps.push(evt);
    // this.isCompleted = this.createdGroupSequence ? true : false;
    this.stepper.selected.completed = this.createdGroupSequence ? true : false;
  }
}

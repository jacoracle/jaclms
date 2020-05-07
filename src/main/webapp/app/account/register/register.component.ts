import { Component, AfterViewInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { RegisterService } from './register.service';
import { JhiEventManager, JhiAlertService, JhiAlert, JhiEventWithContent } from 'ng-jhipster';
import { CountryService } from 'app/entities/country/country.service';
import { ICountry } from 'app/shared/model/country.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  alerts: JhiAlert[] = [];
  countrys: ICountry[] = [];

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    firstName: ['', [Validators.maxLength(50)]],
    lastName1: ['', [Validators.maxLength(50)]],
    lastName2: ['', [Validators.maxLength(50)]],
    country: [''],
    phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
  });

  constructor(
    private languageService: JhiLanguageService,
    private loginModalService: LoginModalService,
    private registerService: RegisterService,
    private countryService: CountryService,
    private renderer: Renderer,
    private fb: FormBuilder,
    private alertService: JhiAlertService,
    private eventManager: JhiEventManager
  ) {}

  ngAfterViewInit(): void {
    if (this.login) {
      this.renderer.invokeElementMethod(this.login.nativeElement, 'focus', []);
    }
    this.countryService
      .query()
      .pipe(
        map((res: HttpResponse<ICountry[]>) => {
          return res.body ? res.body : [];
        })
      )
      .subscribe((resBody: ICountry[]) => (this.countrys = resBody));
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    if (this.registerForm.get(['phoneNumber'])!.value && !this.registerForm.get(['country'])!.value) {
      this.registerForm.controls['country'].setErrors(new Error());
      return;
    }

    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      const login = this.registerForm.get(['login'])!.value;
      const email = this.registerForm.get(['email'])!.value;
      const firstName = this.registerForm.get(['firstName'])!.value;
      const lastName1 = this.registerForm.get(['lastName1'])!.value;
      const lastName2 = this.registerForm.get(['lastName2'])!.value;
      const userPhoneNumber = {
        user: {
          login,
          firstName,
          lastName1,
          lastName2,
          email,
          password,
          langKey: this.languageService.getCurrentLanguage()
        },
        phoneNumbers: [
          {
            phoneNumber: this.registerForm.get(['phoneNumber'])!.value,
            country: this.registerForm.get(['country'])!.value
          }
        ]
      };
      this.registerService.save(userPhoneNumber).subscribe(
        () => {
          this.success = true;
        },
        response => this.processError(response)
      );
    }
  }

  openLogin(): void {
    this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'register.messages.' + response.error.message })
    );
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }

  isValid(controlName: string): boolean {
    return this.registerForm.controls[controlName].status === 'VALID';
  }

  isEmpty(controlName: string): boolean {
    return this.registerForm.controls[controlName].value === '';
  }

  passwordDoNotMatch(): boolean {
    return this.registerForm.get(['password'])!.value !== this.registerForm.get(['confirmPassword'])!.value;
  }
}

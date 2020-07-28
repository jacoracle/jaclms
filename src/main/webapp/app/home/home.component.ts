import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { CursoService } from './../entities/curso/curso.service';
import { HttpResponse } from '@angular/common/http';
import { ICurso } from 'app/shared/model/curso.model';
import { FileUploadService } from 'app/services/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterContentInit {
  account: Account | null = null;
  authSubscription?: Subscription;
  coverPaths = [];
  cursos: any = [];
  showLoader = false;
  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private cursoService: CursoService,
    private fileUploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.showLoader = true;
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.cursoService.query().subscribe(
          (res: HttpResponse<ICurso[]>) => this.onQuerySuccess(res.body),
          () => this.onQueryError()
        );
      }
    });
  }

  protected onQuerySuccess(data: ICurso[] | null): void {
    if (data) {
      this.cursos = data;
      for (let i = 0; i < this.cursos.length; i++) {
        if (this.cursos[i].portadaUrl !== '') {
          this.getCover(this.cursos[i].portadaUrl, i);
        } else {
          this.cursos[i].sanitizedPortadaUrl = '../../../content/images/no_cover.png';
        }
      }
      this.showLoader = false;
    }
  }

  ngAfterContentInit(): void {}

  protected onQueryError(): void {
    console.error('Error');
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  deleteCourse(id: number, $event: any): void {
    $event.stopPropagation();
    this.cursoService.delete(id).subscribe(() => {
      this.cursos.splice(this.findElementById(this.cursos, id), 1);
    });
  }

  protected onDeleteSuccess(data: ICurso[] | null): void {
    this.cursos = data ? data : [];
  }

  protected onDeleteError(): void {}

  findElementById(objectArray: any, id: number): number {
    let foundIndex = -1;
    objectArray.forEach((value: any, index: number) => {
      if (value.id === id) {
        foundIndex = index;
      }
    });
    return foundIndex;
  }

  private getCover(path: string, index: number): void {
    this.fileUploadService.getImageFile(path).subscribe(data => {
      const coverPath = URL.createObjectURL(data.body);
      const objectUrl = this.sanitizer.bypassSecurityTrustUrl(coverPath);
      this.cursos[index].sanitizedPortadaUrl = objectUrl;
    });
  }
}

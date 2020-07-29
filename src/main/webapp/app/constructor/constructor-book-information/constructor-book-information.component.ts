import { Component, OnInit } from '@angular/core';
import { CurrentCourseService } from 'app/services/current-course.service';
import { ICurso } from 'app/shared/model/curso.model';
import { Subscription } from 'rxjs';
import { FileUploadService } from 'app/services/file-upload.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CurrentModuleService } from 'app/services/current-module.service';
import { IModulo } from 'app/shared/model/modulo.model';

@Component({
  selector: 'jhi-constructor-book-information',
  templateUrl: './constructor-book-information.component.html',
  styleUrls: ['./constructor-book-information.component.scss']
})
export class ConstructorBookInformationComponent implements OnInit {
  subscription: Subscription;
  course?: ICurso;
  module?: IModulo;
  portadaCursoUrl?: SafeUrl;
  isPngImage?: boolean;

  constructor(
    private currentCourseService: CurrentCourseService,
    private currentModuloService: CurrentModuleService,
    private fileUploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) {
    this.subscription = this.currentCourseService.getCurrentCourse().subscribe(currentCourse => {
      this.course = currentCourse;
      if (this.course.portadaUrl && this.course.portadaUrl !== '') {
        this.isPngImage = this.validateTypeImage(this.course.portadaUrl);
        this.getCover(this.course.portadaUrl);
      }
    });

    this.subscription = this.currentModuloService.getCurrentModule().subscribe(currentModule => {
      this.module = currentModule;
    });
  }

  ngOnInit(): void {}

  validateTypeImage(imgUri: string): boolean {
    return imgUri.slice(imgUri.length - 3).toLowerCase() === 'png';
  }

  private getCover(path: string): void {
    this.fileUploadService.getImageFile(path).subscribe(data => {
      const coverPath = URL.createObjectURL(data.body);
      this.portadaCursoUrl = this.sanitizer.bypassSecurityTrustUrl(coverPath);
    });
  }
}

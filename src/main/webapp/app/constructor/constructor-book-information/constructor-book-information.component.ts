import { Component, OnInit } from '@angular/core';
import { CurrentCourseService } from 'app/services/current-course.service';
import { ICurso } from 'app/shared/model/curso.model';
import { Subscription } from 'rxjs';
import { FileUploadService } from 'app/services/file-upload.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'jhi-constructor-book-information',
  templateUrl: './constructor-book-information.component.html',
  styleUrls: ['./constructor-book-information.component.scss']
})
export class ConstructorBookInformationComponent implements OnInit {
  subscription: Subscription;
  course?: ICurso;
  portadaUrl?: SafeUrl;

  constructor(
    private currentCourseService: CurrentCourseService,
    private fileUploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) {
    this.subscription = this.currentCourseService.getCurrentCourse().subscribe(currentCourse => {
      this.course = currentCourse;
      if (this.course.portadaUrl && this.course.portadaUrl !== '') {
        this.getCover(this.course.portadaUrl);
      }
    });
  }

  ngOnInit(): void {}

  private getCover(path: string): void {
    this.fileUploadService.getImageFile(path).subscribe(data => {
      const coverPath = URL.createObjectURL(data.body);
      const objectUrl = this.sanitizer.bypassSecurityTrustUrl(coverPath);
      this.portadaUrl = objectUrl;
    });
  }
}

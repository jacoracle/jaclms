import { Component, Output, ViewChild } from '@angular/core';
import { CourseConfigurationService } from 'app/services/course-configuration.service';
import { CursoUpdateComponent } from 'app/entities/curso/curso-update.component';

@Component({
  selector: 'jhi-course-configuration',
  templateUrl: './course-configuration.component.html',
  styleUrls: ['./course-configuration.component.scss']
})
export class CourseConfigurationComponent {
  firstClick = false;
  @Output() selectedTabIndex = 0;
  tabs = [
    {
      title: 'General',
      iconClass: 'ni-settings',
      error: false
    },
    {
      title: 'Avanzado',
      iconClass: 'ni-book',
      error: false
    }
  ];
  markElementStyles = {
    transform: 'translateX(' + this.selectedTabIndex * 80 + 'px)'
  };
  @ViewChild(CursoUpdateComponent, { static: false }) cursoUpdateComponent!: CursoUpdateComponent;
  subscription: any;

  constructor(private courseConfigurationService: CourseConfigurationService) {
    this.subscription = this.courseConfigurationService.getErrorTabIndex().subscribe(errorTabIndex => {
      if (errorTabIndex) {
        this.tabs[errorTabIndex.errorTabIndex].error = true;
      }
    });
    this.subscription = this.courseConfigurationService.getClearTabsMessage().subscribe(clearTabErrorsMessage => {
      if (clearTabErrorsMessage) {
        for (let i = 0; i < this.tabs.length; i++) {
          this.tabs[i].error = false;
        }
      }
    });
  }

  changeSelectedIndex(index: number): void {
    this.selectedTabIndex = index;
    this.courseConfigurationService.setSelectedTab(index);
  }

  saveCourse(): void {
    this.cursoUpdateComponent.save();
    this.firstClick = this.cursoUpdateComponent.firstClick;
  }
}

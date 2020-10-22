import { NgModule } from '@angular/core';
import { PasswordStrengthBarComponent } from './password-strength-bar.component';
import { ConstructorSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [ConstructorSharedModule],
  exports: [PasswordStrengthBarComponent],
  declarations: [PasswordStrengthBarComponent],
  providers: []
})
export class PasswordStrengthBarModule {}

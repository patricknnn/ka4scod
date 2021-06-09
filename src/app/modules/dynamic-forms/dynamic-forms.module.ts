import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormControlComponent } from './components/dynamic-form-control/dynamic-form-control.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormControlComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DynamicFormComponent
  ],
})
export class DynamicFormsModule { }

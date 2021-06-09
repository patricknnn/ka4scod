import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlBase } from '../models/form-control-base';

@Injectable()
export class FormControlService {
  constructor() { }

  /**
   * Converts array of form controls to form group
   * @param formControls Array of form controls
   * @returns Formgroup contaaining form controls
   */
  toFormGroup(formControls: FormControlBase<any>[]): FormGroup {
    const group: any = {};
    formControls.forEach(formControl => {
      group[formControl.key] = new FormControl(formControl.value || '', formControl.validators);
    });
    return new FormGroup(group);
  }
}

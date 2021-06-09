import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlBase } from '../../models/form-control-base';
import { FormControlService } from '../../services/form-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormControlService]
})
export class DynamicFormComponent implements OnInit {
  /**
   * The appearance of the formcontrols in this form
   */
  @Input() appearance: "legacy" | "standard" | "fill" | "outline" = "fill";
  /**
   * The color of the form controls in this form
   */
  @Input() color: "primary" | "accent" | "warn" = "primary";
  /**
   * Allow the form to be submitted from an invalid state 
   */
  @Input() allowInvalidSubmit: boolean = false;
  /**
   * The formcontrols to display
   */
  @Input() formControls!: FormControlBase<any>[];
  /**
   * Event emitter triggered on form submit
   */
  @Output() formSubmit = new EventEmitter<string>();
  /**
   * Formgroup instance to manage the form state
   */
  form!: FormGroup;
  /**
   * Payload, emitted on form submit
   */
  payLoad = '';

  /**
   * Initialize DynamicFormComponent instance
   * @param formControlService Form control service
   */
  constructor(private formControlService: FormControlService) { }

  /**
   * Invoked once when DynamicFormComponent is instantiated
   */
  ngOnInit() {
    this.form = this.formControlService.toFormGroup(this.formControls);
  }

  /**
   * Invoked when form is submitted by user, emits payload to parent
   */
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.formSubmit.emit(this.payLoad);
  }
}

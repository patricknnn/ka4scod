import { Component, Input } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { FormControlBase } from "../../models/form-control-base";

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss']
})
export class DynamicFormControlComponent {
  /**
   * FormControlBase instance
   */
  @Input() control!: FormControlBase<any>;
  /**
   * Formgroup this control belongs to
   */
  @Input() form!: FormGroup;
  /**
   * Appearance of this control
   */
  @Input() appearance!: "legacy" | "standard" | "fill" | "outline";
  /**
   * Color of this control
   */
  @Input() color!: "primary" | "accent" | "warn";
  /**
   * FormGroup for manaaging date range
   */
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  /**
   * Seperator keycodes
   */
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  /**
   * Checks if control is native form field control
   * @returns true for native mat-form-field controls, false otherwise
   */
  get isFormFieldControl(): boolean {
    const formFieldControls = ["text", "textarea", "dropdown", "date", "date-range", "chips"];
    return formFieldControls.includes(this.control.controlType);
  }

  /**
   * Checks if control is required
   * @returns true if control is required, false otherwise
   */
  get isRequired(): boolean {
    return this.control.validators.includes(Validators.required);
  }

  /**
   * Checks if control is valid
   * @returns true if control is valid, false otherwise
   */
  get isValid(): boolean {
    return this.form.controls[this.control.key].valid;
  }

  /**
   * Checks if control is touched (had focus)
   * @returns true if control is touched, false otherwise
   */
  get isTouched(): boolean {
    return this.form.controls[this.control.key].touched;
  }

  /**
   * Returns error message
   * @returns error message
   */
  get errorMessage(): string {
    let message = this.control.label;
    message += this.form.controls[this.control.key].hasError("min") ? " must be higher" : "";
    message += this.form.controls[this.control.key].hasError("max") ? " must be lower" : "";
    message += this.form.controls[this.control.key].hasError("required") ? " is required" : "";
    message += this.form.controls[this.control.key].hasError("requiredTrue") ? " is required" : "";
    message += this.form.controls[this.control.key].hasError("email") ? " must be email" : "";
    message += this.form.controls[this.control.key].hasError("minLength") ? " must be longer" : "";
    message += this.form.controls[this.control.key].hasError("maxLength") ? " must be shorter" : "";
    message += this.form.controls[this.control.key].hasError("pattern") ? " must match pattern" : "";
    return message;
  }

  /**
   * Updates form field state for non native form field controls
   */
  updateFormFieldState(): void {
    this.form.controls[this.control.key].markAsTouched();
    let formControl = document.getElementById("form-field-" + this.control.key);
    this.isValid ? formControl?.classList.remove("mat-form-field-invalid") : formControl?.classList.add("mat-form-field-invalid");
  }

  /**
   * Sets correct date range value
   */
  setDateRange(): void {
    this.form.controls[this.control.key].setValue(this.dateRange.value);
  }

  /**
   * Adds event value to control value
   * @param event Chip input event
   */
  addToValue(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let controlValue = this.form.controls[this.control.key].value;
    if (value && controlValue instanceof Array) {
      controlValue.push(value);
      this.form.controls[this.control.key].setValue(controlValue);
    }
    event.chipInput!.clear();
  }

  /**
   * Removes value from control value
   * @param item Item to be removed
   */
  removeFromValue(item: string): void {
    let controlValue = this.form.controls[this.control.key].value;
    const index = controlValue.indexOf(item);
    if (index >= 0) {
      controlValue.splice(index, 1);
      this.form.controls[this.control.key].setValue(controlValue);
    }
  }

}

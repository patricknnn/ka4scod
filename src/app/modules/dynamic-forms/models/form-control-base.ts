import { ValidatorFn } from "@angular/forms";

/**
 * @description
 * Base class form all form controls
 * 
 * @usageNotes
 * Example implementation:
 * ```typescript
 * import { FormControlBase } from "./form-control-base";
 * export class FormControlText extends FormControlBase<string> {
 *     controlType = 'textbox';
 * }
 * ```
 */
export class FormControlBase<T> {
  /**
   * Form control value
   */
  value: T | undefined;
  /**
   * Form control key
   */
  key: string;
  /**
   * Form control input type
   */
  inputType: "color" | "date" | "datetime-local" | "email" | "month" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week" | "";
  /**
   * Form control type
   */
  controlType: string;
  /**
   * Position in form
   */
  order: number;
  /**
   * Form control placeholder
   */
  placeholder: string;
  /**
   * Form control label
   */
  label: string;
  /**
   * Determines label position
   */
  labelPosition: "before" | "after";
  /**
   * Determines when label should be floating
   */
  floatLabel: "auto" | "always" | "never";
  /**
   * Custom class for form control
   */
  class: string;
  /**
   * Control if checkbox is indeterminate
   */
  indeterminate: boolean;
  /**
   * Determines if control is selectable
   */
  selectable: boolean;
  /**
  * Determines if control is removable
  */
  removable: boolean;
  /**
   * Determines if value is added on blur
   */
  addOnBlur: boolean;
  /**
   * Options for select control
   */
  options: { key: string, value: string }[];
  /**
   * Form control validators
   */
  validators: ValidatorFn[];

  /**
   * Initialize the FormControlBase instance
   * @param options Object containing form control options
   */
  constructor(options: {
    value?: T | undefined,
    key?: string,
    inputType?: "color" | "date" | "datetime-local" | "email" | "month" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week" | "",
    controlType?: string,
    order?: number,
    placeholder?: string,
    label?: string,
    labelPosition?: "before" | "after",
    floatLabel?: "auto" | "always" | "never",
    class?: string,
    indeterminate?: boolean
    selectable?: boolean,
    removable?: boolean,
    addOnBlur?: boolean,
    options?: { key: string, value: string }[],
    validators?: ValidatorFn[]
  }) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.labelPosition = options.labelPosition || "before";
    this.floatLabel = options.floatLabel || "auto";
    this.placeholder = options.placeholder || "";
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || "";
    this.inputType = options.inputType || "";
    this.indeterminate = options.indeterminate || false;
    this.selectable = options.selectable || false;
    this.removable = options.removable || true;
    this.addOnBlur = options.addOnBlur || true;
    this.class = options.class || "";
    this.options = options.options || [];
    this.validators = options.validators || [];
  }
}
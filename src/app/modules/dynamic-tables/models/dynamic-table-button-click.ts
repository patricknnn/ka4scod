import { DynamicTableButton } from "./dynamic-table-button";
import { DynamicTableColumnConfig } from "./dynamic-table-column-config";

export class DynamicTableButtonClick {
  /**
   * Button that was clicked
   */
  button: DynamicTableButton;
  /**
   * Row containing the clicked button
   */
  row: any;
  /**
   * Column containing the clicked button
   */
  column: DynamicTableColumnConfig;

  /**
   * Initialize DynamicTableButtonClick instance
   * @param button Button that was clicked
   * @param row Row containing button that was clicked
   * @param column Column containing button that was clicked
   */
  constructor(
    button: DynamicTableButton,
    row: any,
    column: DynamicTableColumnConfig
  ) {
    this.button = button;
    this.row = row;
    this.column = column;
  }
}
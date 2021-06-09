import { DynamicTableButton } from "./dynamic-table-button";

export class DynamicTableColumnConfig {
  /**
   * Object key
   */
  key: string;
  /**
   * Header text
   */
  header: string;
  /**
   * Footer text
   */
  footer: string;
  /**
   * Buttons
   */
  buttons: DynamicTableButton[];
  /**
   * Data type
   */
  type: string;
  /**
   * Sticky column
   */
  sticky: boolean;
  /**
   * Sticky column end
   */
  stickyEnd: boolean;
  /**
   * Sortable column
   */
  sortable: boolean;
  /**
   * Draggable column
   */
  draggable: boolean;
  /**
   * Expandable column
   */
  expandable: boolean;

  /**
   * Initialize the DynamicTableColumnConfig instance
   * @param options Object containing options
   */
  constructor(options: {
    key: string,
    header?: string,
    footer?: string,
    buttons?: DynamicTableButton[],
    type?: string,
    sticky?: "start" | "end",
    sortable?: boolean,
    draggable?: boolean,
    expandable?: boolean
  }) {
    this.key = options.key;
    this.header = options.header || "";
    this.footer = options.footer || "";
    this.buttons = options.buttons || [];
    this.type = options.type || "";
    this.sticky = options.sticky == "start";
    this.stickyEnd = options.sticky == "end";
    this.sortable = options.sortable || false;
    this.draggable = options.draggable || false;
    this.expandable = options.expandable || false;
  }
}
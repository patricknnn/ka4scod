/**
 * @description
 * Base DynamicTableConfig class 
 */
export class DynamicTableConfig {
  /**
   * Show loader
   */
  loader: boolean;
  /**
   * Loader color
   */
  loaderColor: "primary" | "accent" | "warn";
  /**
   * Show filter
   */
  filter: boolean;
  /**
   * Filter label
   */
  filterLabel: string;
  /**
   * Filter placeholder
   */
  filterPlaceholder: string;
  /**
   * Filter appearance
   */
  filterAppearance: "legacy" | "standard" | "fill" | "outline";
  /**
   * Filter color
   */
  filterColor: "primary" | "accent" | "warn";
  /**
   * Whether to use paging
   */
  paging: boolean;
  /**
   * Page size options
   */
  pagingSizeOptions: number[];
  /**
   * Default page size
   */
  pagingSizeDefault: number;
  /**
   * Enable/Disable sorting for entire table
   */
  sorting: boolean;
  /**
   * Active sort field
   */
  sortingActiveField: string;
  /**
   * Active sort direction
   */
  sortingActiveDirection: "asc" | "desc";
  /**
   * Enable/Disable dragging for entire table
   */
  dragging: boolean;
  /**
   * Selecting column
   */
  selecting: boolean;
  /**
   * Expanding row
   */
  expanding: boolean;
  /**
   * Whether headers are sticky
   */
  stickyHeaders: boolean;
  /**
   * Whether footers are sticky
   */
  stickyFooters: boolean;
  /**
   * Custom table class
   */
  tableClass: string;
  /**
   * Horizontal scrolling width
   */
  scrollX: string; // TODO
  /**
   * Vertical scrolling width
   */
  scrollY: string; // TODO

  /**
   * Initialize the DynamicTableConfig instance
   * @param options Object containing form control options
   */
  constructor(options: {
    loader?: boolean,
    loaderColor?: "primary" | "accent" | "warn",
    filter?: boolean,
    filterLabel?: string,
    filterPlaceholder?: string,
    filterAppearance?: "legacy" | "standard" | "fill" | "outline",
    filterColor?: "primary" | "accent" | "warn",
    paging?: boolean,
    pagingSizeOptions?: number[],
    pagingSizeDefault?: number,
    sorting?: boolean,
    sortingActiveField?: string,
    sortingActiveDirection?: "asc" | "desc",
    dragging?: boolean,
    selecting?: boolean,
    expanding?: boolean,
    stickyHeaders?: boolean,
    stickyFooters?: boolean,
    tableClass?: string,
    scrollX?: string,
    scrollY?: string,
  }) {
    this.loader = options.loader || false;
    this.loaderColor = options.loaderColor || "primary";
    this.filter = options.filter || false;
    this.filterLabel = options.filterLabel || "Filter";
    this.filterPlaceholder = options.filterPlaceholder || "";
    this.filterAppearance = options.filterAppearance || "standard";
    this.filterColor = options.filterColor || "primary";
    this.paging = options.paging || false;
    this.pagingSizeOptions = options.pagingSizeOptions || [10, 25, 50];
    this.pagingSizeDefault = options.pagingSizeDefault || 10;
    this.sorting = options.sorting || false;
    this.sortingActiveField = options.sortingActiveField || "";
    this.sortingActiveDirection = options.sortingActiveDirection || "asc";
    this.dragging = options.dragging || false;
    this.selecting = options.selecting || false;
    this.expanding = options.expanding || false;
    this.stickyHeaders = options.stickyHeaders || false;
    this.stickyFooters = options.stickyFooters || false;
    this.tableClass = options.tableClass || "";
    this.scrollX = options.scrollX || "";
    this.scrollY = options.scrollY || "";
  }
}
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DynamicTableButton } from '../../models/dynamic-table-button';
import { DynamicTableButtonClick } from '../../models/dynamic-table-button-click';
import { DynamicTableColumnConfig } from '../../models/dynamic-table-column-config';
import { DynamicTableConfig } from '../../models/dynamic-table-config';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  animations: [
    trigger('expandRow', [
      state('collapsed, void', style({ height: '0px' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  /**
   * Table configuration
   */
  @Input() tableConfig!: DynamicTableConfig;
  /**
   * Column configuration
   */
  @Input() columnConfig!: DynamicTableColumnConfig[];
  /**
   * Data array
   */
  @Input() data!: any[];

  /**
   * Selection change event emitter
   */
  @Output() selectionChange = new EventEmitter<any[]>();
  /**
   * Button click event emitter
   */
  @Output() buttonClick = new EventEmitter<DynamicTableButtonClick>();


  /**
   * MatTable instance
   */
  @ViewChild(MatTable) table?: MatTable<any>;
  /**
   * MatPaginator instance
   */
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  /**
   * MatSort instance
   */
  @ViewChild(MatSort) sort?: MatSort;

  /**
   * MatTableDataSource
   */
  dataSource!: MatTableDataSource<any>;
  /**
   * Regular columns
   */
  columnRegular: DynamicTableColumnConfig[] = [];
  /**
   * Expandable columns
   */
  columnExpendable: DynamicTableColumnConfig[] = [];
  /**
   * Regular columns to display
   */
  columnsToDisplay: string[] = [];
  /**
   * Expandable columns to display
   */
  columnsToDisplayExpandable: string[] = [];
  /**
   * Selected rows
   */
  selection = new SelectionModel<any>(true, []);
  /**
   * Currently expanded row
   */
  expandedRow: any;
  /**
   * Wether loading results or not
   */
  isLoadingResults: boolean = false;
  /**
   * Number of results
   */
  resultsLength: number = 0;


  /**
   * Initialize dynamic table instance
   */
  constructor() { }

  /**
   * Called on instance initialization 
   */
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.initTableColumns();
  }

  /**
   * Called after view initialization
   */
  ngAfterViewInit() {
    if (this.tableConfig.paging) {
      this.dataSource.paginator = this.paginator ? this.paginator : null;
    }
    this.dataSource.sort = this.sort ? this.sort : null;
  }

  /**
   * Initialize table columns
   */
  initTableColumns(): void {
    // reset columns
    this.columnRegular = [];
    this.columnExpendable = [];
    // devide columns in categories
    this.columnConfig.forEach((col) => {
      col.expandable ? this.columnExpendable.push(col) : this.columnRegular.push(col);
    });
    // init vars
    let displayColumns: string[] = [];
    let displayColumnsExpandable: string[] = [];
    // set conditional select column
    if (this.tableConfig.selecting) {
      displayColumns.push("selectRowColumn");
    }
    // set regular columns
    this.columnRegular.forEach((col) => {
      displayColumns.push(col.key);
    });
    // set expandable columns
    this.columnExpendable.forEach((col) => {
      displayColumnsExpandable.push(col.key);
    });
    // update display columns
    this.columnsToDisplay = displayColumns;
    this.columnsToDisplayExpandable = displayColumnsExpandable;
  }


  /**
   * Applies filter to table
   * @param event Filter event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Expands a table row
   * @param row Row to be expanded
   */
  expandRow(row: any): void {
    if (this.tableConfig.expanding) {
      this.expandedRow = this.expandedRow === row ? null : row;
    }
  }

  /**
   * Whether all column footers are empty
   * @returns true if all column footers are empty, false otherwise
   */
  allColumnFootersEmpty(): boolean {
    let empty = true;
    this.columnConfig.forEach((config) => {
      if (config.footer) {
        empty = false;
      }
    });
    if (this.tableConfig.selecting) {
      empty = false;
    }
    return empty;
  }

  /**
   * Reorders array item to dropped position
   * @param event Drop event
   */
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
  }

  /**
   * Handles row toggle and emits selectionChange event
   * @param row Changed row
   */
  rowToggle(row: any): void {
    this.selection.toggle(row);
    this.selectionChange.emit(this.selection.selected);
  }

  /**
   * Handles button click and emits buttonClick event
   * @param row Changed row
   */
  emitButtonClickEvent(button: DynamicTableButton, row: any, column: DynamicTableColumnConfig): void {
    this.buttonClick.emit(new DynamicTableButtonClick(button, row, column));
  }

  /**
   * Whether the number of selected elements matches the total number of rows
   * @returns Whether all rows are selected
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Returns number of selected rows
   * @returns Number of selected rowa
   */
  selectedRowCount(): number {
    return this.selection.selected.length;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection
   * Emits selectionChange event
   */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
    this.selectionChange.emit(this.selection.selected);
  }

  /**
   * Returns sum of all column values
   * @param column Column to get the sum of
   * @returns Sum of all column values
   */
  columnTotal(column: string): number {
    return this.data
      .map((t: { [x: string]: any; }) => t[column])
      .reduce((acc: number, value: number) => acc + value, 0);
  }

  /**
   * The label for the checkbox on the passed row
   * @param row Table row to get checkbox label for
   * @returns Checkbox label
   */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}

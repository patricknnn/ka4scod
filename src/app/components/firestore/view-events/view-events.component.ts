import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LanEvent } from 'src/app/models/event';
import { DynamicTableButton } from 'src/app/modules/dynamic-tables/models/dynamic-table-button';
import { DynamicTableButtonClick } from 'src/app/modules/dynamic-tables/models/dynamic-table-button-click';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { EventService } from 'src/app/services/firestore/event.service';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-view-events',
    templateUrl: './view-events.component.html',
    styleUrls: ['./view-events.component.scss'],
})
export class ViewEventsComponent implements OnInit {
    tableData: LanEvent[] = [];
    tableConfig?: DynamicTableConfig;
    columnConfig: DynamicTableColumnConfig[] = [];
    isLoading: boolean = true;
    @ViewChild('outlet', { read: ViewContainerRef })
    outletRef?: ViewContainerRef;
    @ViewChild('content', { read: TemplateRef }) contentRef?: TemplateRef<any>;

    constructor(
        private firestore: EventService,
        private tables: TableService,
        private dialog: DialogService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.tableConfig = this.tables.getTableConfig();
        this.tableConfig.expanding = true;
        this.columnConfig = [
            new DynamicTableColumnConfig({
                key: 'name',
                header: 'Name',
                sortable: true,
                draggable: true,
            }),
            new DynamicTableColumnConfig({
                key: 'location',
                header: 'Location',
                sortable: true,
                draggable: true,
            }),
            new DynamicTableColumnConfig({
                key: 'startDate',
                header: 'Start',
                type: 'date',
                sortable: true,
                draggable: true,
            }),
            new DynamicTableColumnConfig({
                key: 'endDate',
                header: 'End',
                type: 'date',
                sortable: true,
                draggable: true,
            }),
            new DynamicTableColumnConfig({
                key: 'buttons',
                header: 'Actions',
                buttons: [
                    new DynamicTableButton('details', 'open_in_new', 'primary'),
                    new DynamicTableButton('edit', 'edit'),
                    new DynamicTableButton('delete', 'delete', 'warn'),
                ],
            }),
        ];
        this.retrieve();
    }

    retrieve(): void {
        this.firestore
            .getAll()
            .snapshotChanges()
            .pipe(
                map((changes) =>
                    changes.map((c) => ({
                        key: c.payload.doc.id,
                        ...c.payload.doc.data(),
                    }))
                )
            )
            .subscribe((data) => {
                this.tableData = data;
                this.renderTable();
                this.isLoading = false;
            });
    }

    edit(key?: number): void {
        this.router.navigate(['/event', { key: key }]);
    }

    details(key?: string): void {
        this.router.navigate(['/eventdetails', { key: key }]);
    }

    delete(event: LanEvent): void {
        this.dialog
            .confirmDialog(
                'Are you sure?',
                'Deleting a event cannot be undone!',
                'cancel',
                'delete'
            )
            .then((result) => {
                if (result && event.key) {
                    this.firestore
                        .delete(event.key)
                        .then(() => {
                            this.dialog.succesDialog(
                                'Succes',
                                'Event deleted!'
                            );
                            this.retrieve();
                        })
                        .catch((err) => {
                            this.dialog.errorDialog('Error', err);
                        });
                }
            });
    }

    /**
     * Renders dynamic table
     */
    renderTable(): void {
        if (this.outletRef && this.contentRef) {
            this.isLoading = true;
            this.outletRef.clear();
            this.outletRef.createEmbeddedView(this.contentRef);
            this.isLoading = false;
        }
    }

    /**
     * Handles SelectionChangeEvent
     * @param event SelectionChangeEvent
     */
    handleSelectionChangeEvent(event: any): void {
        //console.log(event);
    }

    /**
     * Handles ButtonClickEvent
     * @param event ButtonClickEvent
     */
    handleButtonClickEvent(event: DynamicTableButtonClick): void {
        if (event.button.name == 'delete') {
            this.delete(event.row);
        } else if (event.button.name == 'edit') {
            this.edit(event.row.key);
        } else if (event.button.name == 'details') {
            this.details(event.row.key);
        }
    }
}

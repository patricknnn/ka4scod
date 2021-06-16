import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { YoutubeVideo } from 'src/app/models/youtube-video';
import { DynamicTableButton } from 'src/app/modules/dynamic-tables/models/dynamic-table-button';
import { DynamicTableButtonClick } from 'src/app/modules/dynamic-tables/models/dynamic-table-button-click';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { VideoService } from 'src/app/services/firestore/video.service';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-view-videos',
    templateUrl: './view-videos.component.html',
    styleUrls: ['./view-videos.component.scss'],
})
export class ViewVideosComponent implements OnInit {
    tableData: YoutubeVideo[] = [];
    tableConfig?: DynamicTableConfig;
    columnConfig: DynamicTableColumnConfig[] = [];
    isLoading: boolean = true;
    @ViewChild('outlet', { read: ViewContainerRef })
    outletRef?: ViewContainerRef;
    @ViewChild('content', { read: TemplateRef }) contentRef?: TemplateRef<any>;

    constructor(
        private firestore: VideoService,
        private tables: TableService,
        private dialog: DialogService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.tableConfig = this.tables.getTableConfig();
        this.columnConfig = [
            new DynamicTableColumnConfig({
                key: 'title',
                header: 'Title',
                sortable: true,
                draggable: true,
            }),
            new DynamicTableColumnConfig({
                key: 'player',
                header: 'Player',
                sortable: true,
                draggable: true,
            }),
            new DynamicTableColumnConfig({
                key: 'game',
                header: 'Game',
                sortable: true,
                draggable: true,
            }),
            new DynamicTableColumnConfig({
                key: 'buttons',
                header: 'Actions',
                buttons: [
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
        this.router.navigate(['/video', { key: key }]);
    }

    delete(video: YoutubeVideo): void {
        this.dialog
            .confirmDialog(
                'Are you sure?',
                'Deleting a video cannot be undone!',
                'cancel',
                'delete'
            )
            .then((result) => {
                if (result && video.key) {
                    this.firestore
                        .delete(video.key)
                        .then(() => {
                            this.dialog.succesDialog(
                                'Succes',
                                'Video deleted!'
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
        }
    }
}

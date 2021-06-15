import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LifetimeStats } from 'src/app/models/lifetime-stats';
import { Player } from 'src/app/models/player';
import { WarzoneStats } from 'src/app/models/warzone-stats';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import {
    CodApiPlayer,
    NodeRestApiService,
} from 'src/app/services/node-rest-api.service';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-player-table',
    templateUrl: './player-table.component.html',
    styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
    elevation: string = 'mat-elevation-z4';
    player?: Player;
    stats?: LifetimeStats;
    mpStats?: any;
    wzStats?: any;
    isLoading: boolean = true;
    tableData: any[] = [];
    tableConfig?: DynamicTableConfig;
    columnConfig: DynamicTableColumnConfig[] = [];
    @ViewChild('outlet', { read: ViewContainerRef })
    outletRef?: ViewContainerRef;
    @ViewChild('content', { read: TemplateRef }) contentRef?: TemplateRef<any>;

    constructor(
        private firestore: PlayerService,
        private tables: TableService,
        private api: NodeRestApiService,
        private dialog: DialogService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.tableConfig = this.tables.getTableConfig();
        let key = this.route.snapshot.paramMap.get('key');
        if (key && key != 'undefined') {
            this.retrievePlayer(key);
        } else {
            this.router.navigate(['/404']);
        }
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
     * Builds column config based on tableData
     */
    buildColumns(): void {
        this.columnConfig = [
            new DynamicTableColumnConfig({
                key: 'property',
                header: 'Property',
                sortable: true,
                draggable: true,
            }),
            new DynamicTableColumnConfig({
                key: 'value',
                header: 'Value',
                sortable: true,
                draggable: true,
            }),
        ];
    }

    /**
     * Retrieve player
     * @param key Players key
     */
    retrievePlayer(key: string): void {
        this.firestore
            .getByKey(key)
            .snapshotChanges()
            .pipe(map((c) => ({ key: c.payload.id, ...c.payload.data() })))
            .subscribe((data) => {
                this.player = data;
                this.retrieveLifetimeData();
            });
    }

    /**
     * Get lifetime data
     * @returns Promise<{ name: string, data: any }[]>
     */
    retrieveLifetimeData(): void {
        if (this.player) {
            let apiPlayer: CodApiPlayer = {
                name: this.player.name || '',
                gamertag: this.player.gamertag || '',
                platform: this.player.platform || 'battle',
            };
            // mp
            this.api
                .getLifetimeStats(apiPlayer)
                .then((res: LifetimeStats) => {
                    if (res.lifetime) {
                        this.mpStats = res;
                        this.getMpData();
                    }
                })
                .catch((error) => {
                    this.dialog.errorDialog('Error', JSON.stringify(error));
                });
            // wz
            this.api
                .getWarzoneStats(apiPlayer)
                .then((res: WarzoneStats) => {
                    if (res.br_all) {
                        this.wzStats = res;
                    }
                })
                .catch((error) => {
                    this.dialog.errorDialog('Error', JSON.stringify(error));
                });
        }
    }

    secondsToHms(d: number): string {
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);
        var hDisplay = h > 0 ? h + 'h, ' : '';
        var mDisplay = m > 0 ? m + 'm, ' : '';
        var sDisplay = s > 0 ? s + 's' : '';
        return hDisplay + mDisplay + sDisplay;
    }

    /**
     * Mp
     */
    getMpData(): void {
        // empty
        this.tableData = [];
        // data
        for (const property in this.mpStats?.lifetime.all.properties) {
            this.tableData.push({
                property: property,
                value: this.mpStats?.lifetime.all.properties[property],
            });
        }
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Warzone
     */
    getWarzoneData(): void {
        // empty
        this.tableData = [];
        // data
        for (const property in this.wzStats?.br_all) {
            this.tableData.push({
                property: property,
                value: this.wzStats?.br_all[property],
            });
        }
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
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
    handleButtonClickEvent(event: any): void {
        //console.log(event);
    }
}

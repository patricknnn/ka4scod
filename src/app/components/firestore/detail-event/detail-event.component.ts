import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LanEvent, LanEventPlayer } from 'src/app/models/event';
import { LifetimeStats } from 'src/app/models/lifetime-stats';
import { Player } from 'src/app/models/player';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { EventService } from 'src/app/services/firestore/event.service';
import {
    CodApiPlayer,
    NodeRestApiService,
} from 'src/app/services/node-rest-api.service';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-detail-event',
    templateUrl: './detail-event.component.html',
    styleUrls: ['./detail-event.component.scss'],
})
export class DetailEventComponent implements OnInit {
    event: LanEvent = {};
    eventEnded: boolean = true;
    isLoading: boolean = true;
    isLoadingCurrent: boolean = true;
    elevation: string = 'mat-elevation-z4';
    tableData: any[] = [];
    tableConfig?: DynamicTableConfig;
    columnConfig: DynamicTableColumnConfig[] = [];
    @ViewChild('outlet', { read: ViewContainerRef })
    outletRef?: ViewContainerRef;
    @ViewChild('content', { read: TemplateRef }) contentRef?: TemplateRef<any>;

    constructor(
        private firestore: EventService,
        private api: NodeRestApiService,
        private tables: TableService,
        private dialog: DialogService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.tableConfig = this.tables.getTableConfig();
        let key = this.route.snapshot.paramMap.get('key');
        if (key && key != 'undefined') {
            this.retrieve(key);
        } else {
            this.dialog.errorDialog('Error', 'Event key not supplied!');
        }
    }

    retrieve(key: string): void {
        this.firestore
            .getByKey(key)
            .snapshotChanges()
            .pipe(map((c) => ({ key: c.payload.id, ...c.payload.data() })))
            .subscribe((data) => {
                this.event = data;
                this.eventEnded = data.endDate ? true : false;
                if (!this.eventEnded) {
                    this.getCurrentLifetimeData();
                }
                this.getStats('statsStart');
            });
    }

    endEvent(): void {
        this.dialog
            .confirmDialog(
                'Are you sure?',
                'Ending an event will fetch final stats!',
                'cancel',
                'end'
            )
            .then((result) => {
                if (result) {
                    let count = 0;
                    this.event.endDate = this.getCurrentDate();
                    this.event.players?.forEach((player) => {
                        if (player.player) {
                            this.getLifetimeData(player.player).then((res) => {
                                count++;
                                player.statsEnd = res;
                                if (count == this.event.players?.length) {
                                    this.save();
                                }
                            });
                        }
                    });
                }
            });
    }

    /**
     * Current lifetime data for all players
     */
    getCurrentLifetimeData(): void {
        let count = 0;
        this.event.currentDate = this.getCurrentDate();
        this.event.players?.forEach((player) => {
            if (player.player) {
                this.getLifetimeData(player.player).then((res) => {
                    count++;
                    player.statsCurrent = res;
                    if (count == this.event.players?.length) {
                        this.isLoadingCurrent = false;
                    }
                });
            }
        });
    }

    /**
     * Current date string
     * @returns string
     */
    getCurrentDate(): string {
        return new Date().toISOString();
    }

    /**
     * Save to firebase
     */
    save(): void {
        if (this.event.key) {
            this.firestore
                .update(this.event.key, this.event)
                .then(() => {
                    this.dialog.succesDialog('Succes', 'Event ended!');
                })
                .catch((err) => {
                    this.dialog.errorDialog('Error', err);
                });
        }
    }

    /**
     * Get lifetime data for player
     * @returns Promise<{ name: string, data: any }[]>
     */
    getLifetimeData(player: Player): Promise<LifetimeStats> {
        return new Promise((resolve, reject) => {
            let apiPlayer: CodApiPlayer = {
                name: player.name || '',
                gamertag: player.gamertag || '',
                platform: player.platform || 'battle',
            };
            this.api
                .getLifetimeStats(apiPlayer)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
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
     * Builds column config based on tableData
     */
    buildColumns(): void {
        this.columnConfig = [];
        for (const property in this.tableData[0]) {
            this.columnConfig.push(
                new DynamicTableColumnConfig({
                    key: property,
                    header: property,
                    sortable: true,
                    draggable: true,
                })
            );
        }
    }

    /**
     * PLayer stats
     */
    getPlayerStats(player: LanEventPlayer): void {
        // empty
        this.tableData = [];
        // data
        for (const property in player.statsStart?.lifetime.all.properties) {
            if (player.statsCurrent) {
                this.tableData.push({
                    property: property,
                    start: player.statsStart?.lifetime.all.properties[property],
                    current:
                        player.statsCurrent?.lifetime.all.properties[property],
                    compared:
                        player.statsCurrent?.lifetime.all.properties[property] -
                        player.statsStart?.lifetime.all.properties[property],
                });
            } else {
                this.tableData.push({
                    property: property,
                    start: player.statsStart?.lifetime.all.properties[property],
                    end: player.statsEnd?.lifetime.all.properties[property],
                    compared:
                        player.statsEnd?.lifetime.all.properties[property] -
                        player.statsStart?.lifetime.all.properties[property],
                });
            }
        }
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Fetch desired stats
     * @param stats 'statsCurrent' | 'statsStart' | 'statsEnd' | 'statsCompared'
     */
    getStats(
        stats: 'statsCurrent' | 'statsStart' | 'statsEnd' | 'statsCompared'
    ): void {
        // empty
        this.tableData = [];
        // data
        if (stats == 'statsCompared') {
            // end data
            this.event.players?.forEach((entry) => {
                let lifetime = entry.statsStart;
                let lifetimeCompare = this.eventEnded
                    ? entry.statsEnd
                    : entry.statsCurrent;
                if (entry.player?.name && lifetime && lifetimeCompare) {
                    this.pushComparedTableData(
                        entry.player.name,
                        lifetime,
                        lifetimeCompare
                    );
                }
            });
        } else {
            this.event.players?.forEach((entry) => {
                let lifetime = entry[stats];
                if (entry.player?.name && lifetime) {
                    this.pushTableData(entry.player.name, lifetime);
                }
            });
        }
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Push table data
     */
    pushTableData(name: string, stats: LifetimeStats): void {
        this.tableData.push({
            Name: name,
            Games: stats.lifetime.all.properties.gamesPlayed,
            Kills: stats.lifetime.all.properties.kills,
            Deaths: stats.lifetime.all.properties.deaths,
            KD: Math.round(stats.lifetime.all.properties.kdRatio * 100) / 100,
            Hits: stats.lifetime.all.properties.hits,
            Accuracy:
                Math.round(stats.lifetime.all.properties.accuracy * 100) / 100,
        });
    }

    /**
     * Push compared table data
     */
    pushComparedTableData(
        name: string,
        stats: LifetimeStats,
        compareStats: LifetimeStats
    ): void {
        this.tableData.push({
            Name: name,
            Games:
                compareStats.lifetime.all.properties.gamesPlayed -
                stats.lifetime.all.properties.gamesPlayed,
            Kills:
                compareStats.lifetime.all.properties.kills -
                stats.lifetime.all.properties.kills,
            Deaths:
                compareStats.lifetime.all.properties.deaths -
                stats.lifetime.all.properties.deaths,
            Hits:
                compareStats.lifetime.all.properties.hits -
                stats.lifetime.all.properties.hits,
            Kar98k:
                compareStats.lifetime.itemData.weapon_marksman.iw8_sn_kilo98
                    .properties.kills -
                stats.lifetime.itemData.weapon_marksman.iw8_sn_kilo98.properties
                    .kills,
            SPR208:
                compareStats.lifetime.itemData.weapon_marksman.iw8_sn_romeo700
                    .properties.kills -
                stats.lifetime.itemData.weapon_marksman.iw8_sn_romeo700
                    .properties.kills,
        });
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

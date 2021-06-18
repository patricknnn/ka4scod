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
import { StatsService } from 'src/app/services/stats.service';
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
        private route: ActivatedRoute,
        private stats: StatsService
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
                    player.statsCurrent =
                        this.stats.convertLifetimeStatsToPlayerStatsLifetime(
                            res
                        );
                    if (count == this.event.players?.length) {
                        this.getComparedStats();
                        this.isLoadingCurrent = false;
                    }
                });
            }
        });
    }

    /**
     * Save to firebase
     */
    save(): void {
        //this.getComparedStats();
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
                                player.statsEnd =
                                    this.stats.convertLifetimeStatsToPlayerStatsLifetime(
                                        res
                                    );
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
     * Compared stats
     */
    getComparedStats(): void {
        this.event.players?.forEach((player) => {
            player.statsCompared = {};
            for (const property in player.statsStart) {
                if (player.statsCurrent) {
                    player.statsCompared[property] =
                        player.statsCurrent[property] -
                        player.statsStart[property];
                } else if (player.statsEnd) {
                    player.statsCompared[property] =
                        player.statsEnd[property] - player.statsStart[property];
                }
            }
        });
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
        if (this.event.players) {
            let list: any = this.event.players[0];
            for (const property in list[stats]) {
                let obj: any = {};
                obj['statistic'] = property;
                for (
                    let index = 0;
                    index < this.event.players.length;
                    index++
                ) {
                    let player = this.event.players[index].player?.name || '';
                    let statsList: any = this.event.players[index];
                    obj[player] = statsList[stats][property];
                }
                this.tableData.push(obj);
            }
        }
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Current date string
     * @returns string
     */
    getCurrentDate(): string {
        return new Date().toISOString();
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
        this.columnConfig.push(
            new DynamicTableColumnConfig({
                key: 'statistic',
                header: 'Statistic',
                sortable: true,
                draggable: true,
            })
        );
        if (this.event.players) {
            this.event.players?.forEach((player) => {
                this.columnConfig.push(
                    new DynamicTableColumnConfig({
                        key: player.player?.name || '',
                        header: player.player?.name || '',
                        sortable: true,
                        draggable: true,
                    })
                );
            });
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
    handleButtonClickEvent(event: any): void {
        //console.log(event);
    }
}

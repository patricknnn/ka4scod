import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LanEvent } from 'src/app/models/event';
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
                this.getStartStats();
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
                                    console.log(this.event);
                                    this.save();
                                }
                            });
                        }
                    });
                }
            });
    }

    getCurrentDate(): string {
        return new Date().toISOString();
    }

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
     * Compared
     */
    getComparedStats(): void {
        // empty
        this.tableData = [];
        // data
        this.event.players?.forEach((entry) => {
            if (
                entry.statsStart?.lifetime.all.properties &&
                entry.statsEnd?.lifetime.all.properties
            ) {
                this.tableData.push({
                    Name: entry.player?.name,
                    Games:
                        entry.statsEnd?.lifetime.all.properties.gamesPlayed -
                            entry.statsStart?.lifetime.all.properties
                                .gamesPlayed || null,
                    Kills:
                        entry.statsEnd?.lifetime.all.properties.kills -
                            entry.statsStart?.lifetime.all.properties.kills ||
                            null,
                    Deaths:
                        entry.statsEnd?.lifetime.all.properties.deaths -
                            entry.statsStart?.lifetime.all.properties.deaths ||
                            null,
                    Hits:
                        entry.statsEnd?.lifetime.all.properties.hits -
                            entry.statsStart?.lifetime.all.properties.hits || null,
                });
            }
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Start
     */
    getStartStats(): void {
        // empty
        this.tableData = [];
        // data
        this.event.players?.forEach((entry) => {
            this.tableData.push({
                Name: entry.player?.name,
                Games: entry.statsStart?.lifetime.all.properties
                    ? entry.statsStart?.lifetime.all.properties.gamesPlayed
                    : null,
                Kills: entry.statsStart?.lifetime.all.properties
                    ? entry.statsStart?.lifetime.all.properties.kills
                    : null,
                Deaths: entry.statsStart?.lifetime.all.properties
                    ? entry.statsStart?.lifetime.all.properties.deaths
                    : null,
                KD: entry.statsStart?.lifetime.all.properties
                    ? Math.round(
                          entry.statsStart?.lifetime.all.properties.kdRatio *
                              100
                      ) / 100
                    : null,
                Hits: entry.statsStart?.lifetime.all.properties
                    ? entry.statsStart?.lifetime.all.properties.hits
                    : null,
                Accuracy: entry.statsStart?.lifetime.all.properties
                    ? Math.round(
                          entry.statsStart?.lifetime.all.properties.accuracy *
                              100
                      ) / 100
                    : null,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * End
     */
    getEndStats(): void {
        // empty
        this.tableData = [];
        // data
        this.event.players?.forEach((entry) => {
            this.tableData.push({
                Name: entry.player?.name,
                Games: entry.statsEnd?.lifetime.all.properties
                    ? entry.statsEnd?.lifetime.all.properties.gamesPlayed
                    : null,
                Kills: entry.statsEnd?.lifetime.all.properties
                    ? entry.statsEnd?.lifetime.all.properties.kills
                    : null,
                Deaths: entry.statsEnd?.lifetime.all.properties
                    ? entry.statsEnd?.lifetime.all.properties.deaths
                    : null,
                KD: entry.statsEnd?.lifetime.all.properties
                    ? Math.round(
                          entry.statsEnd?.lifetime.all.properties.kdRatio * 100
                      ) / 100
                    : null,
                Hits: entry.statsEnd?.lifetime.all.properties
                    ? entry.statsEnd?.lifetime.all.properties.hits
                    : null,
                Accuracy: entry.statsEnd?.lifetime.all.properties
                    ? Math.round(
                          entry.statsEnd?.lifetime.all.properties.accuracy * 100
                      ) / 100
                    : null,
            });
        });
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

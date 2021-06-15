import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { LifetimeStats } from 'src/app/models/lifetime-stats';
import { Player } from 'src/app/models/player';
import { WarzoneStats } from 'src/app/models/warzone-stats';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import {
    NodeRestApiService,
    CodApiPlayer,
} from 'src/app/services/node-rest-api.service';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-stats-mp-table',
    templateUrl: './stats-mp-table.component.html',
    styleUrls: ['./stats-mp-table.component.scss'],
})
export class StatsMpTableComponent implements OnInit {
    tableData: any[] = [];
    tableConfig?: DynamicTableConfig;
    columnConfig: DynamicTableColumnConfig[] = [];
    data: { name: string; data: LifetimeStats }[] = [];
    isLoading: boolean = true;
    @ViewChild('outlet', { read: ViewContainerRef })
    outletRef?: ViewContainerRef;
    @ViewChild('content', { read: TemplateRef }) contentRef?: TemplateRef<any>;

    /**
     * Initialize
     * @param tables TableService
     * @param api NodeRestApiService
     * @param dialog DialogService
     */
    constructor(
        private tables: TableService,
        private api: NodeRestApiService,
        private dialog: DialogService,
        private firestore: PlayerService
    ) {}

    /***
     * Get data
     */
    ngOnInit(): void {
        this.tableConfig = this.tables.getTableConfig();
        this.getLifetimeData().then((res) => {
            this.data = res;
            this.getLifetime();
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

    /**
     * Get lifetime data
     * @returns Promise<{ name: string, data: any }[]>
     */
    getLifetimeData(): Promise<{ name: string; data: LifetimeStats }[]> {
        return new Promise((resolve, reject) => {
            let data: any[] = [];
            let count = 0;
            this.getPlayers().then((players) => {
                players.forEach((player) => {
                    let apiPlayer: CodApiPlayer = {
                        name: player.name || '',
                        gamertag: player.gamertag || '',
                        platform: player.platform || 'battle',
                    };
                    this.api
                        .getLifetimeStats(apiPlayer)
                        .then((res: LifetimeStats) => {
                            if (res.lifetime) {
                                let name = player.name;
                                data.push({ name: name, data: res });
                            }
                            count++;
                            if (count == players.length) {
                                resolve(data);
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            });
        });
    }

    getPlayers(): Promise<Player[]> {
        return new Promise((resolve, reject) => {
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
                    resolve(data);
                });
        });
    }

    /**
     * Lifetime
     */
    getLifetime(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                Name: entry.name,
                Kills: entry.data.lifetime.all.properties.kills,
                Deaths: entry.data.lifetime.all.properties.deaths,
                KD:
                    Math.round(
                        entry.data.lifetime.all.properties.kdRatio * 100
                    ) / 100,
                Accuracy:
                    Math.round(
                        entry.data.lifetime.all.properties.accuracy * 100
                    ) / 100,
                BestKills: entry.data.lifetime.all.properties.bestKills,
                BestKD: entry.data.lifetime.all.properties.bestKD,
                BestKillstreak:
                    entry.data.lifetime.all.properties.bestKillStreak,
                CurrentWinstreak:
                    entry.data.lifetime.all.properties.currentWinStreak,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Weekly
     */
    getWeekly(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                Name: entry.name,
                Kills: entry.data.weekly.all.properties
                    ? entry.data.weekly.all.properties.kills
                    : null,
                Deaths: entry.data.weekly.all.properties
                    ? entry.data.weekly.all.properties.deaths
                    : null,
                KD: entry.data.weekly.all.properties
                    ? Math.round(
                          entry.data.weekly.all.properties.kdRatio * 100
                      ) / 100
                    : null,
                Accuracy: entry.data.weekly.all.properties
                    ? Math.round(
                          entry.data.weekly.all.properties.accuracy * 100
                      ) / 100
                    : null,
                Damage: entry.data.weekly.all.properties
                    ? entry.data.weekly.all.properties.damageDone
                    : null,
                Matches: entry.data.weekly.all.properties
                    ? entry.data.weekly.all.properties.matchesPlayed
                    : null,
                Wallbangs: entry.data.weekly.all.properties
                    ? entry.data.weekly.all.properties.wallBangs
                    : null,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }
}

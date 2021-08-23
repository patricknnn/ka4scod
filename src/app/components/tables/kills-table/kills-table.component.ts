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
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/firestore/auth.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import {
    CodApiPlayer,
    NodeRestApiService,
} from 'src/app/services/node-rest-api.service';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-kills-table',
    templateUrl: './kills-table.component.html',
    styleUrls: ['./kills-table.component.scss'],
})
export class KillsTableComponent implements OnInit {
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
        private firestore: PlayerService,
        private authService: AuthService
    ) {}

    /***
     * Get data
     */
    ngOnInit(): void {
        this.tableConfig = this.tables.getTableConfig();
        this.getLifetimeData().then((res) => {
            this.isLoading = false;
            this.data = res;
            this.getMarksmanKillData();
        });
    }

    isSsoTokenSet(): boolean {
        return !!this.authService.loggedInUser?.ssoToken;
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
    getLifetimeData(): Promise<{ name: string; data: any }[]> {
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
                            let name = player.name;
                            if (res.lifetime) {
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
     * Shotgun
     */
    getShottyData(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                Name: entry.name,
                Total: entry.data.lifetime.all.properties.kills,
                AA12: entry.data.lifetime.itemData.weapon_shotgun
                    .iw8_sh_aalpha12.properties.kills,
                C725: entry.data.lifetime.itemData.weapon_shotgun
                    .iw8_sh_charlie725.properties.kills,
                DP12: entry.data.lifetime.itemData.weapon_shotgun.iw8_sh_dpapa12
                    .properties.kills,
                M26: entry.data.lifetime.itemData.weapon_shotgun.iw8_sh_mike26
                    .properties.kills,
                Origin12:
                    entry.data.lifetime.itemData.weapon_shotgun.iw8_sh_oscar12
                        .properties.kills,
                R870: entry.data.lifetime.itemData.weapon_shotgun
                    .iw8_sh_romeo870.properties.kills,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * LMG
     */
    getLmgData(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                Name: entry.name,
                Total: entry.data.lifetime.all.properties.kills,
                M91: entry.data.lifetime.itemData.weapon_lmg.iw8_lm_kilo121
                    .properties.kills,
                SA87: entry.data.lifetime.itemData.weapon_lmg.iw8_lm_lima86
                    .properties.kills,
                MG34: entry.data.lifetime.itemData.weapon_lmg.iw8_lm_mgolf34
                    .properties.kills,
                Holger: entry.data.lifetime.itemData.weapon_lmg.iw8_lm_mgolf36
                    .properties.kills,
                MK3: entry.data.lifetime.itemData.weapon_lmg.iw8_lm_mkilo3
                    .properties.kills,
                PKM: entry.data.lifetime.itemData.weapon_lmg.iw8_lm_pkilo
                    .properties.kills,
                SX: entry.data.lifetime.itemData.weapon_lmg.iw8_lm_sierrax
                    .properties.kills,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Pistol
     */
    getPistolData(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                Name: entry.name,
                Total: entry.data.lifetime.all.properties.kills,
                CP: entry.data.lifetime.itemData.weapon_pistol.iw8_pi_cpapa
                    .properties.kills,
                DE: entry.data.lifetime.itemData.weapon_pistol.iw8_pi_decho
                    .properties.kills,
                G21: entry.data.lifetime.itemData.weapon_pistol.iw8_pi_golf21
                    .properties.kills,
                M1911: entry.data.lifetime.itemData.weapon_pistol
                    .iw8_pi_mike1911.properties.kills,
                M9: entry.data.lifetime.itemData.weapon_pistol.iw8_pi_mike9
                    .properties.kills,
                P320: entry.data.lifetime.itemData.weapon_pistol.iw8_pi_papa320
                    .properties.kills,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Launcher
     */
    getLauncherData(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                Name: entry.name,
                Total: entry.data.lifetime.all.properties.kills,
                GR: entry.data.lifetime.itemData.weapon_launcher.iw8_la_gromeo
                    .properties.kills,
                JL: entry.data.lifetime.itemData.weapon_launcher.iw8_la_juliet
                    .properties.kills,
                KG: entry.data.lifetime.itemData.weapon_launcher.iw8_la_kgolf
                    .properties.kills,
                MGL32: entry.data.lifetime.itemData.weapon_launcher
                    .iw8_la_mike32.properties.kills,
                RPG7: entry.data.lifetime.itemData.weapon_launcher.iw8_la_rpapa7
                    .properties.kills,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Melee
     */
    getMeleeKillData(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                Name: entry.name,
                Total: entry.data.lifetime.all.properties.kills,
                Knife: entry.data.lifetime.itemData.weapon_melee.iw8_knife
                    .properties.kills,
                Kodachis:
                    entry.data.lifetime.itemData.weapon_melee
                        .iw8_me_akimboblades.properties.kills,
                Kali: entry.data.lifetime.itemData.weapon_melee
                    .iw8_me_akimboblunt.properties.kills,
                Riot: entry.data.lifetime.itemData.weapon_other
                    .iw8_me_riotshield.properties.kills,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * SMG
     */
    getSmgKillData(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                Name: entry.name,
                Total: entry.data.lifetime.all.properties.kills,
                AUG: entry.data.lifetime.itemData.weapon_smg.iw8_sm_augolf
                    .properties.kills,
                Bizon: entry.data.lifetime.itemData.weapon_smg.iw8_sm_beta
                    .properties.kills,
                CX9: entry.data.lifetime.itemData.weapon_smg.iw8_sm_charlie9
                    .properties.kills,
                MP5: entry.data.lifetime.itemData.weapon_smg.iw8_sm_mpapa5
                    .properties.kills,
                MP7: entry.data.lifetime.itemData.weapon_smg.iw8_sm_mpapa7
                    .properties.kills,
                P90: entry.data.lifetime.itemData.weapon_smg.iw8_sm_papa90
                    .properties.kills,
                Striker:
                    entry.data.lifetime.itemData.weapon_smg.iw8_sm_smgolf45
                        .properties.kills,
                Uzi: entry.data.lifetime.itemData.weapon_smg.iw8_sm_uzulu
                    .properties.kills,
                Fennec: entry.data.lifetime.itemData.weapon_smg.iw8_sm_victor
                    .properties.kills,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Marksman
     */
    getMarksmanKillData(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                Name: entry.name,
                Total: entry.data.lifetime.all.properties.kills,
                Kar98k: entry.data.lifetime.itemData.weapon_marksman
                    .iw8_sn_kilo98.properties.kills,
                SPR208: entry.data.lifetime.itemData.weapon_marksman
                    .iw8_sn_romeo700.properties.kills,
                MK2Carbine:
                    entry.data.lifetime.itemData.weapon_marksman.iw8_sn_sbeta
                        .properties.kills,
                SKS: entry.data.lifetime.itemData.weapon_marksman
                    .iw8_sn_sksierra.properties.kills,
                Crossbow:
                    entry.data.lifetime.itemData.weapon_marksman.iw8_sn_crossbow
                        .properties.kills,
                EBR14: entry.data.lifetime.itemData.weapon_marksman
                    .iw8_sn_mike14.properties.kills,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Sniper
     */
    getSniperKillData(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                Name: entry.name,
                Total: entry.data.lifetime.all.properties.kills,
                AX50: entry.data.lifetime.itemData.weapon_sniper.iw8_sn_alpha50
                    .properties.kills,
                Dragunov:
                    entry.data.lifetime.itemData.weapon_sniper.iw8_sn_delta
                        .properties.kills,
                HDR: entry.data.lifetime.itemData.weapon_sniper.iw8_sn_hdromeo
                    .properties.kills,
                Rytec: entry.data.lifetime.itemData.weapon_sniper
                    .iw8_sn_xmike109.properties.kills,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }

    /**
     * Assault
     */
    getAssaultKillData(): void {
        // empty
        this.tableData = [];
        // data
        this.data.forEach((entry) => {
            this.tableData.push({
                name: entry.name,
                Total: entry.data.lifetime.all.properties.kills,
                AK47: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_akilo47.properties.kills,
                AN94: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_anovember94.properties.kills,
                Oden: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_asierra12.properties.kills,
                FAL: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_falima.properties.kills,
                FR56: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_falpha.properties.kills,
                AMAX: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_galima.properties.kills,
                Kilo: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_kilo433.properties.kills,
                M13: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_mcharlie.properties.kills,
                M4A1: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_mike4.properties.kills,
                Scar: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_scharlie.properties.kills,
                Grau: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_sierra552.properties.kills,
                RAM7: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_tango21.properties.kills,
                ASVAL: entry.data.lifetime.itemData.weapon_assault_rifle
                    .iw8_ar_valpha.properties.kills,
            });
        });
        // columns
        this.buildColumns();
        // render table
        this.renderTable();
    }
}

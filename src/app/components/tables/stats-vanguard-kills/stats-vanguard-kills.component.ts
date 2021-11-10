import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/models/player';
import { VanguardLifetimeStats } from 'src/app/models/vanguard-stats';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/firestore/auth.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import { NodeRestApiService, CodApiPlayer } from 'src/app/services/node-rest-api.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-stats-vanguard-kills',
  templateUrl: './stats-vanguard-kills.component.html',
  styleUrls: ['./stats-vanguard-kills.component.scss']
})
export class StatsVanguardKillsComponent implements OnInit {
  tableData: any[] = [];
  tableConfig?: DynamicTableConfig;
  columnConfig: DynamicTableColumnConfig[] = [];
  data: { name: string; data: VanguardLifetimeStats }[] = [];
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
  ) { }

  /***
   * Get data
   */
  ngOnInit(): void {
    this.tableConfig = this.tables.getTableConfig();
    if (this.isSsoTokenSet()) {
      this.getLifetimeData().then((res) => {
        this.isLoading = false;
        this.data = res;
        this.getSniperKillData();
      });
    }
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
            .getVanguardStats(apiPlayer)
            .then((res: VanguardLifetimeStats) => {
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
        Total: entry.data.lifetime?.all.properties?.kills || 0,
        sh_lindia98: entry.data.lifetime?.itemData?.weapon_shotgun.s4_sh_lindia98.properties?.kills || 0,
        sh_mike97: entry.data.lifetime?.itemData?.weapon_shotgun.s4_sh_mike97.properties?.kills || 0,
        sh_bromeo5: entry.data.lifetime?.itemData?.weapon_shotgun.s4_sh_bromeo5.properties?.kills || 0,
        sh_becho: entry.data.lifetime?.itemData?.weapon_shotgun.s4_sh_becho.properties?.kills || 0,
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
        Total: entry.data.lifetime?.all.properties?.kills || 0,
        lmg_palpha: entry.data.lifetime?.itemData?.weapon_lmg.s4_la_palpha.properties?.kills || 0,
        lmg_m1bravo: entry.data.lifetime?.itemData?.weapon_lmg.s4_la_m1bravo.properties?.kills || 0,
        lmg_walpha2: entry.data.lifetime?.itemData?.weapon_lmg.s4_la_walpha2.properties?.kills || 0,
        lmg_mkilo1: entry.data.lifetime?.itemData?.weapon_lmg.s4_la_mkilo1.properties?.kills || 0,
        lmg_palpha42: entry.data.lifetime?.itemData?.weapon_lmg.s4_la_palpha42.properties?.kills || 0,
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
        Total: entry.data.lifetime?.all.properties?.kills || 0,
        pi_ttango33: entry.data.lifetime?.itemData?.weapon_pistol.s4_pi_ttango33.properties?.kills || 0,
        pi_wecho: entry.data.lifetime?.itemData?.weapon_pistol.s4_pi_wecho.properties?.kills || 0,
        pi_malpha96: entry.data.lifetime?.itemData?.weapon_pistol.s4_pi_malpha96.properties?.kills || 0,
        pi_luniform08: entry.data.lifetime?.itemData?.weapon_pistol.s4_pi_luniform08.properties?.kills || 0,
        pi_mike1911: entry.data.lifetime?.itemData?.weapon_pistol.s4_pi_mike1911.properties?.kills || 0,
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
        Total: entry.data.lifetime?.all.properties?.kills || 0,
        melee_knife: entry.data.lifetime?.itemData?.weapon_melee.s4_me_knife.properties?.kills || 0,
        melee_fists: entry.data.lifetime?.itemData?.weapon_melee.s4_me_fists.properties?.kills || 0,
        melee_katana: entry.data.lifetime?.itemData?.weapon_melee.s4_me_katana.properties?.kills || 0,
        melee_rindigo: entry.data.lifetime?.itemData?.weapon_melee.s4_me_rindigo.properties?.kills || 0,
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
        Total: entry.data.lifetime?.all.properties?.kills || 0,
        smg_mgolf42: entry.data.lifetime?.itemData?.weapon_smg.s4_mg_mgolf42.properties?.kills || 0,
        smg_streak: entry.data.lifetime?.itemData?.weapon_smg.s4_mg_streak.properties?.kills || 0,
        smg_dpapa27: entry.data.lifetime?.itemData?.weapon_smg.s4_mg_dpapa27.properties?.kills || 0,
        smg_bromeo37: entry.data.lifetime?.itemData?.weapon_smg.s4_mg_bromeo37.properties?.kills || 0,
        smg_tyankee11: entry.data.lifetime?.itemData?.weapon_smg.s4_mg_tyankee11.properties?.kills || 0,
        smg_juniform: entry.data.lifetime?.itemData?.weapon_smg.s4_mg_juniform.properties?.kills || 0,
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
        Total: entry.data.lifetime?.all.properties?.kills || 0,
        Mosin: entry.data.lifetime?.itemData?.weapon_sniper.s4_mr_moscar.properties?.kills || 0,
        mr_ptango41: entry.data.lifetime?.itemData?.weapon_sniper.s4_mr_ptango41.properties?.kills || 0,
        mr_gecho43: entry.data.lifetime?.itemData?.weapon_sniper.s4_mr_gecho43.properties?.kills || 0,
        mr_aromeo99: entry.data.lifetime?.itemData?.weapon_sniper.s4_mr_aromeo99.properties?.kills || 0,
        mr_lecho: entry.data.lifetime?.itemData?.weapon_sniper.s4_mr_lecho.properties?.kills || 0,
        Kar98k: entry.data.lifetime?.itemData?.weapon_sniper.s4_mr_kalpha98.properties?.kills || 0,
        mr_svictor40: entry.data.lifetime?.itemData?.weapon_sniper.s4_mr_svictor40.properties?.kills || 0,
        mr_m1golf: entry.data.lifetime?.itemData?.weapon_sniper.s4_mr_m1golf.properties?.kills || 0,
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
        Total: entry.data.lifetime?.all.properties?.kills || 0,
        ar_chotel15: entry.data.lifetime?.itemData?.weapon_assault_rifle.s4_ar_chotel15.properties?.kills || 0,
        ar_bromeopg: entry.data.lifetime?.itemData?.weapon_assault_rifle.s4_ar_bromeopg.properties?.kills || 0,
        ar_fecho: entry.data.lifetime?.itemData?.weapon_assault_rifle.s4_ar_fecho.properties?.kills || 0,
        ar_balpha: entry.data.lifetime?.itemData?.weapon_assault_rifle.s4_ar_balpha.properties?.kills || 0,
        ar_hyankee44: entry.data.lifetime?.itemData?.weapon_assault_rifle.s4_ar_hyankee44.properties?.kills || 0,
        ar_chotel41: entry.data.lifetime?.itemData?.weapon_assault_rifle.s4_ar_chotel41.properties?.kills || 0,
        ar_asierra44: entry.data.lifetime?.itemData?.weapon_assault_rifle.s4_ar_asierra44.properties?.kills || 0,
        ar_stango44: entry.data.lifetime?.itemData?.weapon_assault_rifle.s4_ar_stango44.properties?.kills || 0,
        ar_voscar: entry.data.lifetime?.itemData?.weapon_assault_rifle.s4_ar_voscar.properties?.kills || 0,
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }
}

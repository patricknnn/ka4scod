import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { LifetimeStats } from 'src/app/models/lifetime-stats';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { NodeRestApiService } from 'src/app/services/node-rest-api.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-kills-table',
  templateUrl: './kills-table.component.html',
  styleUrls: ['./kills-table.component.scss']
})
export class KillsTableComponent implements OnInit {
  tableTitle: string = '';
  tableData: any[] = [];
  tableConfig?: DynamicTableConfig;
  columnConfig: DynamicTableColumnConfig[] = [];
  data: { name: string, data: any }[] = [];
  isLoading: boolean = true;
  @ViewChild("outlet", { read: ViewContainerRef }) outletRef?: ViewContainerRef;
  @ViewChild("content", { read: TemplateRef }) contentRef?: TemplateRef<any>;

  /**
   * Initialize
   * @param tables TableService
   * @param api NodeRestApiService
   * @param dialog DialogService
   */
  constructor(
    private tables: TableService,
    private api: NodeRestApiService,
    private dialog: DialogService
  ) { }

  /***
   * Get data
   */
  ngOnInit(): void {
    this.tableConfig = this.tables.getTableConfig();
    this.getLifetimeData().then((res) => {
      this.data = res;
      this.getMarksmanKillData();
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
          draggable: true
        }),
      );
    }
  }

  /**
   * Handles SelectionChangeEvent
   * @param event SelectionChangeEvent
   */
  handleSelectionChangeEvent(event: any): void {
    console.log(event);
  }

  /**
   * Handles ButtonClickEvent
   * @param event ButtonClickEvent
   */
  handleButtonClickEvent(event: any): void {
    console.log(event);
  }

  /**
   * Get lifetime data
   * @returns Promise<{ name: string, data: any }[]> 
   */
  getLifetimeData(): Promise<{ name: string, data: any }[]> {
    return new Promise((resolve, reject) => {
      let data: any[] = [];
      let count = 0;
      let players = this.api.getPlayers();
      players.forEach((player) => {
        this.api.getLifetimeStats("mp", player)
          .then((res: LifetimeStats) => {
            if (!res.lifetime) {
              this.dialog.errorDialog('Error', JSON.stringify(res));
              reject(res);
            }
            let name = player.name;
            let lifetime = res.lifetime;
            data.push({ name: name, data: lifetime });
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
  }

  /**
   * Shotgun
   */
  getShottyData(): void {
    // empty
    this.tableData = [];
    this.tableTitle = 'Kills: Shotty';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Total: entry.data.all.properties.kills,
        AA12: entry.data.itemData.weapon_shotgun.iw8_sh_aalpha12.properties.kills,
        C725: entry.data.itemData.weapon_shotgun.iw8_sh_charlie725.properties.kills,
        DP12: entry.data.itemData.weapon_shotgun.iw8_sh_dpapa12.properties.kills,
        M26: entry.data.itemData.weapon_shotgun.iw8_sh_mike26.properties.kills,
        Origin12: entry.data.itemData.weapon_shotgun.iw8_sh_oscar12.properties.kills,
        R870: entry.data.itemData.weapon_shotgun.iw8_sh_romeo870.properties.kills
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
    this.tableTitle = 'Kills: LMG';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Total: entry.data.all.properties.kills,
        M91: entry.data.itemData.weapon_lmg.iw8_lm_kilo121.properties.kills,
        SA87: entry.data.itemData.weapon_lmg.iw8_lm_lima86.properties.kills,
        MG34: entry.data.itemData.weapon_lmg.iw8_lm_mgolf34.properties.kills,
        Holger: entry.data.itemData.weapon_lmg.iw8_lm_mgolf36.properties.kills,
        MK3: entry.data.itemData.weapon_lmg.iw8_lm_mkilo3.properties.kills,
        PKM: entry.data.itemData.weapon_lmg.iw8_lm_pkilo.properties.kills,
        SX: entry.data.itemData.weapon_lmg.iw8_lm_sierrax.properties.kills
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
    this.tableTitle = 'Kills: Pistol';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Total: entry.data.all.properties.kills,
        CP: entry.data.itemData.weapon_pistol.iw8_pi_cpapa.properties.kills,
        DE: entry.data.itemData.weapon_pistol.iw8_pi_decho.properties.kills,
        G21: entry.data.itemData.weapon_pistol.iw8_pi_golf21.properties.kills,
        M1911: entry.data.itemData.weapon_pistol.iw8_pi_mike1911.properties.kills,
        M9: entry.data.itemData.weapon_pistol.iw8_pi_mike9.properties.kills,
        P320: entry.data.itemData.weapon_pistol.iw8_pi_papa320.properties.kills
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
    this.tableTitle = 'Kills: Launcher';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Total: entry.data.all.properties.kills,
        GR: entry.data.itemData.weapon_launcher.iw8_la_gromeo.properties.kills,
        JL: entry.data.itemData.weapon_launcher.iw8_la_juliet.properties.kills,
        KG: entry.data.itemData.weapon_launcher.iw8_la_kgolf.properties.kills,
        MGL32: entry.data.itemData.weapon_launcher.iw8_la_mike32.properties.kills,
        RPG7: entry.data.itemData.weapon_launcher.iw8_la_rpapa7.properties.kills
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
    this.tableTitle = 'Kills: Melee';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Total: entry.data.all.properties.kills,
        Knife: entry.data.itemData.weapon_melee.iw8_knife.properties.kills,
        Kodachis: entry.data.itemData.weapon_melee.iw8_me_akimboblades.properties.kills,
        Kali: entry.data.itemData.weapon_melee.iw8_me_akimboblunt.properties.kills,
        Riot: entry.data.itemData.weapon_other.iw8_me_riotshield.properties.kills
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
    this.tableTitle = 'Kills: SMG';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Total: entry.data.all.properties.kills,
        AUG: entry.data.itemData.weapon_smg.iw8_sm_augolf.properties.kills,
        Bizon: entry.data.itemData.weapon_smg.iw8_sm_beta.properties.kills,
        CX9: entry.data.itemData.weapon_smg.iw8_sm_charlie9.properties.kills,
        MP5: entry.data.itemData.weapon_smg.iw8_sm_mpapa5.properties.kills,
        MP7: entry.data.itemData.weapon_smg.iw8_sm_mpapa7.properties.kills,
        P90: entry.data.itemData.weapon_smg.iw8_sm_papa90.properties.kills,
        Striker: entry.data.itemData.weapon_smg.iw8_sm_smgolf45.properties.kills,
        Uzi: entry.data.itemData.weapon_smg.iw8_sm_uzulu.properties.kills,
        Fennec: entry.data.itemData.weapon_smg.iw8_sm_victor.properties.kills
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
    this.tableTitle = 'Kills: Marksman';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Total: entry.data.all.properties.kills,
        Kar98k: entry.data.itemData.weapon_marksman.iw8_sn_kilo98.properties.kills,
        SPR208: entry.data.itemData.weapon_marksman.iw8_sn_romeo700.properties.kills,
        MK2Carbine: entry.data.itemData.weapon_marksman.iw8_sn_sbeta.properties.kills,
        SKS: entry.data.itemData.weapon_marksman.iw8_sn_sksierra.properties.kills,
        Crossbow: entry.data.itemData.weapon_marksman.iw8_sn_crossbow.properties.kills,
        EBR14: entry.data.itemData.weapon_marksman.iw8_sn_mike14.properties.kills
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
    this.tableTitle = 'Kills: Sniper';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Total: entry.data.all.properties.kills,
        AX50: entry.data.itemData.weapon_sniper.iw8_sn_alpha50.properties.kills,
        Dragunov: entry.data.itemData.weapon_sniper.iw8_sn_delta.properties.kills,
        HDR: entry.data.itemData.weapon_sniper.iw8_sn_hdromeo.properties.kills,
        Rytec: entry.data.itemData.weapon_sniper.iw8_sn_xmike109.properties.kills
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
    this.tableTitle = 'Kills: Assault';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        name: entry.name,
        total: entry.data.all.properties.kills,
        AK47: entry.data.itemData.weapon_assault_rifle.iw8_ar_akilo47.properties.kills,
        AN94: entry.data.itemData.weapon_assault_rifle.iw8_ar_anovember94.properties.kills,
        Oden: entry.data.itemData.weapon_assault_rifle.iw8_ar_asierra12.properties.kills,
        FAL: entry.data.itemData.weapon_assault_rifle.iw8_ar_falima.properties.kills,
        FR56: entry.data.itemData.weapon_assault_rifle.iw8_ar_falpha.properties.kills,
        AMAX: entry.data.itemData.weapon_assault_rifle.iw8_ar_galima.properties.kills,
        Kilo: entry.data.itemData.weapon_assault_rifle.iw8_ar_kilo433.properties.kills,
        M13: entry.data.itemData.weapon_assault_rifle.iw8_ar_mcharlie.properties.kills,
        M4A1: entry.data.itemData.weapon_assault_rifle.iw8_ar_mike4.properties.kills,
        Scar: entry.data.itemData.weapon_assault_rifle.iw8_ar_scharlie.properties.kills,
        Grau: entry.data.itemData.weapon_assault_rifle.iw8_ar_sierra552.properties.kills,
        RAM7: entry.data.itemData.weapon_assault_rifle.iw8_ar_tango21.properties.kills,
        ASVAL: entry.data.itemData.weapon_assault_rifle.iw8_ar_valpha.properties.kills
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

}


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

  ngOnInit(): void {
    this.tableConfig = this.tables.getTableConfig();
    this.getLifetimeData().then((res) => {
      this.data = res;
      this.getMarksmanKillData();
    });
  }

  renderTable(): void {
    if (this.outletRef && this.contentRef) {
      this.isLoading = true;
      this.outletRef.clear();
      this.outletRef.createEmbeddedView(this.contentRef);
      this.isLoading = false;
    }
  }

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
              reject("An error occured");
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
        OC12: entry.data.itemData.weapon_shotgun.iw8_sh_oscar12.properties.kills,
        R870: entry.data.itemData.weapon_shotgun.iw8_sh_romeo870.properties.kills
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

  getLmgData(): void {
    // empty
    this.tableData = [];
    this.tableTitle = 'Kills: LMG';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Total: entry.data.all.properties.kills,
        K121: entry.data.itemData.weapon_lmg.iw8_lm_kilo121.properties.kills,
        L86: entry.data.itemData.weapon_lmg.iw8_lm_lima86.properties.kills,
        M34: entry.data.itemData.weapon_lmg.iw8_lm_mgolf34.properties.kills,
        G36: entry.data.itemData.weapon_lmg.iw8_lm_mgolf36.properties.kills,
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
        M32: entry.data.itemData.weapon_launcher.iw8_la_mike32.properties.kills,
        RPG: entry.data.itemData.weapon_launcher.iw8_la_rpapa7.properties.kills
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

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
        Blade: entry.data.itemData.weapon_melee.iw8_me_akimboblades.properties.kills,
        Blunt: entry.data.itemData.weapon_melee.iw8_me_akimboblunt.properties.kills,
        Riot: entry.data.itemData.weapon_other.iw8_me_riotshield.properties.kills
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

  getSmgKillData(): void {
    // empty
    this.tableData = [];
    this.tableTitle = 'Kills: SMG';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        name: entry.name,
        total: entry.data.all.properties.kills,
        AUG: entry.data.itemData.weapon_smg.iw8_sm_augolf.properties.kills,
        beta: entry.data.itemData.weapon_smg.iw8_sm_beta.properties.kills,
        C9: entry.data.itemData.weapon_smg.iw8_sm_charlie9.properties.kills,
        MP5: entry.data.itemData.weapon_smg.iw8_sm_mpapa5.properties.kills,
        MP7: entry.data.itemData.weapon_smg.iw8_sm_mpapa7.properties.kills,
        P90: entry.data.itemData.weapon_smg.iw8_sm_papa90.properties.kills,
        SMG45: entry.data.itemData.weapon_smg.iw8_sm_smgolf45.properties.kills,
        UZI: entry.data.itemData.weapon_smg.iw8_sm_uzulu.properties.kills,
        VICTOR: entry.data.itemData.weapon_smg.iw8_sm_victor.properties.kills
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

  getMarksmanKillData(): void {
    // empty
    this.tableData = [];
    this.tableTitle = 'Kills: Marksman';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        name: entry.name,
        total: entry.data.all.properties.kills,
        kar: entry.data.itemData.weapon_marksman.iw8_sn_kilo98.properties.kills,
        spr: entry.data.itemData.weapon_marksman.iw8_sn_romeo700.properties.kills,
        mk2: entry.data.itemData.weapon_marksman.iw8_sn_sbeta.properties.kills,
        sks: entry.data.itemData.weapon_marksman.iw8_sn_sksierra.properties.kills,
        cross: entry.data.itemData.weapon_marksman.iw8_sn_crossbow.properties.kills,
        mbr: entry.data.itemData.weapon_marksman.iw8_sn_mike14.properties.kills
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

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
        DE: entry.data.itemData.weapon_sniper.iw8_sn_delta.properties.kills,
        HDR: entry.data.itemData.weapon_sniper.iw8_sn_hdromeo.properties.kills,
        XM109: entry.data.itemData.weapon_sniper.iw8_sn_xmike109.properties.kills
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

  getAssaultKillData(): void {
    // empty
    this.tableData = [];
    this.tableTitle = 'Kills: Assault';
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        name: entry.name,
        total: entry.data.all.properties.kills,
        ak: entry.data.itemData.weapon_assault_rifle.iw8_ar_akilo47.properties.kills,
        an: entry.data.itemData.weapon_assault_rifle.iw8_ar_anovember94.properties.kills,
        as12: entry.data.itemData.weapon_assault_rifle.iw8_ar_asierra12.properties.kills,
        fal: entry.data.itemData.weapon_assault_rifle.iw8_ar_falima.properties.kills,
        fala: entry.data.itemData.weapon_assault_rifle.iw8_ar_falpha.properties.kills,
        gal: entry.data.itemData.weapon_assault_rifle.iw8_ar_galima.properties.kills,
        kilo: entry.data.itemData.weapon_assault_rifle.iw8_ar_kilo433.properties.kills,
        mc: entry.data.itemData.weapon_assault_rifle.iw8_ar_mcharlie.properties.kills,
        m4: entry.data.itemData.weapon_assault_rifle.iw8_ar_mike4.properties.kills,
        sc: entry.data.itemData.weapon_assault_rifle.iw8_ar_scharlie.properties.kills,
        s5: entry.data.itemData.weapon_assault_rifle.iw8_ar_sierra552.properties.kills,
        m21: entry.data.itemData.weapon_assault_rifle.iw8_ar_tango21.properties.kills,
        valp: entry.data.itemData.weapon_assault_rifle.iw8_ar_valpha.properties.kills
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

  handleSelectionChangeEvent(event: any): void {
    console.log(event);
  }

  handleButtonClickEvent(event: any): void {
    console.log(event);
  }

}


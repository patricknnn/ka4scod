import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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
  tableConfig?: DynamicTableConfig;
  columnConfig: DynamicTableColumnConfig[] = [];
  data: { name: string, data: any }[] = [];
  marksmanData: { name: string, total: number, kar: number, spr: number, mk2: number, sks: number, cross: number, mbr: number }[] = [];
  sniperdata: { name: string, total: number, ax50: number, delta: number, hdr: number, xm: number }[] = [];
  assaultData: { name: string, total: number, ak: number, an: number, as12: number, fal: number, fala: number, gal: number, kilo: number, mc: number, m4: number, sc: number, s5: number, m21: number, valp: number }[] = [];

  constructor(
    private tables: TableService,
    private api: NodeRestApiService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.tableConfig = this.tables.getTableConfig();
    this.columnConfig = [
      new DynamicTableColumnConfig({
        key: 'name',
        header: 'Player',
        sortable: true,
        draggable: true
      }),
      new DynamicTableColumnConfig({
        key: 'total',
        header: 'Total',
        sortable: true,
        draggable: true
      }),
      new DynamicTableColumnConfig({
        key: 'kar',
        header: 'Kar98k',
        sortable: true,
        draggable: true
      }),
      new DynamicTableColumnConfig({
        key: 'spr',
        header: 'SPR-208',
        sortable: true,
        draggable: true
      }),
      new DynamicTableColumnConfig({
        key: 'mk2',
        header: 'Gouveneur',
        sortable: true,
        draggable: true
      }),
      new DynamicTableColumnConfig({
        key: 'sks',
        header: 'SKS',
        sortable: true,
        draggable: true
      }),
      new DynamicTableColumnConfig({
        key: 'cross',
        header: 'Crossbow',
        sortable: true,
        draggable: true
      }),
      new DynamicTableColumnConfig({
        key: 'mbr',
        header: 'Garand 2.0',
        sortable: true,
        draggable: true
      }),
    ];
    this.getData().then((res) => {
      this.data = res;
      this.getMarksmanKillData();
    });
  }

  getData(): Promise<{ name: string, data: any }[]> {
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
            // weapons
            let smg = res.lifetime.itemData.weapon_smg;
            let shotty = res.lifetime.itemData.weapon_shotgun;
            let melee = res.lifetime.itemData.weapon_melee;
            let launcher = res.lifetime.itemData.weapon_launcher;
            let other = res.lifetime.itemData.weapon_other;
            let pistol = res.lifetime.itemData.weapon_pistol
            let lmg = res.lifetime.itemData.weapon_lmg;
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

  getMarksmanKillData(): void {
    // empty
    this.columnConfig = [];
    this.marksmanData = [];
    // data
    this.data.forEach((entry) => {
      let name = entry.name;
      let total = entry.data.all.properties.kills;
      let kar = entry.data.itemData.weapon_marksman.iw8_sn_kilo98.properties.kills;
      let spr = entry.data.itemData.weapon_marksman.iw8_sn_romeo700.properties.kills;
      let mk2 = entry.data.itemData.weapon_marksman.iw8_sn_sbeta.properties.kills;
      let sks = entry.data.itemData.weapon_marksman.iw8_sn_sksierra.properties.kills;
      let cross = entry.data.itemData.weapon_marksman.iw8_sn_crossbow.properties.kills;
      let mbr = entry.data.itemData.weapon_marksman.iw8_sn_mike14.properties.kills;
      this.marksmanData.push({ name: name, total: total, kar: kar, spr: spr, mk2: mk2, sks: sks, cross: cross, mbr: mbr });
    });
    // columns
    for (const property in this.marksmanData[0]) {
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

  getSniperKillData(): void {
    // empty
    this.columnConfig = [];
    this.sniperdata = [];
    // data
    this.data.forEach((entry) => {
      let name = entry.name;
      let total = entry.data.all.properties.kills;
      let ax50 = entry.data.itemData.weapon_sniper.iw8_sn_alpha50;
      let delta = entry.data.itemData.weapon_sniper.iw8_sn_delta;
      let hdr = entry.data.itemData.weapon_sniper.iw8_sn_hdromeo;
      let xm = entry.data.itemData.weapon_sniper.iw8_sn_xmike109;
      this.sniperdata.push({ name: name, total: total, ax50: ax50, delta: delta, hdr: hdr, xm: xm });
    });
    // columns
    for (const property in this.sniperdata[0]) {
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

  getAssaultKillData(): void {
    // empty
    this.columnConfig = [];
    this.assaultData = [];
    // data
    this.data.forEach((entry) => {
      let name = entry.name;
      let total = entry.data.all.properties.kills;
      let ak = entry.data.itemData.weapon_assault_rifle.iw8_ar_akilo47;
      let an = entry.data.itemData.weapon_assault_rifle.iw8_ar_anovember94;
      let as12 = entry.data.itemData.weapon_assault_rifle.iw8_ar_asierra12;
      let fal = entry.data.itemData.weapon_assault_rifle.iw8_ar_falima;
      let fala = entry.data.itemData.weapon_assault_rifle.iw8_ar_falpha;
      let gal = entry.data.itemData.weapon_assault_rifle.iw8_ar_galima;
      let kilo = entry.data.itemData.weapon_assault_rifle.iw8_ar_kilo433;
      let mc = entry.data.itemData.weapon_assault_rifle.iw8_ar_mcharlie;
      let m4 = entry.data.itemData.weapon_assault_rifle.iw8_ar_mike4;
      let sc = entry.data.itemData.weapon_assault_rifle.iw8_ar_scharlie;
      let s5 = entry.data.itemData.weapon_assault_rifle.iw8_ar_sierra552;
      let m21 = entry.data.itemData.weapon_assault_rifle.iw8_ar_tango21;
      let valp = entry.data.itemData.weapon_assault_rifle.iw8_ar_valpha;
      this.assaultData.push({ name: name, total: total, ak: ak, an: an, as12: as12, fal: fal, fala: fala, gal: gal, kilo: kilo, mc: mc, m4: m4, sc: sc, s5: s5, m21: m21, valp: valp });
    });
    // columns
    for (const property in this.assaultData[0]) {
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



  handleSelectionChangeEvent(event: any): void {
    console.log(event);
  }

  handleButtonClickEvent(event: any): void {
    console.log(event);
  }

}


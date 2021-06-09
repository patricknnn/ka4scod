import { Component, OnInit } from '@angular/core';
import { LifetimeStats } from 'src/app/models/lifetime-stats';
import { DynamicTableButton } from 'src/app/modules/dynamic-tables/models/dynamic-table-button';
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
  columnConfig?: DynamicTableColumnConfig[];
  data?: any;

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
        header: 'MK-2 Carbine',
        sortable: true,
        draggable: true
      }),
    ];
    this.getKillData().then((res: any) => {
      this.data = res;
    });
  }

  getKillData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let data: any[] = []; // { player: '', total: '', kar: '', spr: ''};
      let players = this.api.getPlayers();
      let count = 0;
      players.forEach((player) => {
        this.api.getLifetimeStats("mp", player)
          .then((res: LifetimeStats) => {
            if (!res.lifetime) {
              this.dialog.errorDialog('Error', JSON.stringify(res));
              reject("An error occured");
            }
            let name = player.name;
            let total = res.lifetime.all.properties.kills;
            let kar = res.lifetime.itemData.weapon_marksman.iw8_sn_kilo98.properties.kills;
            let spr = res.lifetime.itemData.weapon_marksman.iw8_sn_romeo700.properties.kills;
            let mk2 = res.lifetime.itemData.weapon_marksman.iw8_sn_sbeta.properties.kills;
            data.push({ name: name, total: total, kar: kar, spr: spr, mk2: mk2 });
            count++;
            if (count == players.length) {
              resolve(data);
            }
          })
          .catch((error) => {
            reject("An error occured");
          });
      });
    });
  }

  handleSelectionChangeEvent(event: any): void {
    console.log(event);
  }

  handleButtonClickEvent(event: any): void {
    console.log(event);
  }

}


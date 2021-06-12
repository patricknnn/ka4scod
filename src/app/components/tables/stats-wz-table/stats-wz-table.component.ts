import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/models/player';
import { WarzoneStats } from 'src/app/models/warzone-stats';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import { NodeRestApiService, CodApiPlayer } from 'src/app/services/node-rest-api.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-stats-wz-table',
  templateUrl: './stats-wz-table.component.html',
  styleUrls: ['./stats-wz-table.component.scss']
})
export class StatsWzTableComponent implements OnInit {
  tableData: any[] = [];
  tableConfig?: DynamicTableConfig;
  columnConfig: DynamicTableColumnConfig[] = [];
  data: { name: string, data: WarzoneStats }[] = [];
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
    private dialog: DialogService,
    private firestore: PlayerService
  ) { }

  /***
   * Get data
   */
  ngOnInit(): void {
    this.tableConfig = this.tables.getTableConfig();
    this.getWarzoneData().then((res) => {
      this.data = res;
      this.getAll();
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
  getWarzoneData(): Promise<{ name: string, data: WarzoneStats }[]> {
    return new Promise((resolve, reject) => {
      let data: any[] = [];
      let count = 0;
      this.getPlayers().then((players) => {
        players.forEach((player) => {
          let apiPlayer: CodApiPlayer = { name: player.name || '', gamertag: player.gamertag || '', platform: player.platform || 'battle' };
          this.api.getWarzoneStats(apiPlayer)
            .then((res: WarzoneStats) => {
              if (!res.br || !res.br_all || !res.br_dmz) {
                this.dialog.errorDialog('Error', JSON.stringify(res));
                reject(res);
              }
              let name = player.name;
              data.push({ name: name, data: res });
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
      this.firestore.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        ))
        .subscribe(data => {
          resolve(data);
        });
    });
  }


  /**
   * All
   */
  getAll(): void {
    // empty
    this.tableData = [];
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Hours: Math.round((entry.data.br_all.timePlayed / 3600)  * 100) / 100,
        Score: entry.data.br_all.score,
        Games: entry.data.br_all.gamesPlayed,
        Wins: entry.data.br_all.wins,
        Top5: entry.data.br_all.topFive,
        Kills: entry.data.br_all.kills,
        Deaths: entry.data.br_all.deaths,
        Ratio: Math.round(entry.data.br_all.kdRatio * 100) / 100,
        Revives: entry.data.br_all.revives
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

  /**
   * BR
   */
  getBR(): void {
    // empty
    this.tableData = [];
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Hours: Math.round((entry.data.br.timePlayed / 3600)  * 100) / 100,
        Score: entry.data.br.score,
        Games: entry.data.br.gamesPlayed,
        Wins: entry.data.br.wins,
        Top5: entry.data.br.topFive,
        Kills: entry.data.br.kills,
        Deaths: entry.data.br.deaths,
        Ratio: Math.round(entry.data.br.kdRatio * 100) / 100,
        Revives: entry.data.br.revives
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

  /**
   * DMZ
   */
  getDMZ(): void {
    // empty
    this.tableData = [];
    // data
    this.data.forEach((entry) => {
      this.tableData.push({
        Name: entry.name,
        Hours: Math.round((entry.data.br_dmz.timePlayed / 3600) * 100) / 100,
        Score: entry.data.br_dmz.score,
        Games: entry.data.br_dmz.gamesPlayed,
        Wins: entry.data.br_dmz.wins,
        Top5: entry.data.br_dmz.topFive,
        Kills: entry.data.br_dmz.kills,
        Deaths: entry.data.br_dmz.deaths,
        Ratio: Math.round(entry.data.br_dmz.kdRatio * 100) / 100,
        Revives: entry.data.br_dmz.revives
      });
    });
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
  }

}

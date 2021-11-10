import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/models/player';
import { VanguardLifetimeStats } from 'src/app/models/vanguard-stats';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { AuthService } from 'src/app/services/firestore/auth.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import { NodeRestApiService, CodApiPlayer } from 'src/app/services/node-rest-api.service';
import { StatsService } from 'src/app/services/stats.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-stats-vanguard',
  templateUrl: './stats-vanguard.component.html',
  styleUrls: ['./stats-vanguard.component.scss'],
})
export class StatsVanguardComponent implements OnInit {
  isLoading: boolean = true;
  elevation: string = 'mat-elevation-z4';
  players?: Player[];
  playerStats: { player: Player; stats: any }[] = [];
  tableData: any[] = [];
  tableConfig?: DynamicTableConfig;
  columnConfig: DynamicTableColumnConfig[] = [];
  @ViewChild('outlet', { read: ViewContainerRef })
  outletRef?: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef }) contentRef?: TemplateRef<any>;

  constructor(
    private api: NodeRestApiService,
    private tables: TableService,
    private stats: StatsService,
    private playerService: PlayerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.tableConfig = this.tables.getTableConfig();
    this.retrievePlayers();
  }

  isSsoTokenSet(): boolean {
    return !!this.authService.loggedInUser?.ssoToken;
  }

  retrievePlayers(): void {
    this.playerService
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
        this.players = data;
        if (this.isSsoTokenSet()) {
          this.getPlayersLifetimeData();
        }
      });
  }

  /**
   * Current lifetime data for all players
   */
  getPlayersLifetimeData(): void {
    let count = 0;
    this.players?.forEach((player) => {
      this.getLifetimeData(player).then((res) => {
        if (res.lifetime) {
          let stats = this.stats.convertLifetimeToVanguard(res);
          this.playerStats.push({ player: player, stats: stats });
        }
        count++;
        if (count == this.players?.length) {
          this.fillTable();
        }
      });
    });
  }

  /**
   * Get lifetime data for player
   * @returns Promise<{ name: string, data: any }[]>
   */
  getLifetimeData(player: Player): Promise<VanguardLifetimeStats> {
    return new Promise((resolve, reject) => {
      let apiPlayer: CodApiPlayer = {
        name: player.name || '',
        gamertag: player.gamertag || '',
        platform: player.platform || 'battle',
      };
      this.api
        .getVanguardStats(apiPlayer)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  /**
   * Fill Table
   */
  fillTable(): void {
    // empty
    this.tableData = [];
    // data
    if (this.players) {
      let list: any = this.playerStats[0]?.stats;
      for (const property in list) {
        let obj: any = {};
        obj['statistic'] = property;
        for (let index = 0; index < this.playerStats.length; index++) {
          let player = this.playerStats[index].player?.name || '';
          let statsList: any = this.playerStats[index].stats;
          obj[player] = +(statsList[property] || 0).toFixed(2);
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
    if (this.players) {
      this.players.forEach((player) => {
        this.columnConfig.push(
          new DynamicTableColumnConfig({
            key: player.name || '',
            header: player.name || '',
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

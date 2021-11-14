import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LanEvent } from 'src/app/models/event';
import { LifetimeStats } from 'src/app/models/lifetime-stats';
import { Player } from 'src/app/models/player';
import { VanguardLifetimeStats } from 'src/app/models/vanguard-stats';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { EventService } from 'src/app/services/firestore/event.service';
import {
  CodApiPlayer,
  NodeRestApiService,
} from 'src/app/services/node-rest-api.service';
import { StatsService } from 'src/app/services/stats.service';
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
  isLoadingCurrent: boolean = true;
  elevation: string = 'mat-elevation-z4';
  statsMode: 'lifetime' | 'warzone' | 'vanguard' = 'lifetime';
  statsViewed: 'statsCurrent' | 'statsStart' | 'statsEnd' | 'statsCompared' = 'statsStart';
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
    private route: ActivatedRoute,
    private stats: StatsService
  ) { }

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
        if (!this.eventEnded) {
          this.getCurrentLifetimeData();
        } else {
          this.getComparedStats();
        }
        this.getStats('statsStart');
      });
  }

  /**
   * Set stats mode
   * @param mode 'lifetime' | 'warzone'
   */
  setStatsMode(mode: 'lifetime' | 'warzone' | 'vanguard'): void {
    this.statsMode = mode;
    this.getStats('statsStart');
  }

  /**
   * Current lifetime data for all players
   */
  getCurrentLifetimeData(): void {
    let count = 0;
    this.event.currentDate = this.getCurrentDate();
    this.event.players?.forEach((player) => {
      if (player.player) {
        this.getLifetimeData(player.player).then((res) => {
          count++;
          player.statsCurrent = this.stats.convertLifetimeStatsToPlayerStatsLifetime(res.lifetime);
          player.statsCurrentWarzone = res.warzone;
          player.statsCurrentVanguard = this.stats.convertLifetimeToVanguard(res.vanguard);
          if (count == this.event.players?.length) {
            this.getComparedStats();
            this.isLoadingCurrent = false;
          }
        });
      }
    });
  }

  /**
   * Get lifetime data for player
   */
  getLifetimeData(player: Player): Promise<{ lifetime: LifetimeStats; warzone: any; vanguard: VanguardLifetimeStats }> {
    return new Promise((resolve, reject) => {
      let apiPlayer: CodApiPlayer = {
        name: player.name || '',
        gamertag: player.gamertag || '',
        platform: player.platform || 'battle',
      };
      this.api.getLifetimeStats(apiPlayer).then((mwRes) => {
        this.api.getWarzoneStats(apiPlayer).then((wzRes: any) => {
          delete wzRes.br_all.title;
          this.api.getVanguardStats(apiPlayer).then((vgRes) => {
            resolve({ lifetime: mwRes, warzone: wzRes.br_all, vanguard: vgRes });
          })
        })
          .catch((error) => reject(error));
      })
        .catch((error) => reject(error));
    });
  }

  /**
   * End event
   */
  endEvent(): void {
    if (this.eventEnded) {
      this.dialog
        .errorDialog('Error', 'Event already ended')
    } else {
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
                  if (!res.lifetime) {
                    this.dialog.errorDialog(
                      'Error',
                      `Unable to fetch data for ${player.player?.gamertag} (${res})`
                    );
                  } else {
                    count++;
                    player.statsEnd = this.stats.convertLifetimeStatsToPlayerStatsLifetime(res.lifetime);
                    player.statsEndWarzone = res.warzone;
                    player.statsEndVanguard = res.vanguard;
                    if (count == this.event.players?.length) {
                      this.save();
                    }
                  }
                });
              }
            });
          }
        });
    }

  }

  /**
   * Save to firebase
   */
  save(): void {
    if (this.event.key) {
      this.firestore.update(this.event.key, this.event).then(() => {
        this.dialog.succesDialog('Succes', 'Event ended!');
      }).catch((err) => {
        this.dialog.errorDialog('Error', err);
      });
    }
  }

  /**
   * Compared stats
   */
  getComparedStats(): void {
    this.event.players?.forEach((player) => {
      player.statsCompared = {};
      player.statsComparedWarzone = {};
      player.statsComparedVanguard = {};
      let playerAny: any = player;
      // liftime
      let start = 'statsStart';
      let end = 'statsEnd';
      let current = 'statsCurrent';
      let compared = 'statsCompared';
      for (const property in playerAny[start]) {
        if (playerAny[current]) {
          playerAny[compared][property] = playerAny[current][property] - playerAny[start][property];
        } else if (playerAny[end]) {
          playerAny[compared][property] = playerAny[end][property] - playerAny[start][property];
        }
      }
      // warzone
      let startWz = 'statsStartWarzone';
      let endWz = 'statsEndWarzone';
      let currentWz = 'statsCurrentWarzone';
      let comparedWz = 'statsComparedWarzone';
      for (const property in playerAny[startWz]) {
        if (playerAny[currentWz]) {
          playerAny[comparedWz][property] = playerAny[currentWz][property] - playerAny[startWz][property];
        } else if (playerAny[endWz]) {
          playerAny[comparedWz][property] = playerAny[endWz][property] - playerAny[startWz][property];
        }
      }
      // vanguard
      let startVg = 'statsStartVanguard';
      let endVg = 'statsEndVanguard';
      let currentVg = 'statsCurrentVanguard';
      let comparedVg = 'statsComparedVanguard';
      for (const property in playerAny[startVg]) {
        if (playerAny[currentVg]) {
          playerAny[comparedVg][property] = playerAny[currentVg][property] - playerAny[startVg][property];
        } else if (playerAny[endVg]) {
          playerAny[comparedVg][property] = playerAny[endVg][property] - playerAny[startVg][property];
        }
      }
    });
  }

  /**
   * Fetch desired stats
   * @param stats 'statsCurrent' | 'statsStart' | 'statsEnd' | 'statsCompared'
   */
  getStats(
    stats: 'statsCurrent' | 'statsStart' | 'statsEnd' | 'statsCompared'
  ): void {
    this.statsViewed = stats;
    // empty
    let statsKey: string = stats;
    if (this.statsMode == 'warzone') {
      statsKey = statsKey + 'Warzone'
    } else if (this.statsMode == 'vanguard') {
      statsKey = statsKey + 'Vanguard'
    }
    console.log(statsKey);

    this.tableData = [];
    // data
    if (this.event.players) {
      let list: any = this.event.players[0];
      if (list) {
        for (const property in list[statsKey]) {
          let obj: any = {};
          obj['statistic'] = property;
          for (let index = 0; index < this.event.players.length; index++) {
            let player = this.event.players[index].player?.name || '';
            let statsList: any = this.event.players[index];
            obj[player] = +(statsList[statsKey][property] || 0).toFixed(2);
          }
          this.tableData.push(obj);
        }
      }
    }
    // columns
    this.buildColumns();
    // render table
    this.renderTable();
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
    if (this.event.players) {
      this.event.players?.forEach((player) => {
        this.columnConfig.push(
          new DynamicTableColumnConfig({
            key: player.player?.name || '',
            header: player.player?.name || '',
            sortable: true,
            draggable: true,
          })
        );
      });
    }
  }

  /**
   * Renders dynamic table
   */
  renderTable(): void {
    if (this.outletRef && this.contentRef) {
      if (this.tableConfig) {
        this.tableConfig.coloredNumericValues = this.statsViewed == 'statsCompared' ? true : false;
      }
      this.isLoading = true;
      this.outletRef.clear();
      this.outletRef.createEmbeddedView(this.contentRef);
      this.isLoading = false;
    }
  }

  /**
   * Current date string
   * @returns string
   */
  getCurrentDate(): string {
    return new Date().toISOString();
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

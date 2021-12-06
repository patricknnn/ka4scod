import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LifetimeStats } from 'src/app/models/lifetime-stats';
import { Player } from 'src/app/models/player';
import { VanguardLifetimeStats } from 'src/app/models/vanguard-stats';
import { CodApiPlayer, NodeRestApiService } from 'src/app/services/node-rest-api.service';

@Component({
  selector: 'app-player-stats-card',
  templateUrl: './player-stats-card.component.html',
  styleUrls: ['./player-stats-card.component.scss']
})
export class PlayerStatsCardComponent implements OnInit {
  @Input() player!: Player;
  elevation: string = 'mat-elevation-z4';
  isLoading: boolean = true;
  dataError: boolean = false;
  dataErrorText: string = '';
  hoursCummulativeMw?: string;
  hoursCummulativeVg?: string;
  data?: { lifetime: LifetimeStats; warzone: any; vanguard: VanguardLifetimeStats };

  constructor(
    private api: NodeRestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLifetimeData().then((data: { lifetime: LifetimeStats; warzone: any; vanguard: VanguardLifetimeStats }) => {
      this.data = data;
      this.hoursCummulativeMw = this.secondsToHms(
        data.lifetime.lifetime.mode.arena.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.arm.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.br_all.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.conf.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.cyber.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.dom.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.grnd.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.gun.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.hc_conf.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.hc_cyber.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.hc_dom.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.hc_hq.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.hc_sd.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.hc_war.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.hq.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.infect.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.koth.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.sd.properties.timePlayed | 0 +
        data.lifetime.lifetime.mode.war.properties.timePlayed | 0
      );
      this.hoursCummulativeVg = this.secondsToHms(
        data.vanguard.lifetime.mode.br_all.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.conf.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.conf_hc.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.dm.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.dm_hc.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.dom.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.dom_hc.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.koth.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.koth_hc.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.patrol.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.patrol_hc.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.sd.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.sd_hc.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.war.properties.timePlayed | 0 +
        data.vanguard.lifetime.mode.war_hc.properties.timePlayed | 0
      );
    });
  }

  /**
   * Get lifetime data for player
   */
  getLifetimeData(): Promise<{ lifetime: LifetimeStats; warzone: any; vanguard: VanguardLifetimeStats }> {
    return new Promise((resolve, reject) => {
      let apiPlayer: CodApiPlayer = {
        name: this.player.name || '',
        gamertag: this.player.gamertag || '',
        platform: this.player.platform || 'battle',
      };
      this.api.getLifetimeStats(apiPlayer).then((mwRes) => {
        if (!mwRes.lifetime) {
          this.dataError = true;
          this.dataErrorText = JSON.stringify(mwRes);
        }
        this.api.getWarzoneStats(apiPlayer).then((wzRes: any) => {
          delete wzRes.br_all?.title;
          this.api.getVanguardStats(apiPlayer).then((vgRes) => {
            resolve({ lifetime: mwRes, warzone: wzRes.br_all, vanguard: vgRes });
          }).catch((error) => reject(error));
        }).catch((error) => reject(error));
      }).catch((error) => reject(error));
    });
  }

  secondsToHms(d: number): string {
    return Math.floor(d / 3600) + 'h';
  }

}

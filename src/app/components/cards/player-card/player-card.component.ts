import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LifetimeStats } from 'src/app/models/lifetime-stats';
import { Player } from 'src/app/models/player';
import { DialogService } from 'src/app/services/dialog.service';
import { CodApiPlayer, NodeRestApiService } from 'src/app/services/node-rest-api.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  @Input() player!: Player;
  elevation: string = "mat-elevation-z4";
  stats?: LifetimeStats;
  kills?: number;
  level?: number;
  kd?: number;
  hours?: string;
  hoursCummulative?: string;

  constructor(
    private api: NodeRestApiService,
    private dialog: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLifetimeData();
  }

  /**
   * Get lifetime data
   * @returns Promise<{ name: string, data: any }[]> 
   */
  getLifetimeData(): void {
    let apiPlayer: CodApiPlayer = { name: this.player.name || '', gamertag: this.player.gamertag || '', platform: this.player.platform || 'battle' };
    this.api.getLifetimeStats("mp", apiPlayer)
      .then((res: LifetimeStats) => {
        if (!res.lifetime) {
          this.dialog.errorDialog('Error', JSON.stringify(res));
        }
        this.stats = res;
        this.kills = res.lifetime.all.properties.kills;
        this.level = res.level;
        this.kd = res.lifetime.all.properties.kdRatio;
        let hours = res.lifetime.all.properties.timePlayedTotal;
        this.hours = this.secondsToHms(hours);
        this.hoursCummulative = this.secondsToHms(
          res.lifetime.mode.arena.properties.timePlayed +
          res.lifetime.mode.arm.properties.timePlayed +
          res.lifetime.mode.br.properties.timePlayed +
          res.lifetime.mode.br_all.properties.timePlayed +
          res.lifetime.mode.br_dmz.properties.timePlayed +
          res.lifetime.mode.conf.properties.timePlayed +
          res.lifetime.mode.cyber.properties.timePlayed +
          res.lifetime.mode.dom.properties.timePlayed +
          res.lifetime.mode.grnd.properties.timePlayed +
          res.lifetime.mode.gun.properties.timePlayed +
          res.lifetime.mode.hc_conf.properties.timePlayed +
          res.lifetime.mode.hc_cyber.properties.timePlayed +
          res.lifetime.mode.hc_dom.properties.timePlayed +
          res.lifetime.mode.hc_hq.properties.timePlayed +
          res.lifetime.mode.hc_sd.properties.timePlayed +
          res.lifetime.mode.hc_war.properties.timePlayed +
          res.lifetime.mode.hq.properties.timePlayed +
          res.lifetime.mode.infect.properties.timePlayed +
          res.lifetime.mode.koth.properties.timePlayed +
          res.lifetime.mode.sd.properties.timePlayed +
          res.lifetime.mode.war.properties.timePlayed
        );
      })
      .catch((error) => {
        this.dialog.errorDialog('Error', JSON.stringify(error));
      });
  }

  goToDetails(): void {
    this.router.navigate(['/playerstats', { key: this.player?.key }]);
  }

  secondsToHms(d: number): string {
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    var hDisplay = h > 0 ? h + ("h, ") : "";
    var mDisplay = m > 0 ? m + ("m, ") : "";
    var sDisplay = s > 0 ? s + ("s") : "";
    return hDisplay + mDisplay + sDisplay;
  }

}

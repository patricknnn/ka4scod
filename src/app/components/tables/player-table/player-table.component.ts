import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LifetimeStats } from 'src/app/models/lifetime-stats';
import { Player } from 'src/app/models/player';
import { DialogService } from 'src/app/services/dialog.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import { CodApiPlayer, NodeRestApiService } from 'src/app/services/node-rest-api.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {
  elevation: string = "mat-elevation-z4";
  player?: Player;
  stats?: LifetimeStats;
  kills?: number;
  level?: number;
  kd?: number;
  hours?: string;
  hoursCummulative?: string;
  shotsFired?: number;
  maxLevel?: number;
  prestige?: number;
  maxPrestige?: number;
  sdHours?: string;
  sdKills?: number;
  sdDeath?: number;
  sdPlant?: number;
  sdDefuse?: number;
  sdKD?: number;
  sdScore?: number;
  sdScoreMin?: number;

  constructor(
    private firestore: PlayerService,
    private api: NodeRestApiService,
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let key = this.route.snapshot.paramMap.get('key');
    if (key && key != 'undefined') {
      this.retrievePlayer(key);
    } else {
      this.router.navigate(['/404']);
    }
  }

  /**
   * Retrieve player
   * @param key Players key
   */
  retrievePlayer(key: string): void {
    this.firestore.getByKey(key).snapshotChanges().pipe(
      map(c =>
        ({ key: c.payload.id, ...c.payload.data() })
      )
    ).subscribe(data => {
      this.player = data;
      this.getLifetimeData();
    });
  }

  /**
   * Get lifetime data
   * @returns Promise<{ name: string, data: any }[]> 
   */
  getLifetimeData(): void {
    if (this.player) {
      let apiPlayer: CodApiPlayer = { name: this.player.name || '', gamertag: this.player.gamertag || '', platform: this.player.platform || 'battle' };
      this.api.getLifetimeStats("mp", apiPlayer)
        .then((res: LifetimeStats) => {
          if (!res.lifetime) {
            this.dialog.errorDialog('Error', JSON.stringify(res));
          }
          this.stats = res;
          this.level = res.level;
          this.maxLevel = res.maxLevel;
          this.prestige = res.prestige;
          this.maxPrestige = res.maxPrestige;
          this.kills = res.lifetime.all.properties.kills;
          this.kd = res.lifetime.all.properties.kdRatio;
          this.shotsFired = res.lifetime.accoladeData.properties.shotsFired;
          this.hours = this.secondsToHms(res.lifetime.all.properties.timePlayedTotal);
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
          this.sdKills = res.lifetime.mode.sd.properties.kills;
          this.sdKD = res.lifetime.mode.sd.properties.kdRatio;
          this.sdDeath = res.lifetime.mode.sd.properties.deaths;
          this.sdHours = this.secondsToHms(res.lifetime.mode.sd.properties.timePlayed);
          this.sdPlant = res.lifetime.mode.sd.properties.plants;
          this.sdDefuse = res.lifetime.mode.sd.properties.defuses;
          this.sdScore = res.lifetime.mode.sd.properties.score;
          this.sdScoreMin = res.lifetime.mode.sd.properties.scorePerMinute;
        })
        .catch((error) => {
          this.dialog.errorDialog('Error', JSON.stringify(error));
        });
    }
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

import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private api: NodeRestApiService,
    private dialog: DialogService,
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
      })
      .catch((error) => {
        this.dialog.errorDialog('Error', JSON.stringify(error));
      });
  }

}

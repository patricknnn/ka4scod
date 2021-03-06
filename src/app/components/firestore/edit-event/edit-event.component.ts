import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LanEvent } from 'src/app/models/event';
import { LifetimeStats, War } from 'src/app/models/lifetime-stats';
import { Player } from 'src/app/models/player';
import { VanguardLifetimeStats } from 'src/app/models/vanguard-stats';
import { WarzoneStats } from 'src/app/models/warzone-stats';
import { FormControlBase } from 'src/app/modules/dynamic-forms/models/form-control-base';
import { FormControlDate } from 'src/app/modules/dynamic-forms/models/form-control-date';
import { FormControlSlide } from 'src/app/modules/dynamic-forms/models/form-control-slide';
import { FormControlText } from 'src/app/modules/dynamic-forms/models/form-control-text';
import { DialogService } from 'src/app/services/dialog.service';
import { EventService } from 'src/app/services/firestore/event.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import {
  CodApiPlayer,
  NodeRestApiService,
} from 'src/app/services/node-rest-api.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  event: LanEvent = {};
  editEvent: boolean = false;
  isLoading: boolean = true;
  formControls?: FormControlBase<any>[];
  formAppearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'standard';
  formColor: 'primary' | 'accent' | 'warn' = 'primary';
  allowInvalidSubmit: boolean = false;
  elevation: string = 'mat-elevation-z4';
  players?: Player[];
  savedPlayers?: string[];

  constructor(
    private firestore: EventService,
    private firestorePlayer: PlayerService,
    private api: NodeRestApiService,
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private stats: StatsService
  ) { }

  ngOnInit(): void {
    let key = this.route.snapshot.paramMap.get('key');
    if (key && key != 'undefined') {
      this.editEvent = true;
      this.retrieve(key);
    } else {
      this.editEvent = false;
      this.isLoading = false;
      this.getFormControls();
    }
  }

  retrieve(key: string): void {
    this.firestore
      .getByKey(key)
      .snapshotChanges()
      .pipe(map((c) => ({ key: c.payload.id, ...c.payload.data() })))
      .subscribe((data) => {
        this.event = data;
        this.savedPlayers = [];
        data.players?.forEach((player) => {
          if (player.player?.name) {
            this.savedPlayers?.push(player.player?.name);
          }
        });
        this.isLoading = false;
        this.getFormControls(this.event);
      });
  }

  getFormControls(event?: LanEvent) {
    this.getPlayers().then((players) => {
      this.players = players;
      let formControls: any[] = [
        new FormControlText({
          key: 'name',
          label: 'Name',
          value: event ? event.name : '',
          class: 'col-xs-12 col-md-6',
          order: 1,
        }),
        new FormControlText({
          key: 'location',
          label: 'Location',
          value: event ? event.location : '',
          class: 'col-xs-12 col-md-6',
          order: 2,
        }),
        new FormControlText({
          key: 'image',
          label: 'Image',
          value: event ? event.image : '',
          class: 'col-xs-12',
          order: 2,
        }),
        new FormControlDate({
          key: 'startDate',
          label: 'Start',
          value: event ? event.startDate : this.getCurrentDate(),
          disabled: true,
          class: 'col-xs-12 col-md-6',
          order: 3,
        }),
        new FormControlDate({
          key: 'endDate',
          label: 'End',
          value: event ? event.endDate : '',
          disabled: true,
          class: 'col-xs-12 col-md-6',
          order: 4,
        }),
      ];
      let eventPlayers: any[] = [];
      event?.players?.forEach((eventPlayer) => {
        eventPlayers.push(eventPlayer.player?.key);
      });
      players.forEach((player) => {
        formControls.push(
          new FormControlSlide({
            key: player.key,
            label: player.name,
            floatLabel: 'always',
            class: 'col-xs-6 col-md-4',
            value: eventPlayers.includes(player.key),
            disabled: this.editEvent,
            order: 5,
          })
        );
      });
      this.formControls = formControls.sort((a, b) => a.order - b.order);
    });
  }

  getCurrentDate(): string {
    return new Date().toISOString();
  }

  handleFormSubmit(event: any) {
    event = JSON.parse(event);
    this.event.name = event.name;
    this.event.location = event.location;
    this.event.image = event.image;
    this.event.startDate = event.startDate;
    this.event.endDate = event.endDate;
    this.event.players = [];
    if (this.editEvent) {
      // editing so update
      this.update();
    } else {
      let playersToFetch: any[] = [];
      for (const key in event) {
        if (event[key] == true) {
          playersToFetch.push(key);
        }
      }
      // check players
      if (!playersToFetch.length) {
        // no players so save
        this.save();
      } else {
        // players so retrieve data before save
        let processedCount = 0;
        this.players?.forEach((player) => {
          if (playersToFetch.includes(player.key)) {
            this.getLifetimeData(player).then((res) => {
              processedCount++;
              this.event.players?.push({
                player: player,
                statsStart: this.stats.convertLifetimeStatsToPlayerStatsLifetime(res.lifetime),
                statsStartWarzone: res.warzone,
                statsStartVanguard: this.stats.convertLifetimeToVanguard(res.vanguard),
              });
              if (processedCount == playersToFetch.length) {
                this.save();
              }
            });
          }
        });
      }
    }
  }

  getPlayers(): Promise<Player[]> {
    return new Promise((resolve, reject) => {
      this.firestorePlayer
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
          resolve(data);
        });
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

  save(): void {
    console.log(this.event);

    this.firestore
      .create(this.event)
      .then(() => {
        this.dialog.succesDialog('Succes', 'Event created!');
        this.router.navigate(['/events']);
      })
      .catch((err) => {
        this.dialog.errorDialog('Error', err);
      });
  }

  update(): void {
    if (this.event?.key) {
      this.firestore
        .update(this.event.key, this.event)
        .then(() => {
          this.dialog.succesDialog('Succes', 'Event updated!');
          this.router.navigate(['/events']);
        })
        .catch((err) => {
          this.dialog.errorDialog('Error', err);
        });
    }
  }
}

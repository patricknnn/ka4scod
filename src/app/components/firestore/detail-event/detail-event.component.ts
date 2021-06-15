import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LanEvent } from 'src/app/models/event';
import { LifetimeStats } from 'src/app/models/lifetime-stats';
import { Player } from 'src/app/models/player';
import { DialogService } from 'src/app/services/dialog.service';
import { EventService } from 'src/app/services/firestore/event.service';
import {
    CodApiPlayer,
    NodeRestApiService,
} from 'src/app/services/node-rest-api.service';

@Component({
    selector: 'app-detail-event',
    templateUrl: './detail-event.component.html',
    styleUrls: ['./detail-event.component.scss'],
})
export class DetailEventComponent implements OnInit {
    event: LanEvent = {};
    eventEnded: boolean = true;
    isLoading: boolean = true;
    elevation: string = 'mat-elevation-z4';

    constructor(
        private firestore: EventService,
        private api: NodeRestApiService,
        private dialog: DialogService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
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
                this.isLoading = false;
            });
    }

    endEvent(): void {
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
                                count++;
                                player.statsEnd = res;
                                if (count == this.event.players?.length) {
                                    console.log(this.event);
                                    this.save();
                                }
                            });
                        }
                    });
                }
            });
    }

    getCurrentDate(): string {
        return new Date().toISOString();
    }

    save(): void {
        if (this.event.key) {
            this.firestore
                .update(this.event.key, this.event)
                .then(() => {
                    this.dialog.succesDialog('Succes', 'Event ended!');
                })
                .catch((err) => {
                    this.dialog.errorDialog('Error', err);
                });
        }
    }

    /**
     * Get lifetime data for player
     * @returns Promise<{ name: string, data: any }[]>
     */
    getLifetimeData(player: Player): Promise<LifetimeStats> {
        return new Promise((resolve, reject) => {
            let apiPlayer: CodApiPlayer = {
                name: player.name || '',
                gamertag: player.gamertag || '',
                platform: player.platform || 'battle',
            };
            this.api
                .getLifetimeStats(apiPlayer)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
        });
    }
}

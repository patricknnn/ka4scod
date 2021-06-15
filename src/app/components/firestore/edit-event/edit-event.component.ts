import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LanEvent } from 'src/app/models/event';
import { FormControlBase } from 'src/app/modules/dynamic-forms/models/form-control-base';
import { FormControlChips } from 'src/app/modules/dynamic-forms/models/form-control-chips';
import { FormControlDate } from 'src/app/modules/dynamic-forms/models/form-control-date';
import { FormControlSlide } from 'src/app/modules/dynamic-forms/models/form-control-slide';
import { FormControlText } from 'src/app/modules/dynamic-forms/models/form-control-text';
import { DialogService } from 'src/app/services/dialog.service';
import { EventService } from 'src/app/services/firestore/event.service';
import { PlayerService } from 'src/app/services/firestore/player.service';

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

    constructor(
        private firestore: EventService,
        private firestorePlayer: PlayerService,
        private dialog: DialogService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        let key = this.route.snapshot.paramMap.get('key');
        if (key && key != 'undefined') {
            this.editEvent = true;
            this.retrieve(key);
        } else {
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
                this.isLoading = false;
                this.getFormControls(this.event);
            });
    }

    getFormControls(event?: LanEvent) {
        this.getPlayerOptions().then((playerOptions) => {
            let formControls: any[] = [
                new FormControlText({
                    key: 'name',
                    label: 'Name',
                    value: event ? event.name : '',
                    order: 1,
                }),
                new FormControlText({
                    key: 'location',
                    label: 'Location',
                    value: event ? event.location : '',
                    order: 2,
                }),
                new FormControlDate({
                    key: 'startDate',
                    label: 'Start',
                    value: event ? event.startDate : '',
                    order: 3,
                }),
                new FormControlDate({
                    key: 'endDate',
                    label: 'End',
                    value: event ? event.endDate : '',
                    order: 4,
                }),
            ];
            playerOptions.forEach((player) => {
                formControls.push(
                    new FormControlSlide({
                        key: player,
                        label: player,
                        floatLabel: 'always',
                        value: event?.players?.includes(player),
                        order: 5,
                    })
                );
            });

            this.formControls = formControls.sort((a, b) => a.order - b.order);
        });
    }

    handleFormSubmit(event: any) {
        event = JSON.parse(event);
        this.event.players = [];
        for (const key in event) {
            if (event[key] == true) {
                this.event.players.push(key);
            }
        }
        this.event.name = event.name;
        this.event.location = event.location;
        this.event.startDate = event.startDate;
        this.event.endDate = event.endDate;
        this.editEvent ? this.update() : this.save();
    }

    save(): void {
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

    getPlayerOptions(): Promise<any[]> {
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
                    let players: any[] = [];
                    data.forEach((player) => {
                        players.push(player.name);
                    });
                    resolve(players);
                });
        });
    }
}

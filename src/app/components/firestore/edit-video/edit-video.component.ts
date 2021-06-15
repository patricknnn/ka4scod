import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/models/player';
import { YoutubeVideo } from 'src/app/models/youtube-video';
import { FormControlBase } from 'src/app/modules/dynamic-forms/models/form-control-base';
import { FormControlDropdown } from 'src/app/modules/dynamic-forms/models/form-control-dropdown';
import { FormControlText } from 'src/app/modules/dynamic-forms/models/form-control-text';
import { DialogService } from 'src/app/services/dialog.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import { VideoService } from 'src/app/services/firestore/video.service';

@Component({
    selector: 'app-edit-video',
    templateUrl: './edit-video.component.html',
    styleUrls: ['./edit-video.component.scss'],
})
export class EditVideoComponent implements OnInit {
    video: YoutubeVideo = {};
    editVideo: boolean = false;
    isLoading: boolean = true;
    formControls?: FormControlBase<any>[];
    formAppearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'standard';
    formColor: 'primary' | 'accent' | 'warn' = 'primary';
    allowInvalidSubmit: boolean = false;
    elevation: string = 'mat-elevation-z4';

    constructor(
        private firestore: VideoService,
        private firestorePlayer: PlayerService,
        private dialog: DialogService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        let key = this.route.snapshot.paramMap.get('key');
        if (key && key != 'undefined') {
            this.editVideo = true;
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
                this.video = data;
                this.isLoading = false;
                this.getFormControls(this.video);
            });
    }

    getFormControls(video?: YoutubeVideo) {
        this.getPlayerOptions().then((playerOptions) => {
            let formControls = [
                new FormControlText({
                    key: 'title',
                    label: 'Title',
                    value: video ? video.title : '',
                    class: 'col-xs-12',
                    order: 1,
                }),
                new FormControlDropdown({
                    key: 'player',
                    label: 'Player',
                    value: video ? video.player : '',
                    class: 'col-xs-12 col-md-6',
                    options: playerOptions,
                    order: 2,
                }),
                new FormControlDropdown({
                    key: 'game',
                    label: 'Game',
                    value: video ? video.game : '',
                    class: 'col-xs-12 col-md-6',
                    options: [
                        { key: 'mw', value: 'Modern Warfare' },
                        { key: 'wz', value: 'Warzone' },
                        { key: 'bocw', value: 'Cold War' },
                        { key: 'cod2', value: 'Call of Duty 2' },
                        { key: 'cod4', value: 'Call of Duty 4' },
                    ],
                    order: 3,
                }),
                new FormControlText({
                    key: 'url',
                    label: 'Youtube embed url',
                    value: video ? video.url : '',
                    class: 'col-xs-12',
                    order: 4,
                }),
            ];
            this.formControls = formControls.sort((a, b) => a.order - b.order);
        });
    }

    getPlayerOptions(): Promise<{ key: any; value: any }[]> {
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
                    let players: { key: any; value: any }[] = [];
                    data.forEach((player) => {
                        players.push({ key: player.name, value: player.name });
                    });
                    resolve(players);
                });
        });
    }

    handleFormSubmit(event: any) {
        event = JSON.parse(event);
        this.video.title = event.title;
        this.video.player = event.player;
        this.video.game = event.game;
        this.video.url = event.url;
        this.editVideo ? this.update() : this.save();
    }

    save(): void {
        this.firestore
            .create(this.video)
            .then(() => {
                this.dialog.succesDialog('Succes', 'Video created!');
                this.router.navigate(['/videos']);
            })
            .catch((err) => {
                this.dialog.errorDialog('Error', err);
            });
    }

    update(): void {
        if (this.video?.key) {
            this.firestore
                .update(this.video.key, this.video)
                .then(() => {
                    this.dialog.succesDialog('Succes', 'Video updated!');
                    this.router.navigate(['/videos']);
                })
                .catch((err) => {
                    this.dialog.errorDialog('Error', err);
                });
        }
    }
}

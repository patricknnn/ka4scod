import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { LanEvent } from 'src/app/models/event';
import { Player } from 'src/app/models/player';
import { YoutubeVideo } from 'src/app/models/youtube-video';
import { EventService } from 'src/app/services/firestore/event.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import { VideoService } from 'src/app/services/firestore/video.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    videos?: YoutubeVideo[];
    isLoadingVideos: boolean = true;
    players?: Player[];
    isLoadingPlayers: boolean = true;
    events?: LanEvent[];
    isLoadingEvents: boolean = true;

    constructor(
        private firestoreVideos: VideoService,
        private firestorePlayers: PlayerService,
        private firestoreEvents: EventService
    ) {}

    ngOnInit(): void {
        this.retrievePlayers();
        this.retrieveVideos();
        this.retrieveEvents();
    }

    retrieveVideos(): void {
        this.firestoreVideos
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
                this.videos = data;
                this.isLoadingVideos = false;
            });
    }

    retrievePlayers(): void {
        this.firestorePlayers
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
                this.isLoadingPlayers = false;
            });
    }

    retrieveEvents(): void {
        this.firestoreEvents
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
                this.events = data;
                this.isLoadingEvents = false;
            });
    }
}

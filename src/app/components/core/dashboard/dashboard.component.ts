import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/models/player';
import { YoutubeVideo } from 'src/app/models/youtube-video';
import { PlayerService } from 'src/app/services/firestore/player.service';
import { VideoService } from 'src/app/services/firestore/video.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  videos?: YoutubeVideo[];
  isLoadingVideos: boolean = true;
  players?: Player[];
  isLoadingPlayers: boolean = true;

  constructor(
    private firestoreVideos: VideoService,
    private firestorePlayers: PlayerService,
  ) { }

  ngOnInit(): void {
    this.retrievePlayers();
    this.retrieveVideos();
  }

  retrieveVideos(): void {
    this.firestoreVideos.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ))
      .subscribe(data => {
        this.videos = data;
        this.isLoadingVideos = false;
      });
  }

  retrievePlayers(): void {
    this.firestorePlayers.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ))
      .subscribe(data => {
        this.players = data;
        this.isLoadingPlayers = false;
      });
  }

}

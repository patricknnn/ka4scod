import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeVideo } from 'src/app/models/youtube-video';

@Component({
    selector: 'app-video-card',
    templateUrl: './video-card.component.html',
    styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit {
    @Input() video!: YoutubeVideo;
    elevation: string = 'mat-elevation-z4';

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {}

    getPhotoURL() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(
            this.video.url || ''
        );
    }
}

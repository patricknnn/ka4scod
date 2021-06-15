import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-image-card',
    templateUrl: './image-card.component.html',
    styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
    title: string = 'Kar98k';
    subTitle: string = 'Meeste klappers';
    image: string = '../../../../assets/img/kar.png';
    text: string = 'Kuberoal met 6718';
    elevation: string = 'mat-elevation-z4';

    constructor() {}

    ngOnInit(): void {}
}

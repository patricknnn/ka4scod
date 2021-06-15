import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-icon-card',
    templateUrl: './icon-card.component.html',
    styleUrls: ['./icon-card.component.scss'],
})
export class IconCardComponent implements OnInit {
    title: string = 'Kar98k';
    subTitle: string = 'Meeste klappers';
    image: string = '../../../../assets/img/kar.png';
    text: string = 'Kuberoal met 6718';

    constructor() {}

    ngOnInit(): void {}
}

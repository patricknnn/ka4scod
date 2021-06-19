import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanEvent } from 'src/app/models/event';

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
    @Input() event!: LanEvent;
    elevation: string = 'mat-elevation-z4';

    constructor(private router: Router) {}

    ngOnInit(): void {}

    details(key?: string): void {
        this.router.navigate(['/eventdetails', { key: key }]);
    }
}

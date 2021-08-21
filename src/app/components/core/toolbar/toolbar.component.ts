import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Breadcrumb } from 'src/app/models/breadcrumb';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    breadcrumbs$: Observable<Breadcrumb[]>;

    @Output() sidebarChange = new EventEmitter<string>();

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
    }

    emitSidebarChange(change: string): void {
        this.sidebarChange.emit(change);
    }
}

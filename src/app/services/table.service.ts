import { Injectable } from '@angular/core';
import { DynamicTableConfig } from '../modules/dynamic-tables/models/dynamic-table-config';

@Injectable({
    providedIn: 'root',
})
export class TableService {
    constructor() {}

    getTableConfig(): DynamicTableConfig {
        return new DynamicTableConfig({
            filter: true,
            sorting: true,
            dragging: false,
            paging: true,
            selecting: false,
            expanding: false,
            scrollX: '547px',
            scrollY: '547px',
            stickyHeaders: true,
            stickyFooters: true,
            tableClass: 'mat-elevation-z4',
        });
    }
}

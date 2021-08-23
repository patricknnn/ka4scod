import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Navlink } from '../models/navlink';

@Injectable({
    providedIn: 'root',
})
export class NavlinkService {
    constructor() {}

    /**
     * Returns form controls
     * @returns Observable stream of form controls
     */
    getNavlinkGroups(): Observable<{ header: string; navlinks: Navlink[] }[]> {
        const groups = [
            {
                header: 'General',
                navlinks: [
                    new Navlink('Dashboard', 'dashboard', '/dashboard'),
                ],
            },
            {
                header: 'Modern Warfare',
                navlinks: [
                    new Navlink('Lifetime', 'bar_chart', '/mp-lifetime'),
                    new Navlink('Weekly', 'bar_chart', '/mp-weekly'),
                    new Navlink('Kills', 'plus_one', '/kills'),
                ],
            },
            {
                header: 'Warzone',
                navlinks: [
                    new Navlink('Lifetime', 'bar_chart', '/wz-lifetime'),
                ],
            },
            {
                header: 'Firebase',
                navlinks: [
                    new Navlink('Players', 'people', '/players'),
                    new Navlink('Videos', 'videocam', '/videos'),
                    new Navlink('Events', 'date_range', '/events'),
                ],
            },
        ];
        return of(groups);
    }
}

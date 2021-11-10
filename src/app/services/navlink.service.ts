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
                navlinks: [new Navlink('Dashboard', 'dashboard', '/dashboard')],
            },
            {
                header: 'Vanguard',
                navlinks: [
                    new Navlink('Lifetime', 'content_paste', '/vg-lifetime'),
                    new Navlink('Kills', 'fullscreen_exit', '/vg-kills'),
                ],
            },
            {
                header: 'Modern Warfare',
                navlinks: [
                    new Navlink('Lifetime', 'content_paste', '/mp-lifetime'),
                    new Navlink('Weekly', 'pending_actions', '/mp-weekly'),
                    new Navlink('Kills', 'fullscreen_exit', '/kills'),
                ],
            },
            {
                header: 'Warzone',
                navlinks: [
                    new Navlink('Lifetime', 'content_paste', '/wz-lifetime'),
                ],
            },
            {
                header: 'Firebase',
                navlinks: [
                    new Navlink('Players', 'people', '/players'),
                    new Navlink('Videos', 'videocam', '/videos'),
                    new Navlink('Events', 'event', '/events'),
                ],
            },
        ];
        return of(groups);
    }
}

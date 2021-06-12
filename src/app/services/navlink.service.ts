import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Navlink } from '../models/navlink';

@Injectable({
  providedIn: 'root'
})
export class NavlinkService {

  constructor() { }

  /**
   * Returns form controls
   * @returns Observable stream of form controls
   */
  getNavlinkGroups(): Observable<{ header: string, navlinks: Navlink[] }[]> {
    const groups = [
      {
        header: 'General',
        navlinks: [
          new Navlink('Dashboard', 'dashboard', '/dashboard'),
          new Navlink('Players', 'people', '/players'),
          new Navlink('Videos', 'videocam', '/videos'),
          new Navlink('API Playground', 'play_arrow', '/playground'),
        ]
      },
      {
        header: 'Modern Warfare',
        navlinks: [
          new Navlink('Stats', 'bar_chart', '/statsmp'),
          new Navlink('Kills', 'plus_one', '/kills'),
        ]
      },
      {
        header: 'Warzone',
        navlinks: [
          new Navlink('Stats', 'bar_chart', '/statswz'),
        ]
      }
    ];
    return of(groups);
  }
}

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
  getNavlinks(): Observable<Navlink[]> {
    const navlinks: Navlink[] = [
      new Navlink('Dashboard', 'dashboard', '/dashboard'),
      new Navlink('Kills', 'plus_one', '/kills'),
      new Navlink('Players', 'people', '/players'),
      new Navlink('Videos', 'videocam', '/videos'),
      new Navlink('API Playground', 'play_arrow', '/playground'),
    ];
    return of(navlinks);
  }
}

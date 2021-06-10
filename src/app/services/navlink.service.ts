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
      new Navlink('API Playground', 'play_arrow', '/apiplayground'),
      new Navlink('Page Not Found', 'search_off', '/404'),
    ];
    return of(navlinks);
  }
}

import { Component, Input } from '@angular/core';
import { Navlink } from 'src/app/models/navlink';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  /**
   * The headers and navlinks to display
   */
  @Input() navgroups!: { header: string, navlinks: Navlink[] }[];

  constructor() { }

}

import { Component, Input, OnInit } from '@angular/core';
import { Navlink } from 'src/app/models/navlink';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  /**
   * The navlinks to display
   */
  @Input() navLinks!: Navlink[];

  constructor() { }

}

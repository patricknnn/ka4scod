import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { routeAnimation } from './animations/route-animations';
import { Navlink } from './models/navlink';
import { NavlinkService } from './services/navlink.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Page title
   */
  title = 'KA4S Klappers';
  /**
   * Currently active theme
   */
  activeTheme: string = 'light';
  /**
   * Media query list
   */
  mobileQuery: MediaQueryList;
  /**
   * Mobile query listener
   */
  private _mobileQueryListener: () => void;
  /**
   * Sidenav viewchild
   */
  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  navLinks$: Observable<Navlink[]>;

  /**
   * Constructor
   * @param changeDetectorRef Change detector
   * @param media Media
   * @param sidenavService Sidenav service 
   */
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    navlinkService: NavlinkService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener<'change'>('change', this._mobileQueryListener);
    this.navLinks$ = navlinkService.getNavlinks();
  }

  /**
   * Called aafter
   */
  ngOnInit(): void {
    console.log();
  }

  /**
   * Called on component destroy
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener<'change'>('change', this._mobileQueryListener);
  }

  /**
   * Changes the theme
   * @param event Theme to apply
   */
  public changeSidebar(event: any) {
    switch (event) {
      case 'open':
        this.sidenav.open();
        break;
      case 'close':
        this.sidenav.close();
        break;
      case 'toggle':
        this.sidenav.toggle();
        break;
      default:
        break;
    }
  }

  /**
   * Changes the theme
   * @param theme Theme to apply
   */
  public changeTheme(theme: string) {
    this.activeTheme = theme;
  }

  /**
   * Returns activated route
   * @param outlet Router outlet
   * @returns Activated route if activated, '' otherwise
   */
  public getActivatedRoute(outlet: RouterOutlet): ActivatedRoute | undefined {
    return outlet.isActivated ? outlet.activatedRoute : undefined;
  }
}

import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Navlink } from './models/navlink';
import { AuthService } from './services/firestore/auth.service';
import { NavlinkService } from './services/navlink.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'KA4S Klappers';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @ViewChild('sidenav') public sidenav!: MatSidenav;
  sidenavOpen: boolean = false;
  navLinks$: Observable<{ header: string; navlinks: Navlink[] }[]>;
  isLoading: boolean = true;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private navlinkService: NavlinkService,
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener<'change'>(
      'change',
      this._mobileQueryListener
    );
    this.navLinks$ = navlinkService.getNavlinkGroups();
    this.matIconRegistry.addSvgIcon(
      `mw`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/mw.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `vg`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/vanguard.svg")
    );
  }

  ngOnInit(): void {
    this.sidenavOpen = !this.mobileQuery.matches;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener<'change'>(
      'change',
      this._mobileQueryListener
    );
  }

  public onScroll(event: any): void {
    if (event.target.scrollTop < 50) {
      document.getElementById('toolbar')?.classList.remove('mat-elevation-z4');
    } else {
      document.getElementById('toolbar')?.classList.add('mat-elevation-z4');
    }
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

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
}

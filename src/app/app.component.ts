import { MediaMatcher } from '@angular/cdk/layout';
import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { routeAnimation } from './animations/route-animations';
import { Navlink } from './models/navlink';
import { AuthService } from './services/firestore/auth.service';
import { NavlinkService } from './services/navlink.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routeAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'KA4S Klappers';
    activeTheme: string = 'light';
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    @ViewChild('sidenav') public sidenav!: MatSidenav;
    sidenavOpen: boolean = false;
    navLinks$: Observable<{ header: string; navlinks: Navlink[] }[]>;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        navlinkService: NavlinkService,
        private authService: AuthService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener<'change'>(
            'change',
            this._mobileQueryListener
        );
        this.navLinks$ = navlinkService.getNavlinkGroups();
    }

    ngOnInit(): void {
        this.sidenavOpen = !this.mobileQuery.matches;
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener<'change'>(
            'change',
            this._mobileQueryListener
        );
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

    public toggleTheme(): void {
        this.activeTheme = this.activeTheme == 'light' ? 'dark' : 'light';
    }

    public changeTheme(theme: string) {
        this.activeTheme = theme;
    }

    public getActivatedRoute(outlet: RouterOutlet): ActivatedRoute | undefined {
        return outlet.isActivated ? outlet.activatedRoute : undefined;
    }
}

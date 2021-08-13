import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player';
import { AuthService } from 'src/app/services/firestore/auth.service';
import { NodeRestApiService } from 'src/app/services/node-rest-api.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    /**
     * Toolbar title
     */
    title: string = 'KA4S Klapdekar';

    /**
     * Event emitter triggered on form submit
     */
    @Output() sidebarChange = new EventEmitter<string>();

    /**
     * Event emitter triggered on form submit
     */
    @Output() themeChange = new EventEmitter<string>();

    /**
     * Initialize ToolbarComponent
     */
    constructor(
        private api: NodeRestApiService,
        private router: Router,
        private auth: AuthService
    ) {}

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn;
    }

    loggedInUser(): string {
        return this.auth.loggedInUser?.email || 'Not logged in';
    }

    loggedInApiUser(): string {
        return this.api.loggedInUser || 'Not logged in';
    }

    changeApiUser(): void {
        this.router.navigate(['/login']);
    }

    logout(): void {
        this.auth.logout();
    }

    /**
     * Emits event to parent to signal theme change
     * @param theme Theme to apply
     */
    emitSidebarChange(change: string): void {
        this.sidebarChange.emit(change);
    }

    /**
     * Emits event to parent to signal theme change
     * @param theme Theme to apply
     */
    emitThemeChange(theme: string): void {
        this.themeChange.emit(theme);
    }
}

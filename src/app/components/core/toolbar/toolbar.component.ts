import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    title: string = 'KA4S Klapdekar';

    @Output() sidebarChange = new EventEmitter<string>();
    @Output() themeChange = new EventEmitter<string>();

    constructor() {}

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

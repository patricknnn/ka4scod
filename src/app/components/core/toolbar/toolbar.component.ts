import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
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
  constructor() { }

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

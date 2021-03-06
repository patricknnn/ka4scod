import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-title-section',
    templateUrl: './title-section.component.html',
    styleUrls: ['./title-section.component.scss'],
})
export class TitleSectionComponent {
    @Input() title!: string;
    @Input() subTitle?: string;
    @Input() icon?: string;
    @Input() buttonIcon?: string;
    @Input() imageClass: string = 'bg-mw-2';
    
    @Output() buttonClick = new EventEmitter();

    emitButtonClick() {
        this.buttonClick.emit();
    }
}

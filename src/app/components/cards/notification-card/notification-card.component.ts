import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent {
  @Input() type: 'info' | 'warning' | 'error' = 'info';
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() content?: string;
  @Input() buttonText?: string;
  @Input() buttonLink?: string;
}

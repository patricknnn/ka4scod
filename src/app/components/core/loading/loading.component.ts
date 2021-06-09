import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  /**
   * Message
   */
  @Input() message?: string;
  /**
   * Message
   */
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  /**
  * Message
  */
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';
  /**
   * Message
   */
  @Input() value: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

}

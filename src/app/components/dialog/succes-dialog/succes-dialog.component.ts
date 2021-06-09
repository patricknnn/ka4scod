import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-succes-dialog',
  templateUrl: './succes-dialog.component.html',
  styleUrls: ['./succes-dialog.component.scss']
})
export class SuccesDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}

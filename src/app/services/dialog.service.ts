import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/dialog/error-dialog/error-dialog.component';
import { PromptDialogComponent } from '../components/dialog/prompt-dialog/prompt-dialog.component';
import { SuccesDialogComponent } from '../components/dialog/succes-dialog/succes-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    /**
     * Dialog reference
     */
    dialogRef!: MatDialogRef<any>;

    /**
     * Initialize dialog
     * @param dialog MatDialog
     */
    constructor(public dialog: MatDialog) {}

    /**
     * Open succes dialog
     */
    succesDialog(title = 'Error', text = 'An error occured'): void {
        this.dialogRef = this.dialog.open(SuccesDialogComponent, {
            width: '350px',
            data: { title: title, text: text },
        });
    }

    /**
     * Open error dialog
     */
    errorDialog(title = 'Error', text = 'An error occured'): void {
        this.dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '350px',
            data: { title: title, text: text },
        });
    }

    /**
     * Open confirm dialog
     */
    confirmDialog(
        title = 'Confirm',
        text = 'Are you sure?',
        cancelText = 'Cancel',
        okText = 'Yes'
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const dialogRef = this.dialog.open(PromptDialogComponent, {
                width: '350px',
                data: {
                    title: title,
                    text: text,
                    cancelText: cancelText,
                    okText: okText,
                },
            });
            dialogRef.afterClosed().subscribe((result) => {
                result ? resolve(true) : resolve(false);
            });
        });
    }
}

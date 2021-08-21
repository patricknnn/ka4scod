import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { FormControlBase } from 'src/app/modules/dynamic-forms/models/form-control-base';
import { FormControlText } from 'src/app/modules/dynamic-forms/models/form-control-text';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/firestore/auth.service';
import { UserService } from 'src/app/services/firestore/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    user?: User;
    isLoading: boolean = true;
    formControls?: FormControlBase<any>[];
    formAppearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'standard';
    formColor: 'primary' | 'accent' | 'warn' = 'primary';
    allowInvalidSubmit: boolean = false;
    elevation: string = 'mat-elevation-z4';

    constructor(
        private firestore: UserService,
        private auth: AuthService,
        private dialog: DialogService
    ) {}

    ngOnInit(): void {
        this.retrieve();
    }

    retrieve(): void {
        let key = this.auth.loggedInUser?.uid;
        if (key) {
            this.firestore
                .getByKey(key)
                .snapshotChanges()
                .pipe(map((c) => ({ key: c.payload.id, ...c.payload.data() })))
                .subscribe((data) => {
                    this.user = data;
                    this.isLoading = false;
                    this.formControls = this.getFormControls(this.user);
                });
        } else {
            this.dialog.errorDialog('Error', 'Failed to retrieve logged in user');
        }
    }

    getFormControls(user?: User) {
        let formControls = [
            new FormControlText({
                key: 'displayName',
                label: 'Name',
                value: user ? user.displayName : '',
                class: 'col-xs-12',
                order: 1,
            }),
            new FormControlText({
                key: 'photoURL',
                label: 'Photo',
                value: user ? user.photoURL : '',
                class: 'col-xs-12',
                order: 2,
            }),
            new FormControlText({
                key: 'ssoToken',
                label: 'SSO Token',
                value: user ? user.ssoToken : '',
                class: 'col-xs-12',
                order: 3,
            }),
        ];
        return formControls.sort((a, b) => a.order - b.order);
    }

    handleFormSubmit(event: any) {
        event = JSON.parse(event);
        if (this.user) {
            this.user.displayName = event.displayName;
            this.user.photoURL = event.photoURL;
            this.user.ssoToken = event.ssoToken;
            this.save();
        }
    }

    save(): void {
        if (this.user) {
            this.firestore
                .write(this.user)
                .then(() => {
                    this.dialog.succesDialog('Succes', 'User updated!');
                })
                .catch((err) => {
                    this.dialog.errorDialog('Error', err);
                });
        }
    }
}

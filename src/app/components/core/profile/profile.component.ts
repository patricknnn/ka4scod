import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { FormControlBase } from 'src/app/modules/dynamic-forms/models/form-control-base';
import { FormControlText } from 'src/app/modules/dynamic-forms/models/form-control-text';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/firestore/auth.service';
import { UserService } from 'src/app/services/firestore/user.service';
import { NodeRestApiService } from 'src/app/services/node-rest-api.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    user?: User;
    ssoToken: string = '';
    isLoading: boolean = true;
    formControls?: FormControlBase<any>[];
    formAppearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'standard';
    formColor: 'primary' | 'accent' | 'warn' = 'primary';
    allowInvalidSubmit: boolean = false;
    elevation: string = 'mat-elevation-z4';

    constructor(
        private firestore: UserService,
        private auth: AuthService,
        private dialog: DialogService,
        private api: NodeRestApiService
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
                    this.ssoToken = this.user.ssoToken || '';
                    this.isLoading = false;
                    this.formControls = this.getFormControls(this.user);
                });
        } else {
            this.dialog.errorDialog(
                'Error',
                'Failed to retrieve logged in user'
            );
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
        ];
        return formControls.sort((a, b) => a.order - b.order);
    }

    validateSsoToken(): void {
      console.log(this.ssoToken);
      
        this.api.validateSsoToken(this.ssoToken).then(
            (res) => {
                this.dialog.succesDialog('SSO Token Status', res);
            },
            (error) => {
                this.dialog.errorDialog('SSO Token Status', error);
            }
        );
    }

    handleFormSubmit(event: any) {
        event = JSON.parse(event);
        if (this.user) {
            this.user.displayName = event.displayName;
            this.user.photoURL = event.photoURL;
            this.user.ssoToken = this.ssoToken;
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

    sendVerification(): void {
        this.auth.sendVerificationMail();
    }
}

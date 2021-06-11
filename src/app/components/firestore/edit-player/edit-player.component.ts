import { Component, Input, OnInit } from '@angular/core';
import { FormControlBase } from 'src/app/modules/dynamic-forms/models/form-control-base';
import { FormControlDropdown } from 'src/app/modules/dynamic-forms/models/form-control-dropdown';
import { FormControlText } from 'src/app/modules/dynamic-forms/models/form-control-text';
import { DialogService } from 'src/app/services/dialog.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import { CodApiPlayer } from 'src/app/services/node-rest-api.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  @Input() player?: CodApiPlayer;
  editPlayer: boolean = false;
  isLoading: boolean = true;
  formControls: FormControlBase<any>[];
  formAppearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'standard';
  formColor: 'primary' | 'accent' | 'warn' = 'primary';
  allowInvalidSubmit: boolean = false;

  constructor(
    private firestore: PlayerService,
    private dialog: DialogService
  ) {
    this.formControls = this.getFormControls();
  }

  ngOnInit(): void {
    if (!this.player) {
      this.editPlayer = false;
      this.player = {
        name: '',
        gamertag: '',
        platform: 'battle'
      }
    } else {
      this.editPlayer = true;
    }
    this.isLoading = false;
  }

  getFormControls() {
    let formControls = [
      new FormControlText({
        key: 'name',
        label: 'Name',
        order: 1
      }),
      new FormControlText({
        key: 'gamertag',
        label: 'Gamertag',
        order: 1
      }),
      new FormControlDropdown({
        key: 'platform',
        label: 'Platform',
        options: [
          { key: 'battle', value: 'Battlenet' },
          { key: 'steam', value: 'Steam' },
          { key: 'psn', value: 'Playstation' },
          { key: 'xbl', value: 'Xbox' },
          { key: 'acti', value: 'Activision (acti)' },
          { key: 'uno', value: 'Activision (uno)' }
        ],
        order: 2
      }),
    ];
    return formControls.sort((a, b) => a.order - b.order);
  }

  handleFormSubmit(event: string) {
    console.log(event);
  }

  save(): void {
    if (this.player) {
      this.firestore.create(this.player).then(() => {
        this.dialog.succesDialog('Succes', 'Player created!');
      });
    }

  }

  update(): void {
    if (this.player?.key) {
      this.firestore.update(this.player.key, this.player)
        .then(() => {
          this.dialog.succesDialog('Succes', 'Player updated!');
        })
        .catch((err) => {
          this.dialog.errorDialog('Error', err);
        });
    }
  }

}

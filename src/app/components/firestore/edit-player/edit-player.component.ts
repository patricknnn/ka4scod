import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/models/player';
import { FormControlBase } from 'src/app/modules/dynamic-forms/models/form-control-base';
import { FormControlDropdown } from 'src/app/modules/dynamic-forms/models/form-control-dropdown';
import { FormControlText } from 'src/app/modules/dynamic-forms/models/form-control-text';
import { DialogService } from 'src/app/services/dialog.service';
import { PlayerService } from 'src/app/services/firestore/player.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  player: Player = {};
  editPlayer: boolean = false;
  isLoading: boolean = true;
  formControls?: FormControlBase<any>[];
  formAppearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'standard';
  formColor: 'primary' | 'accent' | 'warn' = 'primary';
  allowInvalidSubmit: boolean = false;

  constructor(
    private firestore: PlayerService,
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let key = this.route.snapshot.paramMap.get('key');
    if (key && key != 'undefined') {
      this.editPlayer = true;
      this.retrieve(key);
    } else {
      this.isLoading = false;
      this.formControls = this.getFormControls();
    }
  }

  retrieve(key: string): void {
    this.firestore.getByKey(key).snapshotChanges().pipe(
      map(c =>
        ({ key: c.payload.id, ...c.payload.data() })
      )
    ).subscribe(data => {
      this.player = data;
      this.isLoading = false;
      this.formControls = this.getFormControls(this.player);
    });
  }

  getFormControls(player?: Player) {
    let formControls = [
      new FormControlText({
        key: 'name',
        label: 'Name',
        value: player ? player.name : '',
        class: 'column',
        order: 1
      }),
      new FormControlText({
        key: 'gamertag',
        label: 'Gamertag',
        value: player ? player.gamertag : '',
        class: 'column',
        order: 2
      }),
      new FormControlDropdown({
        key: 'platform',
        label: 'Platform',
        value: player ? player.platform : '',
        class: 'column',
        options: [
          { key: 'battle', value: 'Battlenet' },
          { key: 'steam', value: 'Steam' },
          { key: 'psn', value: 'Playstation' },
          { key: 'xbl', value: 'Xbox' },
          { key: 'acti', value: 'Activision (acti)' },
          { key: 'uno', value: 'Activision (uno)' }
        ],
        order: 3
      }),
      new FormControlText({
        key: 'avatar',
        label: 'Avatar',
        value: player ? player.avatar : '',
        class: 'column',
        order: 3
      }),
    ];
    return formControls.sort((a, b) => a.order - b.order);
  }

  handleFormSubmit(event: any) {
    event = JSON.parse(event);
    this.player.name = event.name;
    this.player.gamertag = event.gamertag;
    this.player.platform = event.platform;
    this.player.avatar = event.avatar;
    this.editPlayer ? this.update() : this.save();
  }

  save(): void {
    this.firestore.create(this.player)
      .then(() => {
        this.dialog.succesDialog('Succes', 'Player created!');
        this.router.navigate(['/players']);
      })
      .catch((err) => {
        this.dialog.errorDialog('Error', err);
      });
  }

  update(): void {
    if (this.player?.key) {
      this.firestore.update(this.player.key, this.player)
        .then(() => {
          this.dialog.succesDialog('Succes', 'Player updated!');
          this.router.navigate(['/players']);
        })
        .catch((err) => {
          this.dialog.errorDialog('Error', err);
        });
    }
  }

}

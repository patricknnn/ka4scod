import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private firestore: PlayerService,
    private dialog: DialogService
  ) { }

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

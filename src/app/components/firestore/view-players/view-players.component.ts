import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/models/player';
import { DynamicTableButton } from 'src/app/modules/dynamic-tables/models/dynamic-table-button';
import { DynamicTableButtonClick } from 'src/app/modules/dynamic-tables/models/dynamic-table-button-click';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-view-players',
  templateUrl: './view-players.component.html',
  styleUrls: ['./view-players.component.scss']
})
export class ViewPlayersComponent implements OnInit {
  tableData: Player[] = [];
  tableConfig?: DynamicTableConfig;
  columnConfig: DynamicTableColumnConfig[] = [];
  isLoading: boolean = true;

  constructor(
    private firestore: PlayerService,
    private tables: TableService,
    private dialog: DialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.tableConfig = this.tables.getTableConfig();
    this.columnConfig = [
      new DynamicTableColumnConfig({
        key: 'name',
        header: 'Name',
        sortable: true,
        draggable: true
      }),
      new DynamicTableColumnConfig({
        key: 'gamertag',
        header: 'Gamertag',
        sortable: true,
        draggable: true
      }),
      new DynamicTableColumnConfig({
        key: 'platform',
        header: 'Platform',
        sortable: true,
        draggable: true
      }),
      new DynamicTableColumnConfig({
        key: 'buttons',
        header: 'Actions',
        buttons: [
          new DynamicTableButton("edit", "edit"),
          new DynamicTableButton("delete", "delete", "warn"),
        ],
      })
    ];
    this.retrieve();
  }

  retrieve(): void {
    this.firestore.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ))
      .subscribe(data => {
        this.tableData = data;
        this.isLoading = false;
      });
  }

  edit(key?: number): void {
    this.router.navigate(['/player', { key: key }]);
  }

  delete(player: Player): void {
    this.dialog.confirmDialog('Are you sure?', 'Deleting a player cannot be undone!', 'cancel', 'delete').then((result) => {
      if (result && player.key) {
        this.firestore.delete(player.key)
          .then(() => {
            this.dialog.succesDialog('Succes', 'Player deleted!');
            this.retrieve();
          })
          .catch((err) => {
            this.dialog.errorDialog('Error', err);
          });
      }
    })
  }

  /**
   * Handles SelectionChangeEvent
   * @param event SelectionChangeEvent
   */
  handleSelectionChangeEvent(event: any): void {
    console.log(event);
  }

  /**
   * Handles ButtonClickEvent
   * @param event ButtonClickEvent
   */
  handleButtonClickEvent(event: DynamicTableButtonClick): void {
    if (event.button.name == 'delete') {
      this.delete(event.row);
    } else if (event.button.name == 'edit') {
      this.edit(event.row.key);
    }
  }

}

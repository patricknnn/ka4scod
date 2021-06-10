import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { DialogService } from 'src/app/services/dialog.service';
import { PlayerService } from 'src/app/services/firestore/player.service';
import { CodApiPlayer } from 'src/app/services/node-rest-api.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-view-players',
  templateUrl: './view-players.component.html',
  styleUrls: ['./view-players.component.scss']
})
export class ViewPlayersComponent implements OnInit {
  tableData: CodApiPlayer[] = [];
  tableConfig?: DynamicTableConfig;
  columnConfig: DynamicTableColumnConfig[] = [];
  isLoading: boolean = true;

  constructor(
    private firestore: PlayerService,
    private tables: TableService,
    private dialog: DialogService
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
    ];
  }

  retrieve(): void {
    this.firestore.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.tableData = data;
      this.isLoading = false;
    });
  }

  delete(player: CodApiPlayer): void {
    if (player.key) {
      this.firestore.delete(player.key)
        .then(() => {
          this.dialog.succesDialog('Succes', 'Player deleted!');
        })
        .catch((err) => {
          this.dialog.errorDialog('Error', err);
        });
    }
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
  handleButtonClickEvent(event: any): void {
    console.log(event);
  }

}

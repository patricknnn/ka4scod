import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CodApiPlayer } from '../node-rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private dbPath = '/players';
  playersRef: AngularFirestoreCollection<CodApiPlayer>;

  constructor(private db: AngularFirestore) {
    this.playersRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<CodApiPlayer> {
    return this.playersRef;
  }

  create(player: CodApiPlayer): any {
    return this.playersRef.add({ ...player });
  }

  update(id: string, data: any): Promise<void> {
    return this.playersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.playersRef.doc(id).delete();
  }
}

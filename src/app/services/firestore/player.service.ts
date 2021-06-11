import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Player } from 'src/app/models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private dbPath = '/players';
  playersRef: AngularFirestoreCollection<Player>;

  constructor(private db: AngularFirestore) {
    this.playersRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Player> {
    return this.playersRef;
  }

  create(player: Player): Promise<DocumentReference<Player>> {
    player.timestampCreated = Date.now();
    return this.playersRef.add({ ...player });
  }

  update(key: string, data: Player): Promise<void> {
    data.timestampCreated = Date.now();
    return this.playersRef.doc(key).update(data);
  }

  delete(key: string): Promise<void> {
    return this.playersRef.doc(key).delete();
  }

  getByKey(key: string): AngularFirestoreDocument<Player> {
    return this.playersRef.doc(key);
  }
}

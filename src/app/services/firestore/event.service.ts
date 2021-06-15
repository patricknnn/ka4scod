import { Injectable } from '@angular/core';
import {
    AngularFirestoreCollection,
    AngularFirestore,
    DocumentReference,
    AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { LanEvent } from 'src/app/models/event';
import { Player } from 'src/app/models/player';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private dbPath = '/events';
    eventsRef: AngularFirestoreCollection<LanEvent>;

    constructor(private db: AngularFirestore) {
        this.eventsRef = db.collection(this.dbPath);
    }

    getAll(): AngularFirestoreCollection<LanEvent> {
        return this.eventsRef;
    }

    create(data: LanEvent): Promise<DocumentReference<LanEvent>> {
        data.timestampCreated = Date.now();
        return this.eventsRef.add({ ...data });
    }

    update(key: string, data: LanEvent): Promise<void> {
        data.timestampUpdated = Date.now();
        return this.eventsRef.doc(key).update(data);
    }

    delete(key: string): Promise<void> {
        return this.eventsRef.doc(key).delete();
    }

    getByKey(key: string): AngularFirestoreDocument<LanEvent> {
        return this.eventsRef.doc(key);
    }
}

import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
    DocumentReference,
} from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private dbPath = '/users';
    usersRef: AngularFirestoreCollection<User>;

    constructor(private db: AngularFirestore) {
        this.usersRef = db.collection(this.dbPath);
    }

    getAll(): AngularFirestoreCollection<User> {
        return this.usersRef;
    }

    getByKey(key: string): AngularFirestoreDocument<User> {
        return this.usersRef.doc(key);
    }

    write(user: User): Promise<void> {
        user.timestampCreated = Date.now();
        return this.usersRef.doc(user.uid).set(user, {
            merge: true,
        });
    }

    delete(key: string): Promise<void> {
        return this.usersRef.doc(key).delete();
    }
}

import { FirebaseEntity } from './firebase-entity';

export interface User extends FirebaseEntity {
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    ssoToken?: string;
}

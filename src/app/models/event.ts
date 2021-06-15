import { FirebaseEntity } from './firebase-entity';
import { Player } from './player';

export interface LanEvent extends FirebaseEntity {
    name?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    players?: string[];
}

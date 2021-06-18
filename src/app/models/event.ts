import { FirebaseEntity } from './firebase-entity';
import { Player } from './player';

export interface LanEvent extends FirebaseEntity {
    name?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    currentDate?: string;
    players?: LanEventPlayer[];
}

export interface LanEventPlayer {
    player?: Player;
    statsStart?: any;
    statsStartWarzone?: any;
    statsEnd?: any;
    statsEndWarzone?: any;
    statsCurrent?: any;
    statsCurrentWarzone?: any;
    statsCompared?: any;
    statsComparedWarzone?: any;
}

import { FirebaseEntity } from './firebase-entity';
import { Player } from './player';

export interface LanEvent extends FirebaseEntity {
    name?: string;
    location?: string;
    image?: string;
    startDate?: string;
    endDate?: string;
    currentDate?: string;
    players?: LanEventPlayer[];
}

export interface LanEventPlayer {
    player?: Player;
    statsStart?: any;
    statsStartWarzone?: any;
    statsStartVanguard?: any;
    statsEnd?: any;
    statsEndWarzone?: any;
    statsEndVanguard?: any;
    statsCurrent?: any;
    statsCurrentWarzone?: any;
    statsCurrentVanguard?: any;
    statsCompared?: any;
    statsComparedWarzone?: any;
    statsComparedVanguard?: any;
}

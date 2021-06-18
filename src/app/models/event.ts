import { FirebaseEntity } from './firebase-entity';
import { LifetimeStats } from './lifetime-stats';
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
    statsEnd?: any;
    statsCurrent?: any;
    statsCompared?: any;
}

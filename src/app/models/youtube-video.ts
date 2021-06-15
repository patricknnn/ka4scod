import { FirebaseEntity } from './firebase-entity';

export interface YoutubeVideo extends FirebaseEntity {
    title?: string;
    player?: string;
    game?: string;
    url?: string;
}

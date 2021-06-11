import { FirebaseEntity } from "./firebase-entity";

export interface Player extends FirebaseEntity {
  avatar?: string,
  name?: string,
  gamertag?: string,
  platform?: 'battle' | 'steam' | 'psn' | 'xbl' | 'acti' | 'uno' | 'all'
}
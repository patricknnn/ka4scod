import { FirebaseEntity } from "./firebase-entity";

export interface Player extends FirebaseEntity {
  name?: string,
  gamertag?: string,
  platform?: string
}
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { YoutubeVideo } from 'src/app/models/youtube-video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private dbPath = '/videos';
  videosRef: AngularFirestoreCollection<YoutubeVideo>;

  constructor(private db: AngularFirestore) {
    this.videosRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<YoutubeVideo> {
    return this.videosRef;
  }

  create(video: YoutubeVideo): Promise<DocumentReference<YoutubeVideo>> {
    video.timestampCreated = Date.now();
    return this.videosRef.add({ ...video });
  }

  update(key: string, video: YoutubeVideo): Promise<void> {
    video.timestampUpdated = Date.now();
    return this.videosRef.doc(key).update(video);
  }

  delete(key: string): Promise<void> {
    return this.videosRef.doc(key).delete();
  }

  getByKey(key: string): AngularFirestoreDocument<YoutubeVideo> {
    return this.videosRef.doc(key);
  }
}

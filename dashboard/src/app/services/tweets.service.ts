import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { Tweet } from '../models/tweet/tweet';
import { Alert } from '../models/alert/alert';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  constructor(private socket: Socket) { }

  public askUserId(): void {
    this.socket.emit('ASK_USER_ID');
  }

  public getUserId(): Observable<string> {
    return new Observable<string>(observer => {
        this.socket.on('USER_ID', (id: string) => observer.next(id));
    });
  }

  public start(hastag: string, userInfo): void {
    this.socket.emit('GET_TWEETS', hastag, userInfo);
  }

  public getTweets(): Observable<Tweet> {
      return new Observable<Tweet>(observer => {
          this.socket.on('TWEETS', (data: Tweet) => observer.next(data));
      });
  }

  public sendLinkToReport(link, userId) {
    this.socket.emit('GET_TWEETS_REPORT', link, userId);
  }

  public getReport(): Observable<Alert> {
    return new Observable<Alert>(observer => {
        this.socket.on('REPORT', (data: Alert) => observer.next(data));
    });
}

public stopTweets() {
  this.socket.emit('STOP_TWEETS');
}

  // getTweets() {
  //   let tweets:string[] = [];
  //   this.socket.emit('GET_TWEETS');

  //   this.socket.on('TWEETS', (data) => {
  //     tweets = data
  //   });

  //   return tweets;
  // }
}

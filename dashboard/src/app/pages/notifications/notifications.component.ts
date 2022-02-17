import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  tweets;
  constructor() {
    this.tweets = []
   }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('history'))) {
      this.tweets = JSON.parse(localStorage.getItem('history'));
    }
  }

}

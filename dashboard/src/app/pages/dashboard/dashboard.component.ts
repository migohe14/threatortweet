import { Component, OnInit } from '@angular/core';
// import { TweetsService } from '../../services/tweets.service';
import { Tweet } from '../../models/tweet/tweet';
import { Alert } from '../../models/alert/alert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tweets: string[];
  showForm: boolean = false;
  alertForm: boolean = false;
  user = {
    name: '',
    lastname: '',
    job: '',
  }
  users: { name: string, lastname: string, job: string }[] = [{name: "User1", lastname: "Lastname", job: "BackEnd"}, {name: "Marco", lastname: "Polo", job: "FrontEnd"}, {name: "Paco", lastname: "Chocolate", job: "QA"}];
  notifications: string [] = [];
  userbtn: boolean = false;
  constructor(
    // private tweetsService: TweetsService
    ) { 
    setTimeout(() => {
      this.userbtn = true;
    }, 2000)
  }

  ngOnInit() {

  }

  // getData() {
  //   this.tweetsService.start('espeto')
  //   this.tweetsService.getTweets().subscribe((data) => {
  //     console.log(data);
  //   });
  // }
  addUser() {
    let user = {name: this.user.name, lastname: this.user.lastname, job: this.user.job};
    this.users.push(user);

    this.user.name = '';
    this.user.lastname = '';
    this.user.job = '';

    this.notifications.push(this.user.name)
    this.alertForm = true;
  }
  deleteUser(user) {
    let index = this.users.indexOf(user)
    this.users.splice(index, 1)
    console.log(this.users)
  }

  displayForm() {
    this.showForm = true;
  }
  hiddeForm() {
    this.showForm = false;
  }
}

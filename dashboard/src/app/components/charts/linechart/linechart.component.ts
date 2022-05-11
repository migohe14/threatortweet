import { Component, OnInit } from '@angular/core';
import { TweetsService } from '../../../services/tweets.service';
import { Tweet } from 'src/app/models/tweet/tweet';
import * as moment from 'moment';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {
  tweets;
  allLinks;
  wordToTrack: string;
  onlyHttp: boolean;
  onlyAlerts: boolean;
  tracking:boolean;
  userId;

  // keys
  keysSeted: boolean;
  keys:any = {
    userId: '',
    active: '',
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: '',
  }

  constructor(
    private tweetsService: TweetsService,
    private sanitizer:DomSanitizer
  ) { 

    this.tweets = [];
    this.allLinks = [];
    this.tracking = false;
    this.onlyHttp = false;
    this.onlyAlerts = false;
  }

  public lineChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true,
              min: 0,
              max: 10
          }
      }]
  }
  };
  public lineChartLabels = [];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartData = [
    {data: [], label: 'Positives'},
    // {data: [], label: 'Links'}
  ];
  interval;
  ngOnInit() {
    this.keys.active = localStorage.getItem('active');
    if(this.keys.active === 'true') {
      this.keys.active = true;
    } else if(this.keys.active === 'false' || !this.keys.active) {
      this.keys.active = false;
    }
    this.keys.consumer_key = localStorage.getItem('consumer_key');
    this.keys.consumer_secret = localStorage.getItem('consumer_secret');
    this.keys.access_token = localStorage.getItem('access_token');
    this.keys.access_token_secret = localStorage.getItem('access_token_secret');
    
    this.getUserId();
  }
  sanitize(user:string, tweet:string){
    // let url = 'https://twitframe.com/show?url=' + encodeURIComponent(url);
    let url = 'https://twitter.com/' + user + '/status/' + tweet;
    url = encodeURIComponent(url);
    url = 'https://twitframe.com/show?url=' + url;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  track() {
    if(this.wordToTrack) {
      this.tracking = true;
      this.startTimer()
      this.getData(this.wordToTrack, this.keys)
    } else {
      // console.log("Not track")
    }
  }
  getUserId(){
    this.tweetsService.askUserId();
    this.tweetsService.getUserId().subscribe((id) => {
      this.userId = id;
      this.keys.userId = id;
    });
  }
  getData(wordToTrack, keys) {
    this.tweetsService.start(wordToTrack, keys)
    this.tweetsService.getTweets().subscribe((data) => {
      let tweet: any = data;
      
      let isDuplicated;
      if(this.tweets.length > 0) {
        this.tweets.map((twt) => {
          if(twt.link === tweet.tweet.entities.urls[0].expanded_url) {
            isDuplicated = true;
          } else {
            isDuplicated = false;
          }
        });
      } else {
        isDuplicated = false;
      } 
      if(isDuplicated === false) {
        let analyzeLink = tweet.tweet.entities.urls[0].expanded_url.split("/").join("%252F");
        // let analyzeLink = encodeURIComponent(tweet.tweet.entities.urls[0].expanded_url)
        analyzeLink = analyzeLink.split(":").join("%253A");
        analyzeLink = analyzeLink.split("=").join("%253D");

        this.tweets.push({
          link: tweet.tweet.entities.urls[0].expanded_url,
          reportAvailable: false,
          report: '',
          analyze: 'https://www.virustotal.com/gui/search/' + analyzeLink,
          positives: null,
          user: tweet.tweet.user.screen_name,
          tweet: tweet.tweet.id_str
        });
        // console.log(this.lineChartData[1].data.length)
        // this.lineChartData[1].data.push(this.lineChartData[1].data.length + 1);

        this.getVTReport(tweet.tweet.entities.urls[0].expanded_url)
      }
      // console.log(data);
      // Get report
    });
  }
  getVTReport(link) {
    // setInterval(() => {
      this.tweetsService.sendLinkToReport(link, this.keys.userId);
      this.tweetsService.getReport().subscribe((data) => {
        let report: any = data
        this.tweets.map((tw)=>{
          if(report) {
            tw.report = `https://www.virustotal.com/gui/url/${report.report.data.id}`;
            tw.reportAvailable = true;
            tw.positives = report.report.data.attributes.last_analysis_stats.malicious;
            if(report.report.data.attributes.last_analysis_stats.malicious > 0) {
              this.lineChartData[0].data.push(report.report.data.attributes.last_analysis_stats.malicious);

              let items = [];
              if(JSON.parse(localStorage.getItem('history'))) {
                items = JSON.parse(localStorage.getItem('history'));
              }
              let included = false;
              items.map((it) => {
                if(it.link === tw.link) {
                  included = true;
                }
              });

              if(!included) {
                items.push(
                  {
                    report:`https://www.virustotal.com/gui/url/${report.report.data.id}`,
                    link: tw.link,
                    tweet: tw.tweet,
                    user: tw.user,
                    time: moment().format('MMMM Do YYYY, h:mm:ss a')
                  }
                )
              }


              localStorage.setItem('history', JSON.stringify(items));
            }
          } else {
            
          }
        })
      // Variable ngFor report = true
        // console.log(data);
      });
    // },10000)
  }
  startTimer() {

    this.interval = setInterval(() => {
      let date = new Date();
      let hour:any = date.getHours();
      let min:any = date.getMinutes();
      let sec:any = date.getSeconds();
      // console.log(hour)
      if(hour < 10) {
        hour = '0'+ hour;
      }
      if(min < 10) {
        min = '0' + min;
      }
      if(sec < 10) {
        sec = '0' + sec;
      }
      let time = hour + ':' + min + ':' + sec;
      this.lineChartLabels.push(time);
      this.lineChartData[0].data.push(0);
      if(this.lineChartLabels.length > 6) {
        this.lineChartLabels.shift();
        this.lineChartData[0].data.shift();
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  getOnlyHttp() {
    console.log(this.allLinks)
    if(this.onlyAlerts && this.onlyHttp) {
      this.tweets = this.allLinks.filter(tw => !tw.link.includes("https") && tw.positives > 0);
    } else if(this.onlyHttp && !this.onlyAlerts) {
      this.tweets = this.allLinks.filter(tw => !tw.link.includes("https"));
    } else if(this.onlyAlerts && !this.onlyHttp) {
      this.tweets = this.allLinks.filter(tw => tw.positives > 0);
    } else {
      this.tweets = this.allLinks;
    }
  }
  getAlerts() {
    console.log(this.allLinks)
    if(this.onlyAlerts && this.onlyHttp) {
      this.tweets = this.allLinks.filter(tw => !tw.link.includes("https") && tw.positives > 0);
    } else if(this.onlyAlerts && !this.onlyHttp) {
      this.tweets = this.allLinks.filter(tw => tw.positives > 0);
    } else if(!this.onlyAlerts && this.onlyHttp) {
      this.tweets = this.allLinks.filter(tw => !tw.link.includes("https"));
    } else {
      this.tweets = this.allLinks;
    }
  }
  filterTweets(e) {
    if(this.onlyHttp && this.onlyAlerts) {
      this.tweets = this.allLinks.filter(tw => !tw.link.includes("https") && tw.link.includes(e.target.value) && tw.positives > 0);
    } else if(this.onlyHttp) {
      this.tweets = this.allLinks.filter(tw => !tw.link.includes("https") && tw.link.includes(e.target.value));
    } else if(this.onlyAlerts) {
      this.tweets = this.allLinks.filter(tw => tw.link.includes(e.target.value) && tw.positives > 0);
    } else {
      this.tweets = this.allLinks.filter(tw => tw.link.includes(e.target.value));
    }
  }
  stopTweets() {
    this.allLinks = this.tweets;
    this.tracking = false;
    this.tweetsService.stopTweets();
    this.pauseTimer();
  }

}

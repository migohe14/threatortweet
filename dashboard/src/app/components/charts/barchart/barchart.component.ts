import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
  constructor() { }
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Series A'},
    {data: [], label: 'Series B'}
  ];
  interval;
  ngOnInit() {
    // this.startTimer()

  }
  startTimer() {

    this.interval = setInterval(() => {
      let date = new Date();
      let min:any = date.getMinutes();
      let sec:any = date.getSeconds();
      if(min < 10) {
        min = '0' + min;
      }
      if(sec < 10) {
        sec = '0' + sec;
      }
      let time = min + ':' + sec;
      this.barChartLabels.push(time);
      if(this.barChartLabels.length > 6) {
        this.barChartLabels.shift();
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
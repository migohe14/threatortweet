import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-bubblechart',
  templateUrl: './bubblechart.component.html',
  styleUrls: ['./bubblechart.component.css']
})
export class BubblechartComponent implements OnInit {
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    title:{
        display: true,
        text:'Alerts tweets'
    },    
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time ( UTC )'
        },
        type: 'time',
        time: {
          tooltipFormat: "hh:mm:ss",
          displayFormats: {
            hour: 'MMM D, hh:mm:ss'
          }
        },
        ticks: {
                  maxRotation: 90,
                  minRotation: 90
        }
      }],
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData = [
    {
      data: [
      
      ],
      label: 'Series A',
    },
  ];

  public bubbleChartColors: Color[] = [
    {
      backgroundColor: [
        'red',
        'green',
        'blue',
        'purple',
      ]
    }
  ];
  interval;


  constructor() { }

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
      this.bubbleChartData[0].data.push({
        x: sec,
        y: 0,
        r: 5
      })
      if(this.bubbleChartData[0].data.length > 10) {
        this.bubbleChartData[0].data.shift();
      }
    },1000)
  }
}

import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dashboard';
  home: boolean;
  mobile: boolean;
  constructor(
    private spinner: NgxSpinnerService
  ) {
    this.home = true;
   }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      this.mobile = true;
    }else{
      this.mobile = false;
    }
  }

  startHunting() {
    this.spinner.show();

    setTimeout(() => {
      this.home = false;
      this.spinner.hide();
    }, 2000);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  totalSpacexList: any = [];
  yearSelected: any;
  isSuccessLaunch;
  isSuccessLanding;
  isLoading = true;

  yearList = [
    { year: 2006, selected: false },
    { year: 2007, selected: false },
    { year: 2008, selected: false },
    { year: 2009, selected: false },
    { year: 2010, selected: false },
    { year: 2011, selected: false },
    { year: 2012, selected: false },
    { year: 2013, selected: false },
    { year: 2014, selected: false },
    { year: 2015, selected: false },
    { year: 2016, selected: false },
    { year: 2017, selected: false },
    { year: 2018, selected: false },
    { year: 2019, selected: false },
    { year: 2020, selected: false },
  ];

  launcharr = [
    { value: 'True', selected: false },
    { value: 'False', selected: false },
  ];

  landingarr = [
    { value: 'True', selected: false },
    { value: 'False', selected: false },
  ];
  constructor(private httpclient: HttpClient) {}

  ngOnInit(): void {
    this.httpclient
      .get('https://api.spacexdata.com/v3/launches?limit=100')
      .subscribe(
        (res) => {
          this.isLoading = false;
          if (res) {
            this.totalSpacexList = res;
          }
        },
        (error) => {
          console.log('error');
          this.isLoading = false;
        }
      );
  }

  applyyearfilter(index: any) {
    this.yearList.forEach((el) => (el.selected = false));
    this.yearList[index].selected = true;
    this.yearSelected = this.yearList[index].year;

    this.callapi();
  }

  handlelaunch(data, index) {
    this.launcharr.forEach((el) => (el.selected = false));
    this.launcharr[index].selected = true;
    this.isSuccessLaunch = data.value === 'True' ? true : false;
    this.callapi();
  }

  handlelanding(data, index) {
    this.landingarr.forEach((el) => (el.selected = false));
    this.landingarr[index].selected = true;
    this.isSuccessLanding = data.value === 'True' ? true : false;
    this.callapi();
  }

  callapi() {
    let baseurl = 'https://api.spaceXdata.com/v3/launches?limit=100';

    if (this.isSuccessLaunch) {
      baseurl = baseurl + '&launch_success=true';
    }

    if (this.isSuccessLanding) {
      baseurl = baseurl + '&land_success=true';
    }

    if (this.yearSelected) {
      baseurl = `${baseurl}&launch_year=${this.yearSelected}`;
    }

    this.totalSpacexList = [];

    this.httpclient.get(baseurl).subscribe(
      (res) => {
        this.isLoading = false;

        if (res) {
          this.totalSpacexList = res;
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
}

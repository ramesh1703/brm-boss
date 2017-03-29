import { Component, OnInit } from '@angular/core';

import { AppConstant } from 'app/app-constant';

import { DashboardService } from '../service/dashboard.service';

@Component({
  moduleId: module.id,
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css'],
  providers: [DashboardService]
})

export class QuickViewComponent implements OnInit {

  loading: boolean;
  error: string;
  status: string;
  loaList: Array<any>;
  alertList: Array<any>;
  action: string;
  actionsEnabled: boolean;

  constructor(
    private _dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getAllLOA();
    this.getAlerts();
  }

  getAllLOA(): void {
    this.loading = true;
    this.error = '';
    this.action = 'status';
    this._dashboardService.getAllLOA().then(response => {
      this.loading = false;
      console.log('response', response);
      this.loaList = response;

    }).catch(error => {
      this.loading = false;
      this.error = error.message;
      console.log('error.status', error.status);
      console.log('error', error);
    });
  }

  getAlerts(): void {
    this.loading = true;
    this.error = '';
    this.action = 'status';
    this._dashboardService.getAlerts().then(response => {
      this.loading = false;
      console.log('getAlerts()', response);
      this.alertList = response;

    }).catch(error => {
      this.loading = false;
      this.error = error.message;
      console.log('error.status', error.status);
      console.log('error', error);
      if (error.status >= 500 && error.status < 600) {
        this.status = AppConstant.ALERT_DANGER;
      } else if (error.status >= 400 && error.status < 500) {
        this.status = AppConstant.ALERT_WARNING;
      } else if (error.status >= 200 && error.status < 300) {
        this.status = AppConstant.ALERT_SUCCESS;
      } else if (error.status >= 100 && error.status < 200) {
        this.status = AppConstant.ALERT_INFO;
      } else {
        this.error = AppConstant.APP_ERROR;
        this.status = AppConstant.ALERT_DANGER;
      }
    });
  }

}

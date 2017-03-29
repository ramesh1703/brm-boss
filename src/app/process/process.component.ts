import { Component, OnInit, Input } from '@angular/core';

import { ProcessService } from './service/process.service';
import { AppConstant } from '../app-constant';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css'],
  providers: [ProcessService]
})
export class ProcessComponent implements OnInit {
  
  @Input() label: string;
  @Input() userPin: string;
  @Input() host: string;
  @Input() process: string;
  @Input() action: string;
  @Input() actionsEnabled: boolean;

  private loading:boolean;
  private error:string;
  private processStatus;
  private status:string;

  constructor(
    private _processService:ProcessService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.getProcess('status');
  }

  getProcess(action:string): void {
    this.loading = true;
    this.error = '';
    this._processService.process(this.userPin, this.host, this.process, action).then(response => {
      this.loading = false;
      this.error = '';
      this.processStatus = response;
      console.log('response', response);
      
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

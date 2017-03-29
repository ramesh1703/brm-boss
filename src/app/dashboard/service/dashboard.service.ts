import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from "@angular/http";

import { AppConstant } from 'app/app-constant';
import { StorageService } from 'app/storage/storage.service';

@Injectable()
export class DashboardService {

  private headers = new Headers(AppConstant.HEADER);
  private DEFAULT_URL: string = 'http://localhost:8080';
  private LOA_URL: string = this.DEFAULT_URL + '/dashboard/loa';
  private ALERTS_URL: string = this.DEFAULT_URL + '/dashboard/alerts';

  constructor(
    private http: Http,
    private _storageService: StorageService
  ) { }

  getAllLOA(): Promise<any[]> {
    let header: Headers = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('X-Auth', 'Bearer ' + this._storageService.get(AppConstant.HEADER_X_AUTH));
				
    let options = new RequestOptions();
    options.headers = header;

    console.log('this.options', options);

    return this.http.get(this.LOA_URL, options)
      .toPromise()
      .then(response => {
        var responseJSON: any = response.json();
        console.log('getAllLOA responseJSON', responseJSON);
        return responseJSON;
      })
      .catch(this.handleError);
  }

  getAlerts(): Promise<any[]> {
    let header: Headers = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('X-Auth', 'Bearer ' + this._storageService.get(AppConstant.HEADER_X_AUTH));

    let options = new RequestOptions();
    options.headers = header;
   
    return this.http.get(this.ALERTS_URL, { headers: this.headers })
      .toPromise()
      .then(response => {
        var responseJSON: any = response.json();
        console.log('Get Alerts', responseJSON);
        return responseJSON;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json());
  }


}

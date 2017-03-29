import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from "@angular/http";

import { AppConstant } from 'app/app-constant';
import { StorageService } from 'app/storage/storage.service';

@Injectable()
export class ProcessService {

  private headers = new Headers(AppConstant.HEADER);
  private DEFAULT_URL: string = 'http://localhost:8080';
  private PROCESS_URL: string = this.DEFAULT_URL + '/dashboard/process?';
  //private token:string = this._storageService.get(AppConstant.HEADER_X_AUTH);

  constructor(
    private http: Http,
    private _storageService: StorageService
  ) { }

  process(username: string, host: string, process: string, action: string): Promise<any[]> {
    let header: Headers = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('X-Auth', 'Bearer ' + this._storageService.get(AppConstant.HEADER_X_AUTH));

    let options = new RequestOptions();
    options.headers = header;
    let url: string = this.PROCESS_URL
                        + 'username=' + username
                        + '&host=' + host
                        + '&process=' + process
                        + '&action=' + action;
    console.log('Process URL', url);
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(response => {
        var responseJSON: any = response.json();
        console.log('Process Status', responseJSON);
        return responseJSON;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json());
  }

}

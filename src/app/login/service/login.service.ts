import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import { AppConstant } from 'app/app-constant';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  private headers = new Headers(AppConstant.HEADER);
  private DEFAULT_URL:string = 'http://localhost:8080';
  private LOGIN_URL:string = this.DEFAULT_URL + '/login';

  constructor(private http: Http) { }

  authenticate(login: any): Promise<any[]> {
    return this.http.post(this.LOGIN_URL, JSON.stringify(login), { headers: this.headers })
      .toPromise()
      .then(response => {
        var responseJSON:any = response.json();
        this.headers[AppConstant.HEADER_X_AUTH] = 'Bearer ' + responseJSON.token;
        console.log('this.headers[AppConstant.HEADER_X_AUTH]', this.headers);
        return responseJSON;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json());
  }

}

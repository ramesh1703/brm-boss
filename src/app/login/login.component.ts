import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';

import { AppConstant } from '../app-constant';
import { StorageService } from '../storage/storage.service';

import { LoginService } from './service/login.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  login: any;
  loading:boolean;
  error:string;
  status:string;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _storageService: StorageService,
  ) { }

  ngOnInit() {
    this.login = { username: '', password: '' };
    this.loading = false;
    this.error = '';
  }

  authenticate(): void {
    this.loading = true;
    this.error = '';
    this._loginService.authenticate(this.login).then(response => {
      this.loading = false;
      this._storageService.create(AppConstant.HEADER_X_AUTH, response['token']);
      let roles:Array<any> = response['data']['roles'];
      roles.forEach(function(role) {
        //this._storageService.create(role.code, role.code);
      });
      this._router.navigate(['dashboard']);
    }).catch(error => {
      this.loading = false;
      this.error = error.message;
      console.log('error.status', error.status);
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
      console.log('error', error);
    });
  }

}

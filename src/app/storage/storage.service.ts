import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  create(name, data) {
    if (name) {
      localStorage.setItem(name, JSON.stringify(data));
    }
  }

  get(name) {
    let data: any = localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return undefined;
    }
  }

  delete(name) {
    localStorage.removeItem(name);
  }

  clear() {
    localStorage.clear();
  }

 /* createSessionStorage(name, data) {
    if (name) {
      sessionStorage[name] = data;
    }
  }

  getSessionStorage(name) {
    if (name) {
      let data: any = sessionStorage[name];
      if (data) {
        return JSON.parse(data);
      } else {
        return undefined;
      }
    }
  } */

}

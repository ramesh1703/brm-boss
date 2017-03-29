import { BaseRequestOptions, Headers } from '@angular/http';

export class CustomRequestOptions extends BaseRequestOptions {
    header: Headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Auth': 'Bearer ' + localStorage.getItem('X-Auth')
    });
}

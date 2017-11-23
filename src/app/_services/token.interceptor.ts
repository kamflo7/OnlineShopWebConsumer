import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if(request.url.startsWith('http://localhost:8080/orders') || request.url.startsWith('http://localhost:8080/am-i-admin')) {
        if (request.url.startsWith('http://localhost:8080/')) {
            let token = localStorage.getItem('token');

            if (token != null) {
                request = request.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            }
        }

        return next.handle(request);
    }

}
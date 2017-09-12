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
        
        // console.log("TokenInterceptor::intercept: " + request.url);

        // if(request.url.startsWith('http://localhost:8080')) {
        //     console.log('[TokenInterceptor::intercept] Url starts with localhost:8080, so adding appropriate headers');
        //     request = request.clone({
        //         setHeaders: {
        //             TestHeader: 'hehe'
        //         }
        //     });
        // }

        return next.handle(request);
    }

}
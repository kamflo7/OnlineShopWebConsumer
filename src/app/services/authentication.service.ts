import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions, Response, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../model/user';

export interface AuthResponse {
    status: string;
    description: string;
}

@Injectable()
export class AuthenticationService {

    constructor(private http:HttpClient) {}

    isUserAuthenticated():boolean {
        var jwt:JwtHelper = new JwtHelper();
		var token = localStorage.getItem("token");

        if(token == null)
            return false;

        return !jwt.isTokenExpired(token);
    }

    getUser():User {
        let user:User = new User();
        user.email = localStorage.getItem('sub'); 
        return user;
    }

    register(email:string, password:string):Promise<AuthResponse> {
        return new Promise(resolve => {

            // returns values by json "status": ["success", "user already exists"]
            this.http.post<AuthResponse>('http://localhost:8080/register?email='+email+'&password='+password, null,
            { observe: 'response' })
            .subscribe(r => {
                var status:string = r.body.status;

                if(status === 'success') {
                    var token:string = r.headers.get('Token');

                    console.log('Register status: ' + status);
                    console.log('Token: ' + token);
                    
                    this.setupReceivedToken(token);
                }
                resolve(r.body);
            });

        });
    }

    login(email:string, password:string):Promise<AuthResponse> {
        return new Promise(resolve => {
            this.http.post<AuthResponse>('http://localhost:8080/login?email='+email+'&password='+password, null,
                { observe: 'response' })
                .subscribe(r => {
                    let status:string = r.body.status;

                    if(status === 'success') {
                        var token:string = r.headers.get('Token');
                        this.setupReceivedToken(token);
                    }

                    resolve(r.body);
                });
        });
    }

    setupReceivedToken(token:string) {
        var jwt:JwtHelper = new JwtHelper();
        var decodedToken = jwt.decodeToken(token);
        console.log(decodedToken);

        localStorage.setItem("sub", decodedToken.sub);
        localStorage.setItem("exp", decodedToken.exp);
        localStorage.setItem("iss", decodedToken.iss);
        localStorage.setItem("token", token);
    }

    logout() {
        localStorage.clear();
    }
}
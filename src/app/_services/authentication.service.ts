import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions, Response, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../_model/user';
import { Globals } from '../globals';

export interface AuthResponse {
    status: string;
    description: string;
}

@Injectable()
export class AuthenticationService {

    constructor(private http:HttpClient, private globals:Globals) {}

    getToken() {
        return localStorage.getItem("token");
    }

    isUserAuthenticated():boolean {
        var jwt:JwtHelper = new JwtHelper();
		var token = localStorage.getItem("token");

        if(token == null)
            return false;

        return !jwt.isTokenExpired(token);
    }

    isUserAuthenticatedAdmin():boolean {
        return this.isUserAuthenticated() && localStorage.getItem("admin") == 'true';
    }

    getUser():User {
        let user:User = new User();
        user.email = localStorage.getItem('sub');
        user.id = localStorage.getItem('jti');
        return user;
    }

    register(email:string, password:string):Promise<AuthResponse> {
        return new Promise(resolve => {

            // returns values by json "status": ["success", "user already exists"]
            this.http.post<AuthResponse>(this.globals.backendUrl+'register?email='+email+'&password='+password, null,
            { observe: 'response' })
            .subscribe(r => {
                var status:string = r.body.status;

                if(status === 'success') {
                    var token:string = r.headers.get('Token');

                    // console.log('Register status: ' + status);
                    // console.log('Token: ' + token);
                    
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
        // console.log("decoded token");
        // console.log(decodedToken);

        localStorage.setItem("sub", decodedToken.sub);
        localStorage.setItem("jti", decodedToken.jti);
        localStorage.setItem("exp", decodedToken.exp);
        localStorage.setItem("iss", decodedToken.iss);
        localStorage.setItem("admin", decodedToken.admin);
        localStorage.setItem("token", token);
    }

    logout() {
        localStorage.clear();
    }
}
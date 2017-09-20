import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import { Category } from '../model/category';
import { Globals } from '../globals';
import { getTestBed } from '@angular/core/testing';

export interface CategoriesResponse {
    categories:Category[];
}

@Injectable()
export class ProductService {

    constructor(private http:HttpClient, private globals:Globals) {}

    getCategories():Promise<Array<Category>> {
        return new Promise(resolve => {
            this.http.get<CategoriesResponse>(this.globals.backendUrl+'categories',
                {observe: 'response'}).subscribe(r => {
                //console.log(JSON.stringify(r.body.categories));
                resolve(r.body.categories);
            });
        });
    }
}
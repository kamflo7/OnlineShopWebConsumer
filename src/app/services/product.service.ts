import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import { CategoryLogic } from '../model/category-logic';
import { Globals } from '../globals';
// import { getTestBed } from '@angular/core/testing';
import { ResponseDetails } from '../model/response-details';
import { Product } from '../model/product';

export interface CategoriesResponse {
    categories:CategoryLogic[];
}

@Injectable()
export class ProductService {

    constructor(private http:HttpClient, private globals:Globals) {}

    getCategories():Promise<Array<CategoryLogic>> {
        return new Promise(resolve => {
            this.http.get<CategoriesResponse>(this.globals.backendUrl+'categories',
                {observe: 'response'}).subscribe(r => {
                //console.log(JSON.stringify(r.body.categories));
                resolve(r.body.categories);
            });
        });
    }

    getCategory(id:number):Promise<ResponseDetails<CategoryLogic>> {
        return new Promise(resolve => {
            this.http.get<ResponseDetails<CategoryLogic>>(this.globals.backendUrl+'categories/'+id,
            {observe: 'response'}).subscribe(r => {
                resolve(r.body);
            });
        });
    }

    getProduct(productid:number):Promise<ResponseDetails<Product>> {
        return new Promise(resolve => {
        this.http.get<ResponseDetails<Product>>(this.globals.backendUrl+'products/'+productid, 
            {observe: 'response'}).subscribe(r => {
                // console.log("DEBUG getProduct() -> ");
                // console.log(JSON.stringify(r.body));
                resolve(r.body);
            });
        });
    }
}
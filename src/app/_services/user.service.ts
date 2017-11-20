import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Globals } from '../globals';
import { ResponseDetails } from '../_model/response-details';

@Injectable()
export class UserService {
    constructor(private http:HttpClient, private globals:Globals) {}

    createAddress(userid:number, dto, type):Promise<ResponseDetails<void>> {
        let urlType = type == 'personal' ? 'person' : 'company';

        return new Promise(resolve => {
            this.http.put<ResponseDetails<void>>(
                this.globals.backendUrl+'users/'+userid+"/addresses/"+urlType,
                dto, {observe: 'response'}
            ).subscribe(r => {
                resolve(r.body);
                // console.log('[UserService::createAddress] ' + JSON.stringify(r.body)); 
            });
        });
    }

    getAddresses(userid):Promise<ResponseDetails<Array<any>>> {
        return new Promise(resolve => {
            this.http.get<ResponseDetails<Array<any>>>(this.globals.backendUrl+'users/'+userid+'/addresses',
            {observe: 'response'}).subscribe(r => {
                resolve(r.body);
                 console.log('[UserService::getAddresses] ' + JSON.stringify(r.body)); 
            });
        });
        // return null;
    }

    // getCategoryViews():Promise<ResponseDetails<Array<CategoryView>>> {
    //     return new Promise(resolve => {
    //         this.http.get<ResponseDetails<Array<CategoryView>>>(this.globals.backendUrl+'navigations',
    //         {observe: 'response'}).subscribe(r => {
    //             if(this.printDebugLog) console.log(r.body);
    //             resolve(r.body);
    //         });
    //     });
    // }
}
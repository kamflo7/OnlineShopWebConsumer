import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    backendUrl:string = 'http://localhost:8080/';
    resourceImgsUrl:string = this.backendUrl+"resources/imgs/";
    shopNameWithDomain:string = "OnlineShop.xyz";
}
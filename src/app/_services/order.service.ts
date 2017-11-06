import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable()
export class OrderService {

    constructor(private http:HttpClient, private globals:Globals) {}

    getBasketTotalValue():number {
        let totalValue:string = localStorage.getItem("total_value");

        if(totalValue == null)
            return Number(0);

        let convertedValue:number = Number(totalValue);
        return convertedValue;
    }

}
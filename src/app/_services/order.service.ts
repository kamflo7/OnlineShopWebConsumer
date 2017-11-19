import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';
import { ItemOrder } from '../_dto/item-order';

@Injectable()
export class OrderService {

    @Output()
    change: EventEmitter<boolean> = new EventEmitter();

    constructor(private http: HttpClient, private globals: Globals) { }


    getBasketTotalValue(): number {
        let totalValue: string = localStorage.getItem("total_cost");

        if (totalValue == null)
            return Number(0);

        let convertedValue: number = Number(totalValue);
        return convertedValue;
    }

    getItemsOrderAmount(): number {
        let str = localStorage.getItem("order");
        let amount = 0;

        if (str != null) {
            let orders: ItemOrder[] = JSON.parse(str);
            amount = orders.length;
        }
        return amount;
    }

    addItemOrderToLocalStorage(productid: number, amount: number, price: number): void {
        let str = localStorage.getItem("order");

        if (str != null) {
            let orders: ItemOrder[] = JSON.parse(str);
            let found: boolean = false;
            let totalCost: number = 0;

            for (let i = 0; i < orders.length; i++) {
                if (orders[i].productid == productid) {
                    orders[i].amount = amount;
                    localStorage.setItem("order", JSON.stringify(orders));
                    found = true;
                }
                totalCost += orders[i].price * orders[i].amount;
            }

            // if not found, create new
            if (!found) {
                totalCost += price * amount;
                orders.push(new ItemOrder(productid, amount, price));
                localStorage.setItem("order", JSON.stringify(orders));
            }

            localStorage.setItem("total_cost", totalCost + "");
        } else {
            let array: ItemOrder[] = [];
            array.push(new ItemOrder(productid, amount, price));
            localStorage.setItem("order", JSON.stringify(array));
            localStorage.setItem("total_cost", (price * amount) + "");
        }

        this.change.emit(true);
    }

    getItemsOrderFromLocalStorage(): ItemOrder[] {
        let str = localStorage.getItem("order");
        if (str != null) {
            let orders: ItemOrder[] = JSON.parse(str);
            return orders;
        }

        return new Array<ItemOrder>();
    }

    editItemOrderInLocalStorage(productid: number, amount: number): void {
        let str = localStorage.getItem("order");

        if (str != null) {
            let orders: ItemOrder[] = JSON.parse(str);
            let totalCost: number = 0;

            for (let i = 0; i < orders.length; i++) {
                if (orders[i].productid == productid) {
                    orders[i].amount = amount;
                    localStorage.setItem("order", JSON.stringify(orders));
                }

                totalCost += orders[i].price * orders[i].amount;
            }
            localStorage.setItem("total_cost", totalCost + "");
        }
        this.change.emit(true);
    }

    removeItemOrderFromLocalStorage(productid: number): void {
        let str = localStorage.getItem("order");

        if (str != null) {
            let orders: ItemOrder[] = JSON.parse(str);
            let newOrders: ItemOrder[] = [];

            for (let i = 0; i < orders.length; i++)
                if (orders[i].productid != productid)
                    newOrders.push(orders[i]);

            localStorage.setItem("order", JSON.stringify(newOrders));
        }
        this.recalculateTotalPrice();
        this.change.emit(true);
    }

    recalculateTotalPrice() {
        let str = localStorage.getItem("order");
        let totalPrice:number = 0;

        if (str != null) {
            let orders: ItemOrder[] = JSON.parse(str);
            
            for (let i = 0; i < orders.length; i++)
                totalPrice += orders[i].price;
        }

        localStorage.setItem("total_cost", totalPrice+"");
    }

    removeAllItems() {
        localStorage.clear();
        this.change.emit(true);
    }


    setDeliveryMethod(method) {
        localStorage.setItem("delivery_method", method);
    }

    getDeliveryMethod() {
        let r = localStorage.getItem("delivery_method");
        return r;
    }

    setPaymentMethod(method) {
        localStorage.setItem("payment_method", method);
    }

    getPaymentMethod() {
        return localStorage.getItem("payment_method");
    }
}
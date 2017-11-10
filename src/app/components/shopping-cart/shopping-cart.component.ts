import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../_model/user';
import { CategoryLogic } from '../../_model/category-logic';
import { ProductService } from '../../_services/product.service';
import { CategoryView, HashNumberOfGroup } from '../../_model/category-view';
import { NavigationConverter } from '../../_services/navigation-converter.service';
import { OrderService } from '../../_services/order.service';
import { ItemOrder } from '../../_dto/item-order';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Globals } from '../../globals';
import { Product } from '../../_model/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private auth: AuthenticationService,
    private router: Router,
    private productService: ProductService,
    private navigationConverter: NavigationConverter,
    private orderService: OrderService,
    private globals:Globals) {
  
  }

  products = [];
  totalPrice:number;
  dateDummy = Date.now() + 1 * 24 * 60 * 60 * 1000;
  deliveryMethod:string; // courier, personal

  radioCourier;
  radioPersonal;
  radioCourierDaily;
  radioCourierSaturday;

  deliveryMethodStr = "";
  deliveryCost:number = 0;
  paymentMethodStr = "";
  paymentCost:number = 0;

  totalCost:number = 0;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    let itemOrders:ItemOrder[] = this.orderService.getItemsOrderFromLocalStorage();
    this.products = [];
    for(let i=0; i<itemOrders.length; i++) {
      this.productService.getProduct(itemOrders[i].productid).then(r => {
        if(r.status == 'success') {
          // console.log("Saving obtained data for idx " + i + "; data.name: " + JSON.stringify(r.data.name) + "idx product id=" + itemOrders[i].productid + ", obtained id="+r.data.id);
          this.products.push({
            itemOrder: itemOrders[i],
            data: r.data,
            url: this.generateURL(r.data)
          });
        }
      });
    }
    this.getTotalPrice();
    this.updateTotalCost();
  }

  getTotalPrice() {
    this.totalPrice = this.orderService.getBasketTotalValue();
  }

  generateURL(product:Product) {
    return "/product/" + product.name.replace(/ /g, "-") + "-" + product.id;
  }

  amountChange(product, event) {
    product.itemOrder.amount = event;
    this.orderService.editItemOrderInLocalStorage(product.data.id, event);
    this.getTotalPrice();
    this.updateTotalCost();
  }

  removeBasket() {
    this.orderService.removeAllItems();
    this.loadProducts();
    this.getTotalPrice();
  }

  removeSingleItem(product) {
    this.orderService.removeItemOrderFromLocalStorage(product.itemOrder.productid);
    this.loadProducts();
  }

  // crap approach, but everything is a mock to simulate some delivery&payment options
  deliveryMethodChange(method:string) {
    if(method == 'courier') {
      this.radioPersonal = false;
      this.deliveryMethodStr = "Courier";
      this.deliveryCost = 19.00;
      this.radioCourierDaily = true;
      this.radioCourierSaturday = false;
    } else {
      this.deliveryMethodStr = "Personal";
      this.radioCourier = false;
      this.radioCourierDaily = false;
      this.radioCourierSaturday = false;
      this.deliveryCost = 0.00;
    }
    this.updateTotalCost();
  }

  deliveryCourierTimeChange(time:string) {
    this.radioCourier = true;
    this.radioPersonal = false;
    this.deliveryMethodStr = "Courier";
    this.deliveryCost = 19.00;

    if(time == 'daily') {
      this.radioCourierDaily = true;
      this.radioCourierSaturday = false;
    } else {
      this.radioCourierDaily = false;
      this.radioCourierSaturday = true;
    }
  }

  paymentMethodChange(value) {
    this.paymentMethodStr = value;

    if(value == 'Instant transfer') {
      this.paymentCost = 300.00;
    } else {
      this.paymentCost = 0.00;
    }
    this.updateTotalCost();
  }

  updateTotalCost() {
    this.totalCost = this.paymentCost + this.deliveryCost + this.totalPrice;
  }
}

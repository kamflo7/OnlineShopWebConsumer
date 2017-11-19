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
import { UserService } from '../../_services/user.service';

@Component({
    selector: 'app-shopping-cart-confirmation',
    templateUrl: './shopping-cart-confirmation.component.html',
    styleUrls: ['./shopping-cart-confirmation.component.css']
  })
  export class ShoppingCartConfirmationComponent implements OnInit {
  
    constructor(private auth: AuthenticationService,
      private router: Router,
      private productService: ProductService,
      private navigationConverter: NavigationConverter,
      private orderService: OrderService,
      private userService: UserService,
      private globals:Globals) {
    
    }

    deliveryMethod = "";
    paymentForm = "";

    logged = false;
    loggedUser = null;

    address = {};
    products = [];
    totalPrice;
    totalCost;
    paymentCost;
    deliveryCost;

    ngOnInit() {
      // lack of logic, mocking
      let delivery = this.orderService.getDeliveryMethod();
      if(delivery == 'courier_daily' || delivery == 'courier_saturday') this.deliveryMethod = 'Courier';
      else if(delivery == 'personal') this.deliveryMethod = 'Personal';

      this.paymentForm = this.orderService.getPaymentMethod();
      this.getAddress();
      this.loadProducts();
    }

    getAddress() {
      if(this.auth.isUserAuthenticated()) {
        this.logged = true;

        this.loggedUser = this.auth.getUser();
        this.userService.getAddresses(this.loggedUser.id).then(r => {
          if(r.status == 'success') {
            console.log("address obatined");
            this.address = r.data[0];
            this.address['type'] = this.address['nip'] != null ? 'company' : 'personal';
            if(this.address['type'] == 'company') {
              this.address['names'] = '';
              this.address['names'] += this.address['name'] != null ? this.address['name'] : '';
              this.address['names'] += this.address['name2'] != null ? '<br>'+this.address['name2'] : '';
              this.address['names'] += this.address['name3'] != null ? '<br>'+this.address['name3'] : '';
            }
          }
        });
      }
    }

    loadProducts() {
      let itemOrders:ItemOrder[] = this.orderService.getItemsOrderFromLocalStorage();
      this.products = [];
      for(let i=0; i<itemOrders.length; i++) {
        this.productService.getProduct(itemOrders[i].productid).then(r => {
          if(r.status == 'success') {
            this.products.push({
              itemOrder: itemOrders[i],
              data: r.data,
              url: this.generateURL(r.data)
            });
          }
        });
      }

      // mocking.. don't have time to make logic for this, just learning project to get general concept of Spring app
      if(this.orderService.getDeliveryMethod() == 'courier_daily' || this.orderService.getDeliveryMethod() == 'courier_saturday') {
        this.paymentCost = 19;
      } else {
        this.paymentCost = 0;
      }

      this.deliveryCost = 0;

      this.getTotalPrice();
      this.updateTotalCost();
    }

    updateTotalCost() {
      this.totalCost = this.paymentCost + this.deliveryCost + this.totalPrice;
    }

    getTotalPrice() {
      this.totalPrice = this.orderService.getBasketTotalValue();
    }
  
    generateURL(product:Product) {
      return "/product/" + product.name.replace(/ /g, "-") + "-" + product.id;
    }

    order() {
      
    }
}
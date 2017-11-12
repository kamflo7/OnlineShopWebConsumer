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
      private globals:Globals) {
    
    }

    ngOnInit() {

    }
}
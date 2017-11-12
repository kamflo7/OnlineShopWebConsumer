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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthenticationService,
    private router: Router,
    private productService: ProductService,
    private navigationConverter: NavigationConverter,
    private orderService: OrderService) {

  }


  authenticated: boolean;
  user: User;
  categories = [];
  basketValue: number;
  orderItemAmount: number;

  ngOnInit() {
    this.productService.getCategoryViews().then(r => {
      if (r.status == 'success') {
        this.categories = this.navigationConverter.convertForNavigationTemplate(r.data);
        // console.log(this.categories);
      }
    });

    this.orderService.change.subscribe(r => {
      this.refreshShoppingCart();
    });

    this.authenticated = this.auth.isUserAuthenticated();
    if (this.authenticated)
      this.user = this.auth.getUser();



    this.refreshShoppingCart();
  }

  refreshShoppingCart() {
    this.basketValue = this.orderService.getBasketTotalValue();
    this.orderItemAmount = this.orderService.getItemsOrderAmount();
  }

}

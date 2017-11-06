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
    // this.authenticated = auth.isUserAuthenticated();
    // if(this.authenticated)
    //   this.user = auth.getUser();
      
  }


  authenticated: boolean;
  user: User;
  categories = [];
  basketValue:number;
  orderItemAmount:number;

  ngOnInit() {
    this.productService.getCategoryViews().then(r => {
      if (r.status == 'success') {
        this.categories = this.navigationConverter.convertForNavigationTemplate(r.data);
        // console.log(this.categories);
      }
    });

    // this.orderService.addItemOrderToLocalStorage(5, 1);
    // this.orderService.addItemOrderToLocalStorage(5, 1, 349);
    // this.orderService.addItemOrderToLocalStorage(8, 1, 31);

    // let items:ItemOrder[] = this.orderService.getItemsOrderFromLocalStorage();
    // for(let i=0; i<items.length; i++) {
    //   console.log(items[i].productid + " : " + items[i].amount);
    // }


    this.basketValue = this.orderService.getBasketTotalValue();
    this.orderItemAmount = this.orderService.getItemsOrderAmount();
  }

}

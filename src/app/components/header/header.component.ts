import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../_model/user';
import { CategoryLogic } from '../../_model/category-logic';
import { ProductService } from '../../_services/product.service';
import { CategoryView, HashNumberOfGroup } from '../../_model/category-view';
import { NavigationConverter } from '../../_services/navigation-converter.service';
import { OrderService } from '../../_services/order.service';

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

  ngOnInit() {
    this.productService.getCategoryViews().then(r => {
      if (r.status == 'success') {
        this.categories = this.navigationConverter.convertForNavigationTemplate(r.data);
        // console.log(this.categories);
      }
    });

    this.basketValue = this.orderService.getBasketTotalValue();
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryLogic } from '../../model/category-logic';
import { ResponseDetails } from '../../model/response-details';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private auth:AuthenticationService,
    private router:Router,
    private productService:ProductService
  ) {

    this.authenticated = auth.isUserAuthenticated();
    if(this.authenticated)
      this.user = auth.getUser();
  }

  authenticated:boolean;
  user:User;
  product:Product;


  ngOnInit(): void {
    document.title = "Produkt";
    this.productService.getProduct(4).then(r => {
        console.log(r);
        if(r.status == 'success')
          this.product = r.data;
    })
  }
}
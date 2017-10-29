import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_model/user';
import { Router } from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { CategoryLogic } from '../../_model/category-logic';
import { ResponseDetails } from '../../_model/response-details';
import { Product } from '../../_model/product';
import { Globals } from '../../globals';

@Component({
  selector: 'item-list-product',
  templateUrl: 'item-list-product.component.html'
//   styleUrls: ['item-list-product.component.css']
})
export class ItemListProductComponent implements OnInit {

  constructor(private auth:AuthenticationService,
    private router:Router,
    private productService:ProductService,
    private globals:Globals
  ) {
  }

  @Input() product:Product;
  imgSrc:string;


  ngOnInit(): void {
    if(this.product.image != null) {
        this.imgSrc = this.globals.resourceImgsUrl + this.product.image.name;
    }
  }
}
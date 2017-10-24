import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../_model/user';
import { CategoryLogic } from '../../_model/category-logic';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthenticationService,
        private router:Router,
        private productService:ProductService) {
    this.authenticated = auth.isUserAuthenticated();
    if(this.authenticated)
      this.user = auth.getUser();

    productService.getCategories().then(r => {
      this.categories = r;
    });
  }


  authenticated:boolean;
  user:User;
  categories:CategoryLogic[];
  selectedBaseCategory:CategoryLogic = null;

  categoriesFirstLvl():CategoryLogic[] {
    // return this.categories.filter(c => c.parent_id == -1);
    return null;
  }

  categoriesForId(id:number):CategoryLogic[] {
    // return this.categories.filter(c => c.parent_id == id);
    return null;
  }

  ngOnInit() {
  }

  doSearch():void {
    console.log("Dziala headerComponent>Form");
  }

  navCategoryHover(category:CategoryLogic):void {
    console.log("elo: " + category.name);
    this.selectedBaseCategory = category;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { Category } from '../../model/category';
import { ProductService } from '../../services/product.service';

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
  categories:Category[];

  categoriesFirstLvl():Category[] {
    return this.categories.filter(c => c.parent_id == -1);
  }

  ngOnInit() {
  }

  doSearch():void {
    console.log("Dziala headerComponent>Form");
  }
}

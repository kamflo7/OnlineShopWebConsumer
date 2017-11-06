import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_model/user';
import { Router } from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { CategoryLogic } from '../../_model/category-logic';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

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

  ngOnInit(): void {
    document.title = "Strona główna";
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
    window.location.reload();
  }
}
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
  })
export class HomeComponent implements OnInit {

  constructor(private auth:AuthenticationService, private router:Router) {
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
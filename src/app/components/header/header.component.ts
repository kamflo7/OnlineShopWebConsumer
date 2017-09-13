import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthenticationService, private router:Router) {
    this.authenticated = auth.isUserAuthenticated();
    if(this.authenticated)
      this.user = auth.getUser();
  }

  authenticated:boolean;
  user:User;

  ngOnInit() {
  }

  doSearch():void {
    console.log("Dziala headerComponent>Form");
  }
}

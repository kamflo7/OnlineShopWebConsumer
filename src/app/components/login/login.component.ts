import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
  })
export class LoginComponent implements OnInit {
	ngOnInit(): void {

	}

	constructor(private auth:AuthenticationService, private router:Router) {
		if(auth.isUserAuthenticated())
			router.navigateByUrl('/');
	}

	login:any = {};
	register:any = {};

	doRegister() {
		this.auth.register(this.register.email, this.register.password).then(r => {
			if(r.status === 'success') { // register successfull
				 this.router.navigateByUrl('/');
			} else {
				alert("Registration failed, not implemented to correctly tell you about that");
				console.log('[Registration failed] ' + JSON.stringify(r));
			}
		});
	}

	doLogin() {
		this.auth.login(this.login.email, this.login.password).then(r => {
			if(r.status === 'success') { // register successfull
				 this.router.navigateByUrl('/');
			} else {
				alert("Login failed, not implemented to correctly tell you about that");
				console.log('[Login failed] ' + JSON.stringify(r));
			}
		});
	}
}
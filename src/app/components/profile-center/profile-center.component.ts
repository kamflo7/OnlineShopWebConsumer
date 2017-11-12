import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-profile-center',
    templateUrl: 'profile-center.component.html'
  })
export class ProfileCenterComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router
  ) {
    router.events.filter(e => e instanceof NavigationEnd).subscribe(e => {
      this.childUrl = this.getFirstLevelChildRoute();
    });
  }

  childUrl = "";

  ngOnInit() {
  }

  getFirstLevelChildRoute() {
    const root = 'profile';
    let nodes = this.router.url.split('/');

    for(let i=0; i<nodes.length; i++) {
      if(nodes[i] == root) {
        if(i+1 < nodes.length) {
          return nodes[i+1];
        } else {
          return "";
        }
      }
    }
    return "";
  }
}
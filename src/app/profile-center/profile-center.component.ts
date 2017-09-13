import { Component } from '@angular/core';


@Component({
    template: `
    <app-header></app-header>
    <span>SPECIAL PAGE:</span>
    <router-outlet></router-outlet>
    `
  })
export class ProfileCenterComponent {

}
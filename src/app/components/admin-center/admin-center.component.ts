import { Component } from '@angular/core';


@Component({
    template: `
    <div style="text-align: center; width: 100%; height: 70px; background-color: orange"><h3 style="margin-top:0;">Admin Center</h3></div>
    <router-outlet></router-outlet>
    `
  })
export class AdminCenterComponent {

}
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../_model/order';
import { OrderService } from '../../../_services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-order-details',
  templateUrl: './profile-order-details.component.html',
  styleUrls: ['./profile-order-details.component.css']
})
export class ProfileOrderDetailsComponent implements OnInit {

  constructor(private orderService:OrderService,
    private route:ActivatedRoute) { }

  urlOrderID;
  order:Order;
  productFormatedNameForURL = [];


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.urlOrderID = params.id;
      this.orderService.getOrder(this.urlOrderID).then(r => {
        if(r.status == 'success') {
          this.order = r.data;
          
          for(let i=0; i<r.data.orderProducts.length; i++) {
            this.productFormatedNameForURL.push(r.data.orderProducts[i].product.name.replace(/ /g, "-"));
          }
          console.log(this.productFormatedNameForURL);
          // console.log(r.data);
        } else {
          alert("There was a problem with connection to our servers, please try again later.");
        }
      });
    });
  }



}

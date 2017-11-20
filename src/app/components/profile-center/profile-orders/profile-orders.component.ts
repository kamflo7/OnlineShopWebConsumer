import { Component, OnInit } from '@angular/core';
import { Order } from '../../../_model/order';
import { OrderService } from '../../../_services/order.service';

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.css']
})
export class ProfileOrdersComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  orders:Array<Order> = [];
  sumValue = [];

  ngOnInit() {
    this.orderService.getOrders().then(r => {
      if(r.status == 'success') {
        this.orders = r.data;
        this.calculateSumForOrders();
      } else {
        alert("There was a problem with connection to our servers, please try again later.");
      }
    });
  }

  calculateSumForOrders() {
    for(let i=0; i<this.orders.length; i++) {
      let sum = 0;
      for(let j=0; j<this.orders[i].orderProducts.length; j++) {
        sum += Number(this.orders[i].orderProducts[j].price);
      }
      this.sumValue.push(sum);
    }
  }

}

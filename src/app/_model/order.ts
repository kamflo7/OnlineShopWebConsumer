import { OrderProduct } from './order-products';
import { User } from './user';

export class Order {
    id:number;
    date:number;
    user:User;
    orderProducts:Array<OrderProduct>;
    userAddress:any;
    deliveryMethod:string;
    paymentMethod:string;
}
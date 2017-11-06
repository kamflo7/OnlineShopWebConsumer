export class ItemOrder {
    productid:number;
    amount:number;
    price:number;

    constructor(productid:number, amount:number, price:number) {
        this.productid = productid;
        this.amount = amount;
        this.price = price;
    }

    toString() {
        return "ItemOrder[productid="+this.productid+", amount="+this.amount+"]";
    }
}
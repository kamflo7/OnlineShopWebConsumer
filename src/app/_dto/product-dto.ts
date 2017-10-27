// private String name, description;
// private BigDecimal price;
// private Integer amount;

// private Map<Long, List<Long>> features;

export class ProductDTO {
    name:string;
    description:string;
    price:string;
    amount:number;

    features:HashNumberOfListNumbers;
}

export interface HashNumberOfListNumbers {
    [details: number] : number[];
}
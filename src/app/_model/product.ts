import { FeatureBag } from './feature-bag';
import { CategoryLogic } from './category-logic';

export class Product {
    name:string;
    price:string;
    amount:number;
    description:string;
    featureBags:FeatureBag[];
    categoryLogic:CategoryLogic;

    image:any;
}
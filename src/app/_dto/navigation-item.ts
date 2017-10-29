import { CategoryLogic } from '../_model/category-logic';

export class NavigationItem {
    id:number;
    name: string;
    categoryLogic:CategoryLogic;
    // filters: HashNumberOfGroup;
    // filters: Map<number, any>;
    children:NavigationItem[];
    lastLevel:boolean;
    parentid:number;
    level:number;
    url:string;
    // filterParams:string;
}
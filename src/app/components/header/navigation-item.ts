import { CategoryLogic } from '../../_model/category-logic';
import { HashNumberOfGroup } from '../../_model/category-view';

export class NavigationItem {
    id:number;
    name: string;
    categoryLogic:CategoryLogic;
    // filters: HashNumberOfGroup;
    // filters: Map<number, any>;
    children:NavigationItem[];
    lastLevel:boolean;
    parentid:number;
    // filterParams:string;
}
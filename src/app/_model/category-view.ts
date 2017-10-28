import { CategoryLogic } from './category-logic';
export class CategoryView {
    id:number;
    name:string;
    parent:CategoryView;
    categoryLogic:CategoryLogic;
    // filters:HashNumberOfGroup;
    filters:Map<number, any>;
}

export interface HashNumberOfGroup {
    [details: number] : any; // Map<FeatureDefinition, FeatureValueGroup>
}


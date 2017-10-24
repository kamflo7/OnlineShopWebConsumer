import { FeatureDefinition } from './feature-definition';
import { FeatureGroup } from './feature-group';

export class CategoryLogic {
    id:number;
    name:string;
    featureDefinitions:FeatureDefinition[] = [];
    featureGroups:FeatureGroup[] = [];

}
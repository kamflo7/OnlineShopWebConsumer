import { FeatureValue } from './feature-value';
import { FeatureGroup } from './feature-group';

export class FeatureDefinition {
    id:number;
    multipleValues:boolean;
    name:string;
    filterable:boolean;
    visible:boolean;

    featureGroup:FeatureGroup;
    featureValueDefinitions:FeatureValue[];
}
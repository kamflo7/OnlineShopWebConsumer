import { FeatureValue } from './feature-value';

export class FeatureDefinition {
    id:number;
    multipleValues:boolean;
    name:string;
    filterable:boolean;
    visible:boolean;

    featureValueDefinitions:FeatureValue[];
}
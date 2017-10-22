import { FeatureDefinition } from '../model/feature-definition';
import { FeatureValueDTO } from './feature-value-dto';

export class FeatureBagDTO {
    featureDefinition:FeatureDefinition;
    featureValuesDTO:FeatureValueDTO[];
}
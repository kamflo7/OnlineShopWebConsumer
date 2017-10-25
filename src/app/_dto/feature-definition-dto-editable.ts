export interface HashNumberString {
    [details: number] : string;
}

export class FeatureDefinitionDTOEditable {
    name:string;
    multipleValues:boolean;
    filterable:boolean;
    visible:boolean;


    values:HashNumberString;
    newValues:string[];
}
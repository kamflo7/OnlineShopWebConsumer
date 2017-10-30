export interface HashNumberString {
    [details: number] : string;
}

export class FeatureDefinitionDTOEditable {
    name:string;
    multipleValues:boolean;
    filterable:boolean;
    visible:boolean;
    visibleInList:boolean;


    values:HashNumberString;
    newValues:string[];
}
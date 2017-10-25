import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import { CategoryLogic } from '../_model/category-logic';
import { Globals } from '../globals';
// import { getTestBed } from '@angular/core/testing';
import { ResponseDetails } from '../_model/response-details';
import { Product } from '../_model/product';
import { FeatureBagDTO } from '../_dto/feature-bag-dto';
import { FeatureDefinition } from '../_model/feature-definition';
import { FeatureBag } from '../_model/feature-bag';
import { FeatureValueDTO } from '../_dto/feature-value-dto';
import { FeatureDefinitionDTOEditable } from '../_dto/feature-definition-dto-editable';

export interface CategoriesResponse {
    categories:CategoryLogic[];
}

@Injectable()
export class ProductService {

    constructor(private http:HttpClient, private globals:Globals) {}
    printDebugLog:boolean = true;

// CATEGORIES
    getCategories():Promise<ResponseDetails<Array<CategoryLogic>>> {
        return new Promise(resolve => {
            this.http.get<ResponseDetails<Array<CategoryLogic>>>(this.globals.backendUrl+'categories',
                {observe: 'response'}).subscribe(r => {
                // console.log(JSON.stringify(r.body));
                resolve(r.body);
            });
        });
    }

    getCategory(id:number):Promise<ResponseDetails<CategoryLogic>> {
        return new Promise(resolve => {
            this.http.get<ResponseDetails<CategoryLogic>>(this.globals.backendUrl+'categories/'+id,
            {observe: 'response'}).subscribe(r => {
                resolve(r.body);
            });
        });
    }

    createCategory(name:string):Promise<ResponseDetails<CategoryLogic>> {
        return new Promise(resolve => {
            this.http.put<ResponseDetails<CategoryLogic>>(this.globals.backendUrl+'categories/?name='+name, null, 
                {observe: 'response'}).subscribe(r => {
                    resolve(r.body);
                });
        });
    }

    updateCategory(id:number, name:string):Promise<ResponseDetails<CategoryLogic>> {
        return new Promise(resolve => {
            this.http.post<ResponseDetails<CategoryLogic>>(this.globals.backendUrl+'categories/'+id+'/?name='+name, null,
                {observe: 'response'}).subscribe(r => {
                    resolve(r.body);
                    if(this.printDebugLog) console.log(r.body);
                });
        });
    }
// FEATURE GROUPS
    createFeatureGroup(categoryid:number, name:string):Promise<ResponseDetails<CategoryLogic>> {
        return new Promise(resolve => {
            this.http.put<ResponseDetails<CategoryLogic>>(this.globals.backendUrl+'categories/'+categoryid+'/feature_groups/?name='+name, null, 
                {observe: 'response'}).subscribe(r => {
                    resolve(r.body);
                });
        });
    }

    updateFeatureGroup(categoryid:number, groupid:number, name:string):Promise<ResponseDetails<CategoryLogic>> {
        return new Promise(resolve => {                     ///categories/{categoryID}/feature_groups/{groupID}
            this.http.post<ResponseDetails<CategoryLogic>>(this.globals.backendUrl+'categories/'+categoryid+'/feature_groups/'+groupid+'/?name='+name, null,
                {observe: 'response'}).subscribe(r => {
                    resolve(r.body);
                    if(this.printDebugLog) console.log(r.body);
                });
        });
    }
// FEATURE DEFINITIONS
    createFeatureDefinition(categoryid:number, groupid:number, dto:FeatureDefinitionDTOEditable):Promise<ResponseDetails<CategoryLogic>> {
        return new Promise(resolve => {
            this.http.put<ResponseDetails<CategoryLogic>>(this.globals.backendUrl+'categories/'+categoryid+'/feature_groups/'+groupid+'/feature_definitions',
            dto, {observe: 'response'}).subscribe(r => {
                resolve(r.body);
                if(this.printDebugLog) console.log(r.body);
            });
        });
    }

    updateFeatureDefinition(categoryid:number, groupid:number, featureDefID:number, dto:FeatureDefinitionDTOEditable):Promise<ResponseDetails<CategoryLogic>> {
        return new Promise(resolve => {
            this.http.post<ResponseDetails<CategoryLogic>>(this.globals.backendUrl+'categories/'+categoryid+'/feature_groups/'+groupid+'/feature_definitions/'+featureDefID,
            dto, {observe: 'response'}).subscribe(r => {
                resolve(r.body);
                if(this.printDebugLog) console.log(r.body);
            });
        });
    }

    

    getProduct(productid:number):Promise<ResponseDetails<Product>> {
        return new Promise(resolve => {
        this.http.get<ResponseDetails<Product>>(this.globals.backendUrl+'products/'+productid, 
            {observe: 'response'}).subscribe(r => {
                resolve(r.body);
            });
        });
    }


    mergeCategoryWholeFeatureValuesWithProductFeatureValues(categoryLogic:CategoryLogic, product:Product):FeatureBagDTO[] {
        var result:FeatureBagDTO[] = [];

        for(var i=0; i<categoryLogic.featureDefinitions.length; i++) {
            var loopFeatureDef:FeatureDefinition = categoryLogic.featureDefinitions[i];
            var eqFeatureBag:FeatureBag = product.featureBags.find(b => b.featureDefinition.id == loopFeatureDef.id);
            if(eqFeatureBag == null) console.log("ERROR NULL");

            var bagDTO:FeatureBagDTO = new FeatureBagDTO(); 
            bagDTO.featureDefinition = loopFeatureDef;
            bagDTO.featureValuesDTO = [];
            for(var j=0; j<loopFeatureDef.featureValueDefinitions.length; j++) {
                var value:FeatureValueDTO = <FeatureValueDTO>{}
                value.orgFeatureValue = loopFeatureDef.featureValueDefinitions[j];
                value.selected = eqFeatureBag.featureValues.find(fv => fv.id == value.orgFeatureValue.id) != null;
                bagDTO.featureValuesDTO.push(value);
            }
            result.push(bagDTO);

        }
        return result;
    }
}
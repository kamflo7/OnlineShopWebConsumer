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

export interface CategoriesResponse {
    categories:CategoryLogic[];
}

@Injectable()
export class ProductService {

    constructor(private http:HttpClient, private globals:Globals) {}

    getCategories():Promise<Array<CategoryLogic>> {
        return new Promise(resolve => {
            this.http.get<CategoriesResponse>(this.globals.backendUrl+'categories',
                {observe: 'response'}).subscribe(r => {
                //console.log(JSON.stringify(r.body.categories));
                resolve(r.body.categories);
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

    getProduct(productid:number):Promise<ResponseDetails<Product>> {
        return new Promise(resolve => {
        this.http.get<ResponseDetails<Product>>(this.globals.backendUrl+'products/'+productid, 
            {observe: 'response'}).subscribe(r => {
                resolve(r.body);
            });
        });
    }

    // getProductForEditing(id:number):FeatureBagDTO[] {
    //     var features:FeatureBagDTO[];

    //     this.getProduct(id).then(p => {
    //         if (p.status == 'success') {
    //             this.getCategory(p.data.categoryLogic.id).then(c => {
    //                 if(c.status == 'success') {
    //                     features = this.mergeCategoryWholeFeatureValuesWithProductFeatureValues(c.data, p.data);
    //                 } else {
    //                     return null;
    //                 }
    //             });
    //         } else {
    //             return null;
    //         }
    //     });
    //     return features;
    // }

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
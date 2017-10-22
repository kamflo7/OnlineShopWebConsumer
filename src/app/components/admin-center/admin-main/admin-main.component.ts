import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../model/product';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProductService } from '../../../services/product.service';
import { CategoryLogic } from '../../../model/category-logic';
import { FeatureValueDTO } from '../../../dto/feature-value-dto';
import { FeatureDefinition } from '../../../model/feature-definition';
import { FeatureBagDTO } from '../../../dto/feature-bag-dto';
import { FeatureBag } from '../../../model/feature-bag';

@Component({
    selector: 'app-admin-main',
    templateUrl: 'admin-main.component.html'
  })
export class AdminMainComponent implements OnInit {
    constructor(private auth:AuthenticationService,
        private router:Router,
        private route: ActivatedRoute,
        private productService:ProductService
      ) {
      }

	ngOnInit(): void {
        console.log("hello");
        this.route.params.subscribe((params) => {
            if(params.id != undefined) {
                this.productService.getProduct(params.id).then(r => {
                    console.log(r);
                    if (r.status == 'success') {
                        this.product = r.data;

                        this.productService.getCategory(1).then(c => {
                            console.log(c);
                            if(c.status == 'success') {
                                this.category = c.data;
                                this.featureBagsDTO = this.mergeValuesDefinitionsAndProductOwnedValues(this.category, this.product);
                            }
                        });
                    }
                });
            } else {
                // alert("No ale podaj ID ziom");
            }
        });
    }

    mergeValuesDefinitionsAndProductOwnedValues(categoryLogic:CategoryLogic, product:Product):FeatureBagDTO[] {
        var result:FeatureBagDTO[] = [];

        for(var i=0; i<categoryLogic.featureDefinitions.length; i++) {
            var loopFeatureDef:FeatureDefinition = categoryLogic.featureDefinitions[i];
            var eqFeatureBag:FeatureBag = product.featureBags.find(b => b.featureDefinition.id == loopFeatureDef.id);
            if(eqFeatureBag == null) console.log("ERROR NULL");

            var bagDTO:FeatureBagDTO = new FeatureBagDTO(); 
            bagDTO.featureDefinition = loopFeatureDef;
            bagDTO.featureValuesDTO = [];
            for(var j=0; j<loopFeatureDef.featureValueDefinitions.length; j++) {
                var value:FeatureValueDTO = new FeatureValueDTO();
                value.featureValue = loopFeatureDef.featureValueDefinitions[j];
                value.selected = eqFeatureBag.featureValues.find(fv => fv.id == value.featureValue.id) != null;
                bagDTO.featureValuesDTO.push(value);
            }
            result.push(bagDTO);

        }
        console.log(result);
        return result;
    }
    
    product:Product;
    category:CategoryLogic;
    featureBagsDTO:FeatureBagDTO[];
}
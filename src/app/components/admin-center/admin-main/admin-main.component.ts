import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../_model/product';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ProductService } from '../../../_services/product.service';
import { CategoryLogic } from '../../../_model/category-logic';
import { FeatureValueDTO } from '../../../_dto/feature-value-dto';
import { FeatureDefinition } from '../../../_model/feature-definition';
import { FeatureBagDTO } from '../../../_dto/feature-bag-dto';
import { FeatureBag } from '../../../_model/feature-bag';

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
        this.route.params.subscribe((params) => {
            if(params.id != undefined) {
                this.productService.getProduct(params.id).then(r => {
                    console.log("[admin-main.component] product:");
                    console.log(r);
                    if (r.status == 'success') {
                        this.product = r.data;

                        this.productService.getCategory(1).then(c => {
                            console.log("[admin-main.component] category:");
                            console.log(c);
                            if(c.status == 'success') {
                                this.category = c.data;
                                this.featureBagsDTO = this.productService.mergeCategoryWholeFeatureValuesWithProductFeatureValues(this.category, this.product);
                            }
                        });
                    }
                });
            } else {
                // alert("No ale podaj ID ziom");
            }
        });
    }

    product:Product;
    category:CategoryLogic;
    featureBagsDTO:FeatureBagDTO[];
}
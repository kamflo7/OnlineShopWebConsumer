import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_model/user';
import { Router } from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { CategoryLogic } from '../../_model/category-logic';
import { ResponseDetails } from '../../_model/response-details';
import { Product } from '../../_model/product';
import { Globals } from '../../globals';
import { FeatureDefinition } from '../../_model/feature-definition';
import { FeatureBag } from '../../_model/feature-bag';

@Component({
  selector: 'item-list-product',
  templateUrl: 'item-list-product.component.html'
//   styleUrls: ['item-list-product.component.css']
})
export class ItemListProductComponent implements OnInit {

  constructor(private auth:AuthenticationService,
    private router:Router,
    private productService:ProductService,
    private globals:Globals
  ) {
  }

  @Input() product:Product;
  @Input() categoryViewID:number;
  handyFeatures = [];
  imgSrc:string;
  url:string;

  ngOnInit(): void {
    if(this.product.image != null) {
        this.imgSrc = this.globals.resourceImgsUrl + this.product.image.name;
    }

    this.url = '/product/' + this.product.name.replace(/ /g, "-") + '-' + this.product.id + '_' + this.categoryViewID;

    for(let i=0; i<this.product.featureBags.length; i++) {
      let loopFeatureBag = this.product.featureBags[i];

      if(loopFeatureBag.featureDefinition.visibleInList) {
        let values = "";
        for(let j=0; j<loopFeatureBag.featureValues.length; j++)
          values += loopFeatureBag.featureValues[j].value + ", ";
        values = values.substr(0, values.length-1);

        this.handyFeatures.push({ name: loopFeatureBag.featureDefinition.name, values: values });
      }
    }
  }
}
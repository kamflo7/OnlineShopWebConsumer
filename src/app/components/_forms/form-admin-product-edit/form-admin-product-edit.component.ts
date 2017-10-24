import { Component, OnInit, Input } from '@angular/core';
import { FeatureBag } from '../../../_model/feature-bag';
import { Product } from '../../../_model/product';
import { FeatureBagDTO } from '../../../_dto/feature-bag-dto';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'form-admin-product-edit',
    templateUrl: 'form-admin-product-edit.component.html'
  })
export class FormAdminProductEdit implements OnInit {
	ngOnInit(): void {

    }
    
    @Input() product:Product;
    @Input() featureBagsDTO:FeatureBagDTO[];

    test():void {
        this.featureBagsDTO[2].featureValuesDTO[2].selected = true;
        this.featureBagsDTO[2].featureValuesDTO[3].selected = true;
        console.log("Poszla zmiana");
    }
}
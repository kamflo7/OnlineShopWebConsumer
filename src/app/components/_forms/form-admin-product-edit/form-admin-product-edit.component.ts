import { Component, OnInit, Input } from '@angular/core';
import { FeatureBag } from '../../../model/feature-bag';
import { Product } from '../../../model/product';
import { FeatureBagDTO } from '../../../dto/feature-bag-dto';

@Component({
    selector: 'form-admin-product-edit',
    templateUrl: 'form-admin-product-edit.component.html'
  })
export class FormAdminProductEdit implements OnInit {
	ngOnInit(): void {
    }
    
    @Input() product:Product;
    @Input() featureBagsDTO:FeatureBagDTO[];
}
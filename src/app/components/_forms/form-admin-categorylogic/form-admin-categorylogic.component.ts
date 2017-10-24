import { Component, OnInit, Input } from '@angular/core';
import { FeatureBag } from '../../../_model/feature-bag';
import { Product } from '../../../_model/product';
import { FeatureBagDTO } from '../../../_dto/feature-bag-dto';
import { NgForm } from '@angular/forms';
import { CategoryLogic } from '../../../_model/category-logic';
import { FeatureGroup } from '../../../_model/feature-group';
import { FeatureDefinition } from '../../../_model/feature-definition';

@Component({
    selector: 'form-admin-categorylogic',
    templateUrl: 'form-admin-categorylogic.component.html'
  })
export class FormAdminCategoryLogicComponent implements OnInit {
	ngOnInit(): void {


    }


}
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
    selector: 'app-admin-categories-create',
    templateUrl: 'admin-categories-create.component.html',
    styleUrls: ['admin-categories-create.component.css']
  })
export class AdminCategoriesCreateComponent implements OnInit {
    constructor(private auth:AuthenticationService,
        private router:Router,
        private route: ActivatedRoute,
        private productService:ProductService
      ) {
          
      }

	ngOnInit(): void {
       
    }

    category:CategoryLogic;
}
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ProductService } from '../../../_services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Observable } from 'rxjs/Observable';
import { CategoryLogic } from '../../../_model/category-logic';
import { DialogCreateCategoryComponent } from '../../_dialogs/dialog-create-category/dialog-create-category.component';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../../../_model/product';
import { ResponseDetails } from '../../../_model/response-details';

@Component({
    selector: 'app-admin-products',
    templateUrl: 'admin-products.component.html',
    styleUrls: ['admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
    constructor(private auth: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        public dialog: MatDialog
    ) {

    }

    searchValue: string;
    timerID = null;
    products:Array<Product> = [];

    ngOnInit(): void {

    }


    createProduct() {
        this.router.navigate(['admin/products/edit/createNew']);
    }

    change() {
        if (this.timerID == null) {
            this.createTimerForRequest();
        } else {
            clearTimeout(this.timerID);
            this.createTimerForRequest();
        }
    }

    createTimerForRequest() {
        this.timerID = setTimeout(() => {
            this.productService.findProductsByName(this.searchValue).subscribe(r => {
                console.log('got');
                if(r.body.status == 'success') {
                    this.products = r.body.data;
                    console.log(this.products);
                }
            });
            this.timerID = null;
        }, 750);
    }
}
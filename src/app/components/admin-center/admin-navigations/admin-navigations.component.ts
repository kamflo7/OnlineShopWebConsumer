import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ProductService } from '../../../_services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Observable } from 'rxjs/Observable';
import { CategoryLogic } from '../../../_model/category-logic';
import { DialogCreateCategoryComponent } from '../../_dialogs/dialog-create-category/dialog-create-category.component';

@Component({
    selector: 'app-admin-navigations',
    templateUrl: 'admin-navigations.component.html',
    styleUrls: ['admin-navigations.component.css']
  })
export class AdminNavigationsComponent implements OnInit {
    constructor(private auth:AuthenticationService,
        private router:Router,
        private route: ActivatedRoute,
        private productService:ProductService,
        public dialog: MatDialog
      ) {
          
      }

    // categories:CategoryLogic[];

	ngOnInit(): void {
        // Observable.timer(500).subscribe(x => {
        //     this.loadCategories();
        // });
    }

    loadCategories():void {
        // this.productService.getCategories().then(r => {
        //     if(r.status == 'success') {
        //         this.categories = r.data;
        //     }
        // });
    }

    openDialog():void {
        // let dialogRef = this.dialog.open(DialogCreateCategoryComponent, {
        //     width: '300px',
        //   });
      
        //   dialogRef.afterClosed().subscribe(result => {
        //     if(result.success) {
        //         this.productService.createCategory(result.data).then(r => {
        //             if(r.status == 'success') {
        //                 this.loadCategories();
        //             } else {
        //                 alert("There was a problem with creating the category")
        //             }
        //         });
        //     }
        //   });
    }
}
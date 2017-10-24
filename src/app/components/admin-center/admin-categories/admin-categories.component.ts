import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ProductService } from '../../../_services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { DialogCreateCategoryComponent } from './dialog-create-category/dialog-create-category.component';

@Component({
    selector: 'app-admin-categories',
    templateUrl: 'admin-categories.component.html',
    styleUrls: ['admin-categories.component.css']
  })
export class AdminCategoriesComponent implements OnInit {
    constructor(private auth:AuthenticationService,
        private router:Router,
        private route: ActivatedRoute,
        private productService:ProductService,
        public dialog: MatDialog
      ) {
          
      }

	ngOnInit(): void {
    }

    openDialog():void {
        // this.router.navigate(["create"], {relativeTo: this.route});
        let dialogRef = this.dialog.open(DialogCreateCategoryComponent, {
            width: '250px',
            data: { name: 'dupa', animal: 'animal jakis' }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    }
}
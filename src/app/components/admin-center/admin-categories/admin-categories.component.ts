import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ProductService } from '../../../_services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

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
        // let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        //     width: '250px',
        //     data: { name: 'dupa', animal: this.animal }
        //   });
      
        //   dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     this.animal = result;
        //   });
    }
}
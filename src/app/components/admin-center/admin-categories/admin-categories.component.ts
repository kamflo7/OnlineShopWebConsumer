import { Component, OnInit, Injectable, Inject } from '@angular/core';
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
        let dialogRef = this.dialog.open(DialogCreateCategory, {
            width: '250px',
            data: { name: 'dupa', animal: 'animal jakis' }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    }
}

@Component({
    selector: 'dialog-create-category',
    template: `
        <div>
            <h2 md-dialog-title>My dialog</h2>
            <hr>
            <md-dialog-content>
                Tu jakis tekst
                <br><br>
                <strong>{{data}}</strong>
            </md-dialog-content>
            <hr>
            <md-dialog-actions>
                <button md-raised-button (click)="onCloseConfirm()"></button>
                <button md-raised-button (click)="onCloseCancel()"></button>
            </md-dialog-actions>
        </div>
    `
  })
  export class DialogCreateCategory {
  
    constructor(
      public dialogRef: MatDialogRef<DialogCreateCategory>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onCloseConfirm() {
        this.dialogRef.close('Confirm');
    }

    onCloseCancel() {
        this.dialogRef.close('Cancel');
    }
  }
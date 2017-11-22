import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ProductService } from '../../../_services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Observable } from 'rxjs/Observable';
import { CategoryLogic } from '../../../_model/category-logic';
import { DialogCreateCategoryComponent } from '../../_dialogs/dialog-create-category/dialog-create-category.component';
import { CategoryView } from '../../../_model/category-view';
import { NavigationConverter } from '../../../_services/navigation-converter.service';
import { NavigationItem } from '../../../_dto/navigation-item';
import { DialogCreateEditNavigationComponent } from '../../_dialogs/dialog-create-edit-navigation/dialog-create-edit-navigation.component';
import { CreateEditNavigationDTO } from '../../_dialogs/dialog-create-edit-navigation/dialog-create-edit-navigation.component';

@Component({
    selector: 'app-admin-navigations',
    templateUrl: 'admin-navigations.component.html',
    styleUrls: ['admin-navigations.component.css']
})
export class AdminNavigationsComponent implements OnInit {
    constructor(private auth: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        public dialog: MatDialog
    ) {
        //   DialogCreateEditNavigationComponent
    }

    categories: Array<NavigationItem> = [];
    btnCollapseText = "Hide";
    collapsed: boolean = true;

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.productService.getCategoryViews().then(r => {
            if (r.status == 'success') {
                let nv: NavigationConverter = new NavigationConverter();
                this.categories = nv.convertToChildrenStructure(r.data);
            }
        });
    }


    toggleCollapsation() {
        this.collapsed = !this.collapsed;
        this.btnCollapseText = this.collapsed ? "Hide" : "Collapse";
    }

    createNavigation() {
        let dialogRef = this.dialog.open(DialogCreateEditNavigationComponent, {
            width: '400px',
            data: <CreateEditNavigationDTO>{
                navigationItem: null
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result.success) {
                this.loadCategories();
            }
        });
    }

    openDialog(): void {
        // let dialogRef = this.dialog.open(DialogCreateCategoryComponent, {
        //     width: '300px',
        //     data: <CreateEditNavigationDTO>{
        //         navigationItem
        //     }
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
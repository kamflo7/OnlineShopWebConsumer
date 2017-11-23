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
import { LoginComponent } from '../../login/login.component';
import { DialogPrompt, DialogPromptData } from '../../_dialogs/dialog-prompt/dialog-prompt.component';
import {MatSnackBar} from '@angular/material';

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
        public dialog: MatDialog,
        public snackBar: MatSnackBar
    ) {

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
                // console.log(this.categories);
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
            if (result.success) {
                this.snackBar.open('You have successfully created the NavigationItem', null, {duration: 3000});
                this.loadCategories();
            }
        });
    }

    findNavigationItemById(id) {
        let nav: NavigationItem;

        for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id == id) {
                nav = this.categories[i];
                break;
            } else {
                for (let j = 0; j < this.categories[i].children.length; j++) {
                    if (this.categories[i].children[j].id == id) {
                        nav = this.categories[i].children[j];
                        break;
                    } else {
                        for (let k = 0; k < this.categories[i].children[j].children.length; k++) {
                            if (this.categories[i].children[j].children[k].id == id) {
                                nav = this.categories[i].children[j].children[k];
                                break;
                            }
                        }
                    }
                }
            }
        }
        return nav;
    }

    editNavigation(id) {
        let nav = this.findNavigationItemById(id);

        if (nav == null) {
            alert("Fatal error, cannot edit");
            return;
        }

        let dialogRef = this.dialog.open(DialogCreateEditNavigationComponent, {
            width: '400px',
            data: <CreateEditNavigationDTO>{
                navigationItem: nav
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.success) {
                this.snackBar.open('You have successfully edited "' + nav.name + '".', null, {duration: 3000});
                this.loadCategories();
            }
        });
    }

    removeNavigation(id) {
        let nav = this.findNavigationItemById(id);

        if (nav == null) {
            alert("Fatal error, cannot edit");
            return;
        }

        let dialogRef = this.dialog.open(DialogPrompt, {
            width: '400px',
            data: <DialogPromptData>{
                title: 'Remove NavigationItem',
                content: 'Are you sure you want to pernamently delete: ' + ' [' + nav.id + '] ' + nav.name
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.success) {
                this.productService.deleteCategoryView(nav.id).then(r => {
                    if(r.status == 'success') {
                        this.snackBar.open('You have successfully deleted "' + nav.name + '".', null, {duration: 3000});
                        this.loadCategories();
                    } else {
                        alert('There was a problem with performing delete operation.');
                    }
                });
            }
        });
    }
}
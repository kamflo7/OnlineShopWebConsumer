import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { NavigationItem } from '../../../_dto/navigation-item';
import { ProductService } from '../../../_services/product.service';
import { CategoryView } from '../../../_model/category-view';
import { CategoryLogic } from '../../../_model/category-logic';
import { NavigationConverter } from '../../../_services/navigation-converter.service';

@Component({
  selector: 'dialog-create-edit-navigation',
  templateUrl: 'dialog-create-edit-navigation.component.html',
  styles: ['dialog-create-edit-navigation.component.css']
})
export class DialogCreateEditNavigationComponent {

  constructor(public dialogRef: MatDialogRef<DialogCreateEditNavigationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateEditNavigationDTO,
    private productService:ProductService) {

    }

  modeEditing:boolean;
  dialogTitle:string;
  navigationName:string;

  selectedParentNavigation = -1;
  selectedCategoryLogic = -1;

  // navigations:Array<CategoryView> = [];
  navigations:Array<NavigationItem> = [];
  categoryLogics:Array<CategoryLogic> = [];

  ngOnInit() {
    if(this.data.navigationItem != null) { // mode editing
      this.dialogTitle = "Edit navigation";
      this.modeEditing = true;

      this.navigationName = this.data.navigationItem.name;
      this.selectedCategoryLogic = this.data.navigationItem.categoryLogic != null ? this.data.navigationItem.categoryLogic.id : -1;
      this.selectedParentNavigation = this.data.navigationItem.parentid > 0 ? this.data.navigationItem.parentid : -1;
    } else {
      this.modeEditing = false;
      this.dialogTitle = "Create a navigation";
    }

    this.requestNavigationData();
    this.requestLogicCategoriesData();
  }

  navigationParent_Change() {

  }

  categoryLogic_Change() {

  }

  requestLogicCategoriesData() {
    this.productService.getCategories().then(r => {
      if(r.status == 'success') {
        this.categoryLogics = r.data;
      }
    });
  }

  requestNavigationData() {
    this.productService.getCategoryViews().then(r => {
      if(r.status == 'success') {
        let nv:NavigationConverter = new NavigationConverter();
        this.navigations = nv.convertToChildrenStructure(r.data);
      }
    });
  }

  onCloseConfirm() {
    if(!this.modeEditing) {
      this.productService.createCategoryView(this.navigationName, this.selectedParentNavigation, this.selectedCategoryLogic).then(r => {
        this.dialogRef.close({success: true});
      });
    } else {
      this.productService.updateCategoryView(this.data.navigationItem.id, this.navigationName, this.selectedParentNavigation, this.selectedCategoryLogic).then(r => {
        this.dialogRef.close({success: true});
      });
    }
  }

  onCloseCancel() {
    this.dialogRef.close({success: false});
  }
}

export class CreateEditNavigationDTO {
  navigationItem:NavigationItem;
}
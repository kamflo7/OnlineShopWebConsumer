import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryLogic } from '../../../../_model/category-logic';
import { FeatureDefinition } from '../../../../_model/feature-definition';
import { MatDialog } from '@angular/material';
import { DialogCreateFeatureGroupComponent } from '../../../_dialogs/dialog-create-featuregroup/dialog-create-featuregroup.component';
import { DialogCreateEditFeatureDefinition } from '../../../_dialogs/dialog-create-edit-featuredefinition/dialog-create-edit-featuredefinition.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-category-edit',
  templateUrl: './admin-category-edit.component.html',
  styleUrls: ['./admin-category-edit.component.css']
})
export class AdminCategoryEditComponent implements OnInit {

  constructor(private productService: ProductService,
    private router:Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  id: number;
  category: CategoryLogic;

  editingName: boolean;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.loadCategory(this.id);
    });
  }

  loadCategory(id: number): void {
    this.productService.getCategory(id).then(r => {
      if (r.status == 'success') {
        this.category = r.data;
      } else {
        alert("There was a problem with loading the CategoryLogic")
      }
    });
  }

  categoryNameChange_Click(newName) {
    // console.log("start updating name: " + JSON.stringify(newName));
    this.productService.updateCategory(this.id, newName).then(r => {
      if(r.status == 'success') {
        this.snackBar.open('You have successfully changed name from "'+this.category.name+'" to "'+newName+'".', null, {duration: 3000});
        this.category.name = newName;
      } else {
        alert("There was a problem with editing category name");
      }
    });
  }

  featureGroupNameChange_Click(groupid:number, newName:string) {
    // console.log("Trying change featureGroup for index " + groupid + ", and new value: " + newName);
    this.productService.updateFeatureGroup(this.id, groupid, newName).then(r => {
      if(r.status == 'success') {
        this.snackBar.open('You have successfully changed FeatureGroup name.', null, {duration: 5000});
        this.category = r.data;
      } else {
        alert("There was a problem with editing the FeatureGroup");
      }
    });
  }

  listFeatureDefinition_Click(featureDef:FeatureDefinition) {
    let dialogRef = this.dialog.open(DialogCreateEditFeatureDefinition, {
      width: '400px',
      data: { featureDefinition: featureDef, featureGroups: this.category.featureGroups }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.success) {
        this.productService.updateFeatureDefinition(this.id, result.groupid, featureDef.id, result.data).then(r => {
          if(r.status == 'success') {
            this.category = r.data;
            this.snackBar.open('You have successfully edited FeatureDefinition.', null, {duration: 5000});
          } else {
            alert("There was a problem with editing the FeatureDefinition");
          }
        });
      }
    });
  }

  addFeatureDefinition_Click() {
    if(this.category.featureGroups == null || this.category.featureGroups.length == 0) {
      // alert("First you need to create some FeatureGroup, because FeatureDefinitions depend on FeatureGroups");
      this.snackBar.open('Sorry, but first you need to create any FeatureGroup, because FeatureDefinitions depend on FeatureGroups', null, {duration: 7000});
      return;
    }

    let dialogRef = this.dialog.open(DialogCreateEditFeatureDefinition, {
      width: '400px',
      data: { featureDefinition: null, featureGroups: this.category.featureGroups }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.success) { // this.dialogRef.close({success: true, data: data, groupid: this.groupid});
        console.log(JSON.stringify(result.data) + " | " + result.groupid);
        this.productService.createFeatureDefinition(this.id, result.groupid, result.data).then(r => {
          if(r.status = 'success') {
            this.category = r.data;
            this.snackBar.open('You have successfully created the FeatureDefinition.', null, {duration: 5000});
          } else {
            alert("There was a problem with creating the FeatureDefinition");
          }
        });
      }
    });
  }

  addFeatureGroup_Click() {
    let dialogRef = this.dialog.open(DialogCreateFeatureGroupComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.success) {
          this.productService.createFeatureGroup(this.id, result.data).then(r => {
              if(r.status == 'success') {
                this.snackBar.open('You have successfully created the FeatureGroup.', null, {duration: 7000});
                this.loadCategory(this.id);
              } else {
                  alert("There was a problem with creating the FeatureGroup")
              }
          });
      }
    });
  }

  goBack_Click() {
    this.router.navigate(["admin/categories"]);
  }
}

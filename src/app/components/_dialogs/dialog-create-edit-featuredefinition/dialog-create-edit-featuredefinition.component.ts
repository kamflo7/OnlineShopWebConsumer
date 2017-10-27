import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { FeatureDefinitionDTOEditable } from '../../../_dto/feature-definition-dto-editable';
import { FeatureGroup } from '../../../_model/feature-group';

@Component({
  selector: 'dialog-create-edit-featuredefinition',
  templateUrl: 'dialog-create-edit-featuredefinition.component.html'
})
export class DialogCreateEditFeatureDefinition {

  constructor(public dialogRef: MatDialogRef<DialogCreateEditFeatureDefinition>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dto.newValues = [];
      this.givenFeatureGroups = data.featureGroups;

      if(data.featureDefinition != null) { // passing existing FeatureDefinition for edit
        this.modeEditing = true;
        this.title = 'Edit FeatureDefinition';
        this.featureDefinitionID = data.featureDefinition.id;

        this.dto.featureValues = [];
        for(var i=0; i<data.featureDefinition.featureValueDefinitions.length; i++) {
          var eachFeature = {
            id: data.featureDefinition.featureValueDefinitions[i].id,
            value: data.featureDefinition.featureValueDefinitions[i].value,
          };
          this.dto.featureValues.push(eachFeature);
        }

        this.dto.name = data.featureDefinition.name;
        this.dto.multipleValues = data.featureDefinition.multipleValues;
        this.dto.filterable = data.featureDefinition.filterable;
        this.dto.visible = data.featureDefinition.visible;

        this.groupid = data.featureDefinition.featureGroup.id;
      } else { // create new FeatureDefinition
        this.modeEditing = false;
        this.title = 'Create FeatureDefinition';
        this.dto.name = "Edit my name";
        this.dto.featureValues = [];
        this.groupid = this.givenFeatureGroups[0].id;
      }

      console.log("groupid: " + this.groupid + " | " + JSON.stringify(this.givenFeatureGroups));
    }

  title:string;
  modeEditing:boolean;
  givenFeatureGroups:FeatureGroup[];
  featureDefinitionID:number;

  dto:any = {};
  groupid:number;

  featureGroupChange(groupid:number) {
    this.groupid = groupid;
  }

  featureDefNameChange(name:string) {
    this.dto.name = name;
  }

  featureValueChange(i:number, name:string) {
    this.dto.featureValues[i].value = name;
  }

  featureValueJustCreatedChange(i:number, name:string) {
    this.dto.newValues[i] = name;
  }

  addNewAdditionalValue() {
    this.dto.newValues.push("New empty value - edit me");
  }

  onCloseConfirm() {
    let data = <FeatureDefinitionDTOEditable>{
      name: this.dto.name,
      multipleValues: this.dto.multipleValues,
      filterable: this.dto.filterable,
      visible: this.dto.visible,
      values: {},
      newValues: []
    };
    for(let i=0; i<this.dto.featureValues.length; i++) {
      data.values[this.dto.featureValues[i].id] = this.dto.featureValues[i].value;
    }

    for(let j=0; j<this.dto.newValues.length; j++) {
      data.newValues.push(this.dto.newValues[j]);
    }

    // console.log('final data:');
    // console.log(data);
    this.dialogRef.close({success: true, data: data, groupid: this.groupid});
  }

  onCloseCancel() {
    this.dialogRef.close({success: false});
  }
}
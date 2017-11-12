import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { FeatureDefinitionDTOEditable } from '../../../_dto/feature-definition-dto-editable';
import { FeatureGroup } from '../../../_model/feature-group';
import { AuthenticationService } from '../../../_services/authentication.service';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'dialog-create-edit-address',
  templateUrl: 'dialog-create-edit-address.component.html'
})
export class DialogCreateEditAddressComponent {

  constructor(public dialogRef: MatDialogRef<DialogCreateEditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth:AuthenticationService,
    private userService:UserService) {
      this.title = "Create address or edit"

      // console.log("USER: " + JSON.stringify(this.auth.getUser()));
      this.userID = this.auth.getUser().id;
    }

  title:string;
  modeEditing:boolean;
  userID;

  //data basic
  addressTypeSelected = 'personal'; // personal or company
  addressName = "Main";
  street = "Nice";
  zipCode = "30-080";
  city = "SomeCity";
  phoneNumber = "500800700";
  houseNumber = "37";

  //data personal
  firstName = "John";
  lastName = "Doe";

  //data company
  name;
  name2;
  name3;
  nip;

  onCloseConfirm() {
    
    let dto = this.buildDTO();
    this.userService.createAddress(this.userID, dto, this.addressTypeSelected).then(r => {
      this.dialogRef.close({success: true});
    });
  }

  onCloseCancel() {
    this.dialogRef.close({success: false});
  }

  buildDTO() {

    let dto = {};
    dto['addressName'] = this.addressName;
    dto['street'] = this.street;
    dto['zipCode'] = this.zipCode;
    dto['city'] = this.city;
    dto['phoneNumber'] = this.phoneNumber;
    dto['houseNumber'] = this.houseNumber;

    if(this.addressTypeSelected == 'personal') {
      dto['firstName'] = this.firstName;
      dto['lastName'] = this.lastName;
    } else if(this.addressTypeSelected == 'company') {
      dto['name'] = this.name;
      dto['name2'] = this.name2;
      dto['name3'] = this.name3;
      dto['nip'] = this.nip;
    }

    return dto;
  }

  addressName_Change(value) {
    this.addressName = value;
  }

  addressType_Change(type) {
    this.addressTypeSelected = type.value;
  }
}
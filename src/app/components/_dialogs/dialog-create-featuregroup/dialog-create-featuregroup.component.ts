import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'dialog-create-featuregroup',
  templateUrl: 'dialog-create-featuregroup.component.html'
})
export class DialogCreateFeatureGroupComponent {

  constructor(public dialogRef: MatDialogRef<DialogCreateFeatureGroupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  groupName:string;

  onCloseConfirm() {
    this.dialogRef.close({success: true, data: this.groupName});
  }

  onCloseCancel() {
    this.dialogRef.close({success: false});
  }

  sth(s):void {
  }
}
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'dialog-create-category',
  templateUrl: 'dialog-create-category.component.html'
})
export class DialogCreateCategoryComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogCreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCloseConfirm() {
      this.dialogRef.close('Confirm');
  }

  onCloseCancel() {
      this.dialogRef.close('Cancel');
  }
}
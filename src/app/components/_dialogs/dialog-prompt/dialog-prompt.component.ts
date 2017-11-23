import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { NavigationItem } from '../../../_dto/navigation-item';
import { ProductService } from '../../../_services/product.service';
import { CategoryView } from '../../../_model/category-view';
import { CategoryLogic } from '../../../_model/category-logic';
import { NavigationConverter } from '../../../_services/navigation-converter.service';

@Component({
  selector: 'dialog-prompt',
  templateUrl: 'dialog-prompt.component.html',
  styles: ['dialog-prompt.component.css']
})
export class DialogPrompt {

  constructor(public dialogRef: MatDialogRef<DialogPrompt>,
      @Inject(MAT_DIALOG_DATA) public data: DialogPromptData) {
      this.title = data.title;
      this.content = data.content;
  }

  title;
  content;

  ngOnInit() {

  }


  onCloseConfirm() {
    this.dialogRef.close({success: true});
  }

  onCloseCancel() {
    this.dialogRef.close({success: false});
  }
}

export class DialogPromptData {
  title:string;
  content:string;
}
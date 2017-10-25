import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dynamic-input-text',
  templateUrl: './dynamic-input-text.component.html',
  styleUrls: ['./dynamic-input-text.component.css']
})
export class DynamicInputTextComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.originalValue = this.value;
  }

  @Input() value:string;
  @Output() changeVal:EventEmitter<string> = new EventEmitter();

  originalValue:string;
  isEditing:boolean = false;

  submit(e:MouseEvent) {
    this.isEditing = false;
    if(this.originalValue != this.value) {
      this.changeVal.emit(this.value);
      this.value = this.originalValue;
    }
  }

  cancel() {
    this.isEditing=false;
  }

  onUserEnter() {
    this.submit(null);
  }
}

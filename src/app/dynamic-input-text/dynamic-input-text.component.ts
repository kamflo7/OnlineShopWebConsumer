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
  originalValue:string;
  @Output() change:EventEmitter<string> = new EventEmitter();
  isEditing:boolean = false;

  startEdit() {
    this.isEditing = true;
  }

  submit() {
    this.isEditing = false;
    if(this.originalValue != this.value) {
      this.change.emit(this.value);
      this.value = this.originalValue;
    }
  }

  cancel() {
    this.isEditing=false;
  }

}

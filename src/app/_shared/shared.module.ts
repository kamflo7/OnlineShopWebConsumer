import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';
 

 
@NgModule({
  imports:      [ CommonModule, RouterModule ],
  declarations: [
    HeaderComponent
],
  exports: [
    HeaderComponent,
      CommonModule
     ]
})
export class SharedModule { }
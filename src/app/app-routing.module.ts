import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';


const routes: Routes = [
    { path: 'cat/:category',    component: CategoryComponent },
    { path: '',                 component: HomeComponent },
    { path: 'login',            component: LoginComponent }
    // { path: 'profile',  component: ProfileComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}
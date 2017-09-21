import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { ProfileCenterComponent } from './components/profile-center/profile-center.component';
import { ProfileMainComponent } from './components/profile-center/profile-main/profile-main.component';
import { ProfileChangePasswordComponent } from './components/profile-center/profile-change-passwd/profile-change-passwd.component';



const routes: Routes = [
    { path: 'cat/:category',    component: CategoryComponent },
    { path: '',                 component: HomeComponent },
    { path: 'login',            component: LoginComponent },
    { path: 'profile',          component: ProfileCenterComponent,
                                children: [
                                    {
                                        path: '',   component: ProfileMainComponent
                                    },
                                    {
                                        path: 'change-password',    component: ProfileChangePasswordComponent
                                    }
                                ]}
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}
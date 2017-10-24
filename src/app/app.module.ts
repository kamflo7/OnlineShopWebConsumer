import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { Globals } from './globals';
import { CategoryComponent } from './components/category/category.component';
import { ProfileCenterComponent } from './components/profile-center/profile-center.component';
import { ProfileMainComponent } from './components/profile-center/profile-main/profile-main.component';
import { ProfileChangePasswordComponent } from './components/profile-center/profile-change-passwd/profile-change-passwd.component';
import { ProductComponent } from './components/product/product.component';
import { AdminCenterComponent } from './components/admin-center/admin-center.component';
import { AdminMainComponent } from './components/admin-center/admin-main/admin-main.component';
import { FormAdminProductEdit } from './components/_forms/form-admin-product-edit/form-admin-product-edit.component';
import { AdminCategoriesComponent } from './components/admin-center/admin-categories/admin-categories.component';
import { AdminCategoriesCreateComponent } from './components/admin-center/admin-categories-create/admin-categories-create.component';
import { FormAdminCategoryLogicComponent } from './components/_forms/form-admin-categorylogic/form-admin-categorylogic.component';
import { SharedModule } from './_shared/shared.module';
import { AuthenticationService } from './_services/authentication.service';
import { ProductService } from './_services/product.service';
import { TokenInterceptor } from './_services/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CategoryComponent,
    ProfileCenterComponent, ProfileMainComponent, ProfileChangePasswordComponent,
    ProductComponent,
    AdminCenterComponent, AdminMainComponent, AdminCategoriesComponent, AdminCategoriesCreateComponent,
    FormAdminProductEdit, FormAdminCategoryLogicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
    //  MatButtonModule, MatCheckboxModule
  ],
  exports: [

  ],
  providers: [
    Globals,
    AuthenticationService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

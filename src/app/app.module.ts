import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { TokenInterceptor } from './services/token.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { ProductService } from './services/product.service';
import { Globals } from './globals';
import { CategoryComponent } from './components/category/category.component';
import { ProfileCenterComponent } from './components/profile-center/profile-center.component';
import { ProfileMainComponent } from './components/profile-center/profile-main/profile-main.component';
import { ProfileChangePasswordComponent } from './components/profile-center/profile-change-passwd/profile-change-passwd.component';
import { ProductComponent } from './components/product/product.component';
import { AdminCenterComponent } from './components/admin-center/admin-center.component';
import { AdminMainComponent } from './components/admin-center/admin-main/admin-main.component';
import { FormAdminProductEdit } from './components/_forms/form-admin-product-edit/form-admin-product-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CategoryComponent,
    ProfileCenterComponent, ProfileMainComponent, ProfileChangePasswordComponent,
    ProductComponent,
    AdminCenterComponent, AdminMainComponent,
    FormAdminProductEdit
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
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

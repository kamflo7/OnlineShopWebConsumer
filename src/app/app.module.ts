import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule, MatInputModule, MatSnackBarModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatButtonModule } from '@angular/material';

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
import { FormAdminCategoryLogicComponent } from './components/_forms/form-admin-categorylogic/form-admin-categorylogic.component';
import { SharedModule } from './_shared/shared.module';
import { AuthenticationService } from './_services/authentication.service';
import { ProductService } from './_services/product.service';
import { TokenInterceptor } from './_services/token.interceptor';
import { AdminCategoryEditComponent } from './components/admin-center/admin-categories/admin-category-edit/admin-category-edit.component';
import { DynamicInputTextComponent } from './dynamic-input-text/dynamic-input-text.component';
import { DialogCreateCategoryComponent } from './components/_dialogs/dialog-create-category/dialog-create-category.component';
import { DialogCreateFeatureGroupComponent } from './components/_dialogs/dialog-create-featuregroup/dialog-create-featuregroup.component';
import { DialogCreateEditFeatureDefinition } from './components/_dialogs/dialog-create-edit-featuredefinition/dialog-create-edit-featuredefinition.component';
import { AdminProductsComponent } from './components/admin-center/admin-products/admin-products.component';
import { AdminProductEditComponent } from './components/admin-center/admin-products/admin-product-edit/admin-product-edit.component';
import { AdminNavigationsComponent } from './components/admin-center/admin-navigations/admin-navigations.component';
import { AdminNavigationEditComponent } from './components/admin-center/admin-navigations/admin-navigation-edit/admin-navigation-edit.component';

@NgModule({
  declarations: [
// normal components
    AppComponent,
    HomeComponent,
    LoginComponent,
    CategoryComponent,
    ProfileCenterComponent, ProfileMainComponent, ProfileChangePasswordComponent,
    ProductComponent,
// Admin components
    AdminCenterComponent,
      AdminMainComponent,
      AdminCategoriesComponent, AdminCategoryEditComponent,
      AdminProductsComponent, AdminProductEditComponent,
      AdminNavigationsComponent, AdminNavigationEditComponent,
    FormAdminProductEdit, FormAdminCategoryLogicComponent,
// dialogs
    DialogCreateCategoryComponent, DialogCreateFeatureGroupComponent, DialogCreateEditFeatureDefinition,
// other things
    DynamicInputTextComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule, MatInputModule, MatSnackBarModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatButtonModule
  ],
  entryComponents: [
    DialogCreateCategoryComponent, DialogCreateFeatureGroupComponent, DialogCreateEditFeatureDefinition
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

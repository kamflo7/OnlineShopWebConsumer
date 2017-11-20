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
import { NavigationConverter } from './_services/navigation-converter.service';
import { ItemListProductComponent } from './components/item-list-product/item-list-product.component';
import { OrderService } from './_services/order.service';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProfileChangeInformationsComponent } from './components/profile-center/profile-change-informations/profile-change-informations.component';
import { ProfileChangeEmailComponent } from './components/profile-center/profile-change-email/profile-change-email.component';
import { ProfileChangeAddressesComponent } from './components/profile-center/profile-change-addresses/profile-change-addresses.component';
import { ProfileOrdersComponent } from './components/profile-center/profile-orders/profile-orders.component';
import { ProfileReportProductComponent } from './components/profile-center/profile-report-product/profile-report-product.component';
import { ProfileActiveSubmissionsComponent } from './components/profile-center/profile-active-submissions/profile-active-submissions.component';
import { ProfileClosedSubmissionsComponent } from './components/profile-center/profile-closed-submissions/profile-closed-submissions.component';
import { ProfileAskQuestionComponent } from './components/profile-center/profile-ask-question/profile-ask-question.component';
import { ProfileActiveQuestionsComponent } from './components/profile-center/profile-active-questions/profile-active-questions.component';
import { ProfileClosedQuestionsComponent } from './components/profile-center/profile-closed-questions/profile-closed-questions.component';
import { ProfileOffersComponent } from './components/profile-center/profile-offers/profile-offers.component';
import { DialogCreateEditAddressComponent } from './components/_dialogs/dialog-create-edit-address/dialog-create-edit-address.component';
import { UserService } from './_services/user.service';
import { ShoppingCartConfirmationComponent } from './components/shopping-cart-confirmation/shopping-cart-confirmation.component';
import { ProfileOrderDetailsComponent } from './components/profile-center/profile-order-details/profile-order-details.component';

@NgModule({
  declarations: [
// normal components
    AppComponent,
    HomeComponent,
    LoginComponent,
    CategoryComponent,
    ProfileCenterComponent, ProfileMainComponent, ProfileChangePasswordComponent, ProfileActiveQuestionsComponent, ProfileActiveSubmissionsComponent,
      ProfileAskQuestionComponent, ProfileChangeAddressesComponent, ProfileChangeEmailComponent, ProfileChangeInformationsComponent, ProfileClosedQuestionsComponent,
      ProfileClosedSubmissionsComponent, ProfileOrdersComponent, ProfileOrderDetailsComponent, ProfileReportProductComponent,
    ProductComponent,
    ShoppingCartComponent, ShoppingCartConfirmationComponent,
// Admin components
    AdminCenterComponent,
      AdminMainComponent,
      AdminCategoriesComponent, AdminCategoryEditComponent,
      AdminProductsComponent, AdminProductEditComponent,
      AdminNavigationsComponent, AdminNavigationEditComponent,
    FormAdminProductEdit, FormAdminCategoryLogicComponent,
// dialogs
    DialogCreateCategoryComponent, DialogCreateFeatureGroupComponent, DialogCreateEditFeatureDefinition, DialogCreateEditAddressComponent,
// other things
    DynamicInputTextComponent, ItemListProductComponent, ProfileChangeInformationsComponent, ProfileChangeEmailComponent, ProfileChangeAddressesComponent, ProfileOrdersComponent, ProfileReportProductComponent, ProfileActiveSubmissionsComponent, ProfileClosedSubmissionsComponent, ProfileAskQuestionComponent, ProfileActiveQuestionsComponent, ProfileClosedQuestionsComponent, ProfileOffersComponent,
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
    DialogCreateCategoryComponent, DialogCreateFeatureGroupComponent, DialogCreateEditFeatureDefinition,
    DialogCreateEditAddressComponent
  ],
  exports: [

  ],
  providers: [
    Globals,
    AuthenticationService,
    ProductService,
    NavigationConverter,
    OrderService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

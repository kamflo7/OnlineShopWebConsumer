import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { ProfileCenterComponent } from './components/profile-center/profile-center.component';
import { ProfileMainComponent } from './components/profile-center/profile-main/profile-main.component';
import { ProfileChangePasswordComponent } from './components/profile-center/profile-change-passwd/profile-change-passwd.component';
import { ProductComponent } from './components/product/product.component';
import { AdminCenterComponent } from './components/admin-center/admin-center.component';
import { AdminMainComponent } from './components/admin-center/admin-main/admin-main.component';
import { AdminCategoriesComponent } from './components/admin-center/admin-categories/admin-categories.component';
import { AdminCategoryEditComponent } from './components/admin-center/admin-categories/admin-category-edit/admin-category-edit.component';
import { AdminProductsComponent } from './components/admin-center/admin-products/admin-products.component';
import { AdminProductEditComponent } from './components/admin-center/admin-products/admin-product-edit/admin-product-edit.component';
import { AdminNavigationsComponent } from './components/admin-center/admin-navigations/admin-navigations.component';
import { AdminNavigationEditComponent } from './components/admin-center/admin-navigations/admin-navigation-edit/admin-navigation-edit.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProfileChangeInformationsComponent } from './components/profile-center/profile-change-informations/profile-change-informations.component';
import { ProfileChangeEmailComponent } from './components/profile-center/profile-change-email/profile-change-email.component';
import { ProfileChangeAddressesComponent } from './components/profile-center/profile-change-addresses/profile-change-addresses.component';
import { ProfileOrdersComponent } from './components/profile-center/profile-orders/profile-orders.component';
import { ProfileOffersComponent } from './components/profile-center/profile-offers/profile-offers.component';
import { ProfileReportProductComponent } from './components/profile-center/profile-report-product/profile-report-product.component';
import { ProfileActiveSubmissionsComponent } from './components/profile-center/profile-active-submissions/profile-active-submissions.component';
import { ProfileClosedSubmissionsComponent } from './components/profile-center/profile-closed-submissions/profile-closed-submissions.component';
import { ProfileAskQuestionComponent } from './components/profile-center/profile-ask-question/profile-ask-question.component';
import { ProfileActiveQuestionsComponent } from './components/profile-center/profile-active-questions/profile-active-questions.component';
import { ProfileClosedQuestionsComponent } from './components/profile-center/profile-closed-questions/profile-closed-questions.component';
import { ShoppingCartConfirmationComponent } from './components/shopping-cart-confirmation/shopping-cart-confirmation.component';
import { ProfileOrderDetailsComponent } from './components/profile-center/profile-order-details/profile-order-details.component';


const routes: Routes = [
    // { path: 'cat/:category',    component: CategoryComponent },
    { path: '', component: HomeComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent }, 
    { path: 'shopping-cart/confirm', component: ShoppingCartConfirmationComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'profile', component: ProfileCenterComponent,
        children: [
            { path: '', component: ProfileMainComponent },
            { path: 'change-password', component: ProfileChangePasswordComponent },
            { path: 'change-basic-informations', component: ProfileChangeInformationsComponent },
            { path: 'change-email', component: ProfileChangeEmailComponent },
            { path: 'change-addresses', component: ProfileChangeAddressesComponent },
            { path: 'orders', component: ProfileOrdersComponent },
            { path: 'orders/:id', component: ProfileOrderDetailsComponent },
            { path: 'offers', component: ProfileOffersComponent },
            { path: 'report-product', component: ProfileReportProductComponent },
            { path: 'active-submissions', component: ProfileActiveSubmissionsComponent },
            { path: 'closed-submissions', component: ProfileClosedSubmissionsComponent },
            { path: 'ask-a-question', component: ProfileAskQuestionComponent },
            { path: 'active-questions', component: ProfileActiveQuestionsComponent },
            { path: 'closed-questions', component: ProfileClosedQuestionsComponent },
        ]
    },
    { path: 'product/:id', component: ProductComponent },
    { path: 'category/:category', component: CategoryComponent },
    { path: 'category/:category/:subcategory', component: CategoryComponent },
    { path: 'category/:category/:subcategory/:subcategory2', component: CategoryComponent },
    {
        path: 'admin', component: AdminCenterComponent,
        children: [
            // { path: '', component: AdminMainComponent},
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard', component: AdminMainComponent},
            // { path: ':id', component: AdminMainComponent},
            { path: 'categories', component: AdminCategoriesComponent},
            { path: 'categories/edit/:id', component: AdminCategoryEditComponent},

            { path: 'products', component: AdminProductsComponent},
            { path: 'products/edit/:id', component: AdminProductEditComponent},
            
            { path: 'navigations', component: AdminNavigationsComponent},
            { path: 'navigations/edit/:id', component: AdminNavigationEditComponent},
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
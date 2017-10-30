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


const routes: Routes = [
    // { path: 'cat/:category',    component: CategoryComponent },
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'profile', component: ProfileCenterComponent,
        children: [
            { path: '', component: ProfileMainComponent },
            { path: 'change-password', component: ProfileChangePasswordComponent }
        ]
    },
    { path: 'product/:id', component: ProductComponent },
    { path: 'category/:category', component: CategoryComponent },
    { path: 'category/:category/:subcategory', component: CategoryComponent },
    { path: 'category/:category/:subcategory/:subcategory2', component: CategoryComponent },
    {
        path: 'admin', component: AdminCenterComponent,
        children: [
            { path: '', component: AdminMainComponent},
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
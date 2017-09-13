import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ProfileChangePasswordComponent } from './profile-change-passwd/profile-change-passwd.component';
import { ProfileCenterComponent } from './profile-center.component';
import { HeaderComponent } from '../components/header/header.component';

const profileCenterRoutes: Routes = [
    {
        path: 'profile',
        component: ProfileCenterComponent,
        children: [
            {
                path: '', component: ProfileMainComponent //redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'change-password', component: ProfileChangePasswordComponent
            },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(profileCenterRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileCenterRoutingModule {}
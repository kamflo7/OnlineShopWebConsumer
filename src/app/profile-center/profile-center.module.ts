import { NgModule }       from '@angular/core';
import { ProfileCenterRoutingModule } from './profile-routing.module';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ProfileChangePasswordComponent } from './profile-change-passwd/profile-change-passwd.component';
import { ProfileCenterComponent } from './profile-center.component';
import { HeaderComponent } from '../components/header/header.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        SharedModule,
        ProfileCenterRoutingModule
    ],
    declarations: [
        ProfileCenterComponent,
        ProfileMainComponent,
        ProfileChangePasswordComponent
    ],
    providers: [

    ]
  })
  export class ProfileCenterModule {}
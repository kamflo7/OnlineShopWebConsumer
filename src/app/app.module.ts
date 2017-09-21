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
import { ProfileCenterModule } from './profile-center/profile-center.module';
import { SharedModule } from './shared/shared.module';
import { ProductService } from './services/product.service';
import { Globals } from './globals';
import { CategoryComponent } from './components/category/category.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CategoryComponent
    // HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    ProfileCenterModule,
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

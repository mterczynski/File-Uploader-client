import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';

import { ExtIconComponent } from './shared/components/extIcon.component';

// pipes:
import { FileSizePipe } from './shared/pipes/file-size.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AuthService } from './shared/services/auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomizeComponent } from './customize/customize.component';
import { ThemerService } from './shared/services/themer.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    SearchComponent,
    ExtIconComponent,
    FileSizePipe,
    TimeAgoPipe,
    LoginComponent,
    RegisterComponent,
    CustomizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, ThemerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

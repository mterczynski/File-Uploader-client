import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './shared/components/account/account.component';
import { CustomizeComponent } from './shared/components/customize/customize.component';
import { ExtIconComponent } from './shared/components/extIcon/extIcon.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { FileSizePipe } from './shared/pipes/file-size/file-size.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    ExtIconComponent,
    FileSizePipe,
    TimeAgoPipe,
    LoginComponent,
    RegisterComponent,
    CustomizeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

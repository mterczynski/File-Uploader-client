import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// App:
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Components:
import { ExtIconComponent } from './shared/components/extIcon/extIcon.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AccountComponent } from './shared/components/account/account.component';
import { SearchComponent } from './shared/components/search/search.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { CustomizeComponent } from './shared/components/customize/customize.component';
// Pipes:
import { FileSizePipe } from './shared/pipes/file-size.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';

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

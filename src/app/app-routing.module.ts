import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CustomizeComponent } from './components/customize/customize.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard] },
  { path: 'customize', component: CustomizeComponent },
  { path: 'account', component: AccountComponent, canActivate: [LoggedInGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    [ RouterModule.forRoot(routes) ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

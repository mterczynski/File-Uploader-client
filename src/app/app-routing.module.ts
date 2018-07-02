import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedInGuard } from './shared/guards/not-logged-in.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { HomeComponent } from './shared/components/home/home.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { LoginComponent } from './shared/components/login/login.component';
import { CustomizeComponent } from './shared/components/customize/customize.component';
import { AccountComponent } from './shared/components/account/account.component';

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

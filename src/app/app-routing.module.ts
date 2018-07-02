import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CustomizeComponent } from './customize/customize.component';
import { NotLoggedInGuard } from './shared/guards/not-logged-in.guard';
import { AccountComponent } from './account/account.component';
import { LoggedInGuard } from './shared/guards/logged-in.guard';

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

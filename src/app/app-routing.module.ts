import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'search', component: SearchComponent },
  // { path: 'account', component: AccountComponent }
];

@NgModule({
  imports: [
    [ RouterModule.forRoot(routes) ]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

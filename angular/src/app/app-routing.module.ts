import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CstComponent } from './cst/cst.component';
import { PrismComponent } from './prism/prism.component';

import {AuthGuard} from './domain/auth.guard';
//配置路由
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'cst', component: CstComponent },
      { path: 'prism', component: PrismComponent }
    ],canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

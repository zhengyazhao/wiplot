import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//页面ts文件引用
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CstComponent } from './cst/cst.component';
import { LoginComponent } from './login/login.component';
import { PrismComponent } from './prism/prism.component';
import{AnalysisComponent} from './components/Analysis/Analysis.component';

//实体类ts文件引用

import { ConfigModel } from './domain/configModel';
import {AuthGuard} from './domain/auth.guard';
import {ElModule } from 'element-angular';

import 'element-angular/theme/index.css';

//弹出动画效果必须引用该服务，并且需要通过npm安装
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  //模块声明
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    CstComponent,
    PrismComponent,
    AnalysisComponent
    
  ],
  //导入引用
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ElModule.forRoot(),
    BrowserAnimationsModule
    
  ],
  providers: [ConfigModel,AuthGuard],
  //启动模块
  bootstrap: [AppComponent]
})
export class AppModule { }

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';

import { CstComponent } from '../cst/cst.component';
import { PrismComponent } from '../prism/prism.component';

import{AnalysisComponent}from '../components/Analysis/Analysis.component';
export const homeRoutes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:'cst',
        component:CstComponent
      },
      {
        path:'prism',
        component:PrismComponent
      }
      ,
      
      {
        path:'analysis',
        component:AnalysisComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(<any> MainRoutingModule)],
    exports: [RouterModule]
  })

export class MainRoutingModule { }
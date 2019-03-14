import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import{MainComponent} from './main.component';

import{CstComponent} from '../cst/cst.component';

export const homeRoutes=[
{
path:'',
component:MainComponent,
 children:[
{

    path:'cst',
   component:CstComponent
}

 ]

}

];
@NgModule({
    imports: [RouterModule.forChild(<any> MainRoutingModule)],
    exports: [RouterModule]
  })
  export class MainRoutingModule { }
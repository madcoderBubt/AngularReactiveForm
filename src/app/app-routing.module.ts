import { NgModule } from '@angular/core';
import { ListEmployeeComponent } from './emp/list-employee/list-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { PutEmployeeComponent } from './emp/put-employee/put-employee.component';

const appRoutes:Routes = [
  {path:'emp/list',component: ListEmployeeComponent},
  {path:'emp/put',component: PutEmployeeComponent},
  {path:'emp/put/:id',component: PutEmployeeComponent},
  {path:'', redirectTo:"emp/list", pathMatch:'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

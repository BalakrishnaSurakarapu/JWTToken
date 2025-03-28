import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { RoleComponent } from './role/role.component';
import { RolePrivilegeComponent } from './role-privilege/role-privilege.component';
import { UserComponent } from './user/user.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'students', component: StudentComponent, pathMatch: 'full' },
  { path: 'roles', component: RoleComponent, pathMatch: 'full' },
  { path: 'role-privileges/:id', component: RolePrivilegeComponent, pathMatch: 'full' },
  { path: 'users', component: UserComponent, pathMatch: 'full' },
  { path: 'students', component: StudentComponent },
{ path: 'create-student', component: StudentComponent },
{ path: 'users', component: UserComponent },
{ path: 'create-user', component: UserComponent },
{ path: 'roles', component: RoleComponent },
{ path: 'create-role', component: RoleComponent },
{ path: 'test', component: TestComponent },
{ path: '', redirectTo: '/students', pathMatch: 'full' }, // Default route
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

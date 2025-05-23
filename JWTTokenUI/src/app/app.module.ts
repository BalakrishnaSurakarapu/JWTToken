import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RolePrivilegeComponent } from './role-privilege/role-privilege.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { StudentComponent } from './student/student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './services/role.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BgcolorDirective } from './bgcolor.directive';
import { DirectiveComponent } from './directive/directive.component';


@NgModule({
  declarations: [
    AppComponent,
    RolePrivilegeComponent,
    RoleComponent,
    UserComponent,
    StudentComponent,
    BgcolorDirective,
    DirectiveComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,CommonModule,NgbModule
  ],
  providers: [RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

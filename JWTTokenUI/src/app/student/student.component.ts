import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  dynamicColor = 'orange';
    students: any;
    closeResult: any;
    roleForm = new FormGroup({
      id: new FormControl(0),
      roleName: new FormControl(''),
      description: new FormControl(''),
      isActive: new FormControl(false),
    });
    constructor(private _roleService: RoleService, private modalService: NgbModal,
      private _notificationService: NotificationService, private _router: Router) {
      this.getStudents();
    }
    getStudents() {
      this._roleService.getStudent().subscribe({
        //Success  
        next: (result: any) => {
          this.students = result.data;
          console.log(result);
        },
        //Error
        error: (error: any) => {
          console.log(error);
        }
      })
    }
    edit(content: any, roleData: any) {
      this.roleForm.patchValue({
        id: roleData.id,
        roleName: roleData.roleName,
        description: roleData.description,
        isActive: roleData.isActive
      });
      this.modalService.open(content, { centered: true, size: 'lg' });
    }
    delete(id: number) {
      this._notificationService.deleteConfirmation("Are you sure, you want to delete the role", "Delete Confirmation?",
        () => {
          this._roleService.deleteRole(id).subscribe({
            //Success  
            next: (result: any) => {
              if (result.status)
                this._notificationService.successMessage("Role deleted Successfully", "Deleted");
              else
                this._notificationService.errorMessage("Unable to delete role", "Error");
              this.getStudents();
              console.log(result);
            },
            //Error
            error: (error: any) => {
              console.log(error);
            }
          })
        });
  
    }
    Save() {
      if (this.roleForm.value.id == 0) {
        this._roleService.createRole({ ...this.roleForm.value }).subscribe({
          //Success  
          next: (result: any) => {
            if (result.status)
              this._notificationService.successMessage("Role created Successfully", "Created");
            else
              this._notificationService.errorMessage("Unable to create role", "Error");
            this.getStudents();
            console.log(result);
          },
          //Error
          error: (error: any) => {
            console.log(error);
          }
        })
      }
      else {
        this._roleService.updateRole({ ...this.roleForm.value }).subscribe({
          //Success  
          next: (result: any) => {
            if (result.status)
              this._notificationService.successMessage("Role updated Successfully", "Updated");
            else
              this._notificationService.errorMessage("Unable to update role", "Error");
            this.getStudents();
            console.log(result);
          },
          //Error
          error: (error: any) => {
            console.log(error);
          }
        })
      }
      // console.log(this.roleForm.value)
      // console.log("Saved.");
      this.modalService.dismissAll();
    }
  
    managePrivileges(role: any){
      this._router.navigate(['role-privileges', role.id]);
      sessionStorage.setItem('roleName', role.roleName);
    }
}

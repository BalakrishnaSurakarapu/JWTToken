import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
 users: any;
    closeResult: any;
    userForm = new FormGroup({
      id: new FormControl(0),
      UserName: new FormControl(''),
      Password: new FormControl(''),
      usertypeId:new FormControl(''),
      isActive: new FormControl(false),
    });
    constructor(private _roleService: RoleService, private modalService: NgbModal,
      private _notificationService: NotificationService, private _router: Router) {
      this.getgetUsers();
    }
    getgetUsers() {
      this._roleService.getUser().subscribe({
        //Success  
        next: (result: any) => {
          this.users = result.data;
          console.log(result);
        },
        //Error
        error: (error: any) => {
          console.log(error);
        }
      })
    }
    
    edit(content: any, userData: any) {debugger
      this.userForm.patchValue({
        id: userData.id,
        UserName: userData.username,
        Password: userData.password,
        usertypeId:userData.userTypeId,
        isActive: userData.isActive
      });
      this.modalService.open(content, { centered: true, size: 'lg' });
    }
    delete(id: number) {
      this._notificationService.deleteConfirmation("Are you sure, you want to delete the User", "Delete Confirmation?",
        () => {
          this._roleService.deleteUser(id).subscribe({
            //Success  
            next: (result: any) => {
              if (result.status)
                this._notificationService.successMessage("User deleted Successfully", "Deleted");
              else
                this._notificationService.errorMessage("Unable to delete User", "Error");
              this.getgetUsers();
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
      if (this.userForm.value.id == 0) {
        this._roleService.createUser({ ...this.userForm.value }).subscribe({
          //Success  
          next: (result: any) => {
            if (result.status)
              this._notificationService.successMessage("Role created Successfully", "Created");
            else
              this._notificationService.errorMessage("Unable to create role", "Error");
            this.getgetUsers();
            console.log(result);
          },
          //Error
          error: (error: any) => {
            console.log(error);
          }
        })
      }
      else {
        this._roleService.updateRole({ ...this.userForm.value }).subscribe({
          //Success  
          next: (result: any) => {
            if (result.status)
              this._notificationService.successMessage("user updated Successfully", "Updated");
            else
              this._notificationService.errorMessage("Unable to update user", "Error");
            this.getgetUsers();
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
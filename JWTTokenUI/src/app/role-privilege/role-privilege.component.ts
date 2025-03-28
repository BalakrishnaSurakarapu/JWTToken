import { Component, OnInit } from '@angular/core';
import { Role, RolePrivilege } from '../model/role.model';
import { CollegeRolePrivileges } from '../model/CollegeRolePrivileges';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-role-privilege',
  templateUrl: './role-privilege.component.html',
  styleUrls: ['./role-privilege.component.css']
})
export class RolePrivilegeComponent implements OnInit{
    assignedRolePrivilegeList: RolePrivilege[] = [];
    availableRolePrivilegeList: RolePrivilege[] = [];
    rolePrivilegeValue!: RolePrivilege;
    roleId: number = 0;
    currentRole: string = '';
    collegeRolePrivileges = CollegeRolePrivileges;
    constructor(private _roleService: RoleService,
      private _rounter: Router, private _route: ActivatedRoute, private _notificationService: NotificationService) { }
  
    ngOnInit() {
      this.roleId = Number.parseInt(this._route.snapshot.paramMap.get('id') ?? '0');
      this.currentRole = sessionStorage.getItem('roleName') ?? '';
      this.getRolePrivileges();
    }
    getRolePrivileges() {
      this._roleService.getRolePrivileges(this.roleId).subscribe((result: any) => {
        if (result.status) {
          console.log(result?.data);
          this.assignedRolePrivilegeList = result?.data;
          this.availableRolePrivilegeList = [];
          for (let rp in CollegeRolePrivileges) {
            if (this.assignedRolePrivilegeList && !this.assignedRolePrivilegeList.find(privilege => {
              return privilege.rolePrivilegeName === rp;
            })) {
              this.availableRolePrivilegeList.push({ id: 0, rolePrivilegeName: rp, description: CollegeRolePrivileges[rp as keyof typeof CollegeRolePrivileges], isActive: true, roleId: this.roleId });
            }
          }
        } else {
          this._notificationService.errorMessage(result.errors[0].title, "Error");
        }
      });
    }
    saveRolePrivileges(rolePrivilege: RolePrivilege) {
      this._roleService.saveRolePrivileges(rolePrivilege).subscribe({
        //Success  
        next: (result: any) => {
          if (result.status)
            this._notificationService.successMessage("Privilege successfully assigned", "Assigned");
          else
            this._notificationService.errorMessage("Unable to assign role privilege", "Error");
          this.getRolePrivileges();
          console.log(result);
        },
        //Error
        error: (error: any) => {
          console.log(error);
        }
      });
    }
    removeRolePrivileges(rolePrivilege: RolePrivilege) {
      this._notificationService.deleteConfirmation("Are you sure, you want to un-assign the privilege", "Un-Assign Confirmation",
        () => {
          this._roleService.removeRolePrivileges(rolePrivilege.id).subscribe({
            //Success  
            next: (result: any) => {
              if (result.status)
                this._notificationService.successMessage("Successfully un-assigned", "Un-Assigned");
              else
                this._notificationService.errorMessage("Unable to un-assign role privilege", "Error");
              this.getRolePrivileges();
              console.log(result);
            },
            //Error
            error: (error: any) => {
              console.log(error);
            }
          });
        });
    }
    manageRolePrivileges(role: Role) {
      this._rounter.navigate(['role-privileges', role.id]);
    }
  }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
    constructor(private _httpClient: HttpClient) { }
    getRoles() {
        return this._httpClient.get('https://localhost:7042/api/Role/All', this.getHeaders());
    }
    updateRole(payload: any) {
        return this._httpClient.put('https://localhost:7042/api/Role/Update', payload, this.getHeaders());
    }
    createRole(payload: any) {
        return this._httpClient.post('https://localhost:7042/api/Role/Create', payload, this.getHeaders());
    }
    deleteRole(id: number) {
        return this._httpClient.delete('https://localhost:7042/api/Role/Delete/' + id, this.getHeaders());
    }
    getRolePrivileges(roleId: number) {
        return this._httpClient.get("https://localhost:7042/api/RolePrivilege/AllRolePrivilegesByRoleId?roleId=" + `${roleId}`, this.getHeaders())
    }   
    saveRolePrivileges(rolePrivilege: any) {
        return this._httpClient.post("https://localhost:7042/api/RolePrivilege/Create", rolePrivilege, this.getHeaders());
    }
    removeRolePrivileges(id: number) {
        return this._httpClient.delete('https://localhost:7042/api/RolePrivilege/Delete/' + id, this.getHeaders());
    }
    private loginHeaders(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;',
                'Accept': 'application/json;',
            })
        };
    }
    private getHeaders(token?: string): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;',
                'Accept': 'application/json;',
                'Authorization': 'bearer ' + token
            })
        };
    }

    getStudent() {
        return this._httpClient.get('https://localhost:7042/api/Student/All', this.getHeaders());
    }
    getUser() {
        return this._httpClient.get('https://localhost:7042/api/User/All1', this.getHeaders());
    }
    deleteUser(id: number) {
        return this._httpClient.delete('https://localhost:7042/api/User/Delete/' + id, this.getHeaders());
    }
    updateUser(payload: any) {
        return this._httpClient.put('https://localhost:7042/api/User/Update', payload, this.getHeaders());
    }
    createUser(payload: any) {
        return this._httpClient.post('https://localhost:7042/api/User/Create', payload, this.getHeaders());
    }
}

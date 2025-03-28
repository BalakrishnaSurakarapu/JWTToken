import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
//  imports: [CommonModule, RouterOutlet, HttpClientModule],

  title = 'webapiclient';
  currentUser: any;
  allStudents: any = { data: [] }; 
  constructor(private _httpClient: HttpClient, private common:CommonModule) {

  }
  private loginHeaders(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;',
        'Accept': 'application/json;',
      })
    };
  }
  private getHeaders(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;',
        'Accept': 'application/json;',
        'Authorization': 'bearer ' + this.currentUser?.token
      })
    };
  }
  getJWTToken(){
    let payload = {
      "username": "Balu",
      "password": "Balu123",
      "policy": "Local"
    };

    this._httpClient.post('https://localhost:7042/api/Login', payload, this.loginHeaders()).subscribe({
      //Success  
      next: (result: any) => {
        console.log(result);
        this.currentUser = result;
      },
      //Error
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  get User(): string {
    return JSON.stringify(this.currentUser, null, 2); // Pretty Print JSON
  }
  getStudents() {
    this._httpClient.get('https://localhost:7042/api/Student/All', this.getHeaders()).subscribe({
      //Success  
      next: (result: any) => {
        this.allStudents = result;
        console.log(result);
      },
      //Error
      error: (error: any) => {
        console.log(error);
      }
    })
  }
 

  get Students(): string {
    return JSON.stringify(this.allStudents, null, 2); // Pretty Print JSON
  }
  callMicrosoft() {
    this._httpClient.get('https://localhost:7042/api/Microsoft', this.getHeaders()).subscribe({
      //Success  
      next: (result: any) => {
        this.allStudents = result;
        console.log(result);
      },
      //Error
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
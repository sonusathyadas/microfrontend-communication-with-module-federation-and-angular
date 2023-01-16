import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthLibService } from 'auth-lib';
import { UserCredential } from '../../models/user-credential';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credential: UserCredential = {
    username: "",
    password: "",
    rememberMe: false
  }

  submitted = false;

  constructor(private authSvc: AuthLibService) { }

  ngOnInit(): void {
  }

  onSubmit(frm: NgForm) {
    Object.keys(frm.controls).forEach(field => {
      const control = frm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
    if (frm.valid) {
      this.submitted = false;
      this.authSvc.login(this.credential.username, this.credential.password);
      alert("Logged in successfully")      
    }
  }

}

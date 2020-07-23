import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afsAuth: AngularFireAuth,public router: Router, public authService: AuthService) {
    this.loginForm = this.createLoginForm();
  }

  // public email: string = "";
  //
  // public pass: string = "";

  loginForm: FormGroup;

  ngOnInit() {
  }

  createLoginForm(){
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(50), Validators.pattern(emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(10)])
    })
  }


  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onLoginGoogle():void{
    this.authService.loginGoogleUser()
    .then((res)=>{
      this.onLoginRedirect();
    }).catch(err => console.log("err",err.message));

  }

  onLoginFacebook(): void{
    this.authService.loginFacebookUser()
    .then((res)=>{
      this.onLoginRedirect();
    }).catch( err => console.log("err",err.message));
  }

  onLogin(): void{
    this.authService.loginEmailUser(this.loginForm.value.email,this.loginForm.value.password)
    .then((res)=>{
      this.onLoginRedirect();
    }).catch(err => console.log("err",err.message));
  }

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }


  onLogOut(): void{
    this.authService.logoutUser();
  }



}

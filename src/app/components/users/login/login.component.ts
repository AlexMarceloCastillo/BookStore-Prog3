import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afsAuth: AngularFireAuth,public router: Router, public authService: AuthService) { }

  public email: string = "";

  public pass: string = "";

  ngOnInit() {
  }

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
    console.log(this.email);
    console.log(this.pass);
    this.authService.loginEmailUser(this.email,this.pass)
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

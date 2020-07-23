import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,private storage: AngularFireStorage) {
    this.registerForm = this.createRegisterForm();
  }

  @ViewChild('imageUser') inputImageUser: ElementRef;



  // public email: string = "";
  //
  // public pass: string = "";

  uploadPercent: Observable<number>;

  urlImage: Observable<string>;

  registerForm: FormGroup;


  ngOnInit() {
  }

  createRegisterForm(){
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(50), Validators.pattern(emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(10)])
    })
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  onUpload(e: { target: { files: any[]; }; }){
    //console.log(e,e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=> this.urlImage = ref.getDownloadURL())).subscribe();

  }

  onAddUser(){
    this.authService.registerUser(this.registerForm.value.email,this.registerForm.value.password)
    .then((res)=> {
      this.authService.isAuth().subscribe(user =>{
        if(user){
          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value,
          })
        }
        this.onLoginRedirect();
      });
    }).catch(err => console.log("err",err.message));
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

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }




}

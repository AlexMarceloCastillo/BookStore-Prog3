import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,private storage: AngularFireStorage) { 

  }

  @ViewChild('imageUser') inputImageUser: ElementRef;

  public email: string = "";

  public pass: string = "";
  
  uploadPercent: Observable<number>;
  
  urlImage: Observable<string>;


  ngOnInit() {
  }

  onUpload(e: { target: { files: any[]; }; }){
    console.log(e,e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=> this.urlImage = ref.getDownloadURL())).subscribe();

  }

  onAddUser(){
    this.authService.registerUser(this.email,this.pass)
    .then((res)=> {
      this.authService.isAuth().subscribe(user =>{
        if(user){
          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value,
          })
        }
      });
    }).catch(err => console.log("err",err.message));
    this.router.navigate(['admin/list-books']);
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

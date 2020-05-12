import { Component, OnInit } from '@angular/core';
import {DataApiService} from 'src/app/service/data-api.service';
import {BookInterface} from 'src/app/models/book';
import {NgForm} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserInterface} from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService,private authService: AuthService) { }
  public books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }


  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          //this.isAdmin = true;
        })
      }
    })
  }

  //Obtener Lista de libros
  getListBooks(){
    this.dataApi.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }

  //Borrar libro
  onDeleteBook(idBook: string){
    const confirmacion = confirm('Are you sure to delete this book?');
    if(confirmacion){
    this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface){
    this.dataApi.selectedBook = Object.assign({},book);

  }

}

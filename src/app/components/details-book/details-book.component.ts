import { Component, OnInit } from '@angular/core';
import {DataApiService} from 'src/app/service/data-api.service';
import {BookInterface} from 'src/app/models/book';
import {ActivatedRoute, Params} from '@angular/router'; 
import {AuthService} from 'src/app/service/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserInterface} from 'src/app/models/user';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute, private authService: AuthService) { }
  public book: BookInterface = {};

  ngOnInit() {
    const idBook = this.route.snapshot.params['id'];
    this.getDetails(idBook);
    
  }
  getDetails(idBook: string){
    this.dataApi.getOneBook(idBook).subscribe(book => {
      this.book = book;
      
    })
  }



}

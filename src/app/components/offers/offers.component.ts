import { Component, OnInit } from '@angular/core';
import { BookInterface } from 'src/app/models/book';
import { DataApiService } from '../../service/data-api.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  public books: BookInterface[];
  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.getOffers();
    console.log('OFERTAS', this.books);
  }


  getOffers() {
    this.dataApi.getAllBooksOffers().subscribe(offers => this.books = offers);
  }

}

import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {DataApiService} from 'src/app/service/data-api.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  }

  onSaveBook(bookForm: NgForm): void{
    //New Book
    if(bookForm.value.id == null){
    bookForm.value.userUid = this.userUid;
    this.dataApi.addBook(bookForm.value);
    }else{
      //Update Book
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }

  resetNg(bookForm: NgForm): void{
    bookForm.resetForm()
  }

}

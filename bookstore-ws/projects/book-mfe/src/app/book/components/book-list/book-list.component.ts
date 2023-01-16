import { Component, OnInit } from '@angular/core';
import {AuthLibService} from 'auth-lib';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  user?:string;

  constructor(private authSvc:AuthLibService) {
    this.user = this.authSvc.user?this.authSvc.user:"Guest";
   }

  ngOnInit(): void {
  }

}

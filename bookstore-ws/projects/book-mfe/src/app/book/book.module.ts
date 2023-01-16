import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';


@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }

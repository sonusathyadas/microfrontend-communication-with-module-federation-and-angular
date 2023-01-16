import { Component } from '@angular/core';
import { AuthLibService } from 'auth-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookstore-shell';

  constructor() {
  }
}

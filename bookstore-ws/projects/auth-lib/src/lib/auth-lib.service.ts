import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class AuthLibService {
  private userName?: string;

  public get user(): string|undefined {
    return this.userName;
  }

  constructor() {}

  public login(userName: string, password: string): void {    
    this.userName = userName;
  }
}
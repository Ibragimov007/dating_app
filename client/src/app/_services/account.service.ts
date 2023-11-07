import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_modules/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = 'https://localhost:5001/api/';

  private currenUserSource = new BehaviorSubject<User | null>(null)
  currentUser$ = this.currenUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseURL + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user',JSON.stringify(user))
          this.currenUserSource.next(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseURL + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currenUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currenUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currenUserSource.next(null);
  }
}

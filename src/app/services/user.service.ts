import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environments';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  validateToken() : Observable<boolean>  {
    const token = localStorage.getItem('token') || '';

    return this.http.get<any>(`${url}/login/refresh`,{
      headers: {
        'x-token' : token
      }
    }).pipe(
      tap(resp => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError(err => of(false))
    )
  }



  createUser(formData:RegisterForm) {
    console.log('entre al servicio');
    console.log(formData);

    return this.http.post(`${url}/users`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
        )

  }

  login(formData:any) {
    console.log('entre al servicio de login');
    console.log(formData);

    return this.http.post(`${url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
        )
  }

  googleLogin(token:string){
    console.log('entre al servicio de google login');
    console.log(token);
    return this.http.post(`${url}/login/google`, {token})
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
        )
  }

}



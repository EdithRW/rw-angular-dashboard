import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environments';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

declare const google: any;

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userInfo: User | undefined;

  constructor( private http: HttpClient, private router: Router ) {
    google.accounts.id.initialize({
      client_id: '1042821282828-q55sdvi1l1f4lqf13r85l2ibm63mtihk.apps.googleusercontent.com',
    })
  }

  logout(){
    localStorage.removeItem('token');

    if(this.userInfo?.google === true){

      google.accounts.id.revoke('edithss23@gmail.com', () => {
      this.router.navigateByUrl('/auth/login');
    });
    } else {
          this.router.navigateByUrl('/auth/login');

    }

  }

  validateToken() : Observable<boolean>  {
    const token = localStorage.getItem('token') || '';

    return this.http.get<any>(`${url}/login/refresh`,{
      headers: {
        'x-token' : token
      }
    }).pipe(
      tap(resp => {
        const {name, email, google, img, role, id} = resp.user;
        this.userInfo = new User(name, email, '', google, img, role, id);

        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError(err => {
        return of(false);
      })
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

          return this.http.post(`${url}/login/google`, {token})
          .pipe(
            tap((resp: any) => {
              localStorage.setItem('token', resp.token)
            })
            )
          }

        }



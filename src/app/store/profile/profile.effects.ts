import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { USER_GET, USER_GET_FAIL, USER_GET_SUCCESS, USER_TRY_LOGIN, USER_TRY_LOGIN_SUCCESS, USER_TRY_REGISTER, USER_TRY_REGISTER_SUCCESS } from './profile.actions';

@Injectable()
export class ProfileEffects {

  @Effect()
  userGet$ = this.actions$
    .ofType(USER_GET)
    .switchMap((action: Action) => {
      return this.http.get('/api/user', action.payload)
        .map((response: Response) => response.json())
        .catch(() => Observable.of(({ type: USER_GET_FAIL })))
        .map((response) => ({type: USER_GET_SUCCESS, payload: response}));
    });

  @Effect()
  userLogin$ = this.actions$
    .ofType(USER_TRY_LOGIN)
    .switchMap((action: Action) => {
      return this.http.post('/api/user/login', action.payload)
        .map((response: Response) => response.json())
        .catch(() => Observable.of(({ type: USER_GET_FAIL })))
        .map((response) => ({type: USER_TRY_LOGIN_SUCCESS, payload: response}));
    })

  @Effect()
  userRegister$ = this.actions$
    .ofType(USER_TRY_REGISTER)
    .switchMap((action: Action) => {
      return this.http.post('/api/user/register', action.payload)
        .map((response: Response) => response.json())
        .catch(() => Observable.of(({ type: USER_GET_FAIL })))
        .map((response) => ({type: USER_TRY_REGISTER_SUCCESS, payload: response}));
    })

  @Effect({ dispatch: false }) 
  navigateAfterLogin$ = this.actions$
    .ofType(USER_TRY_LOGIN_SUCCESS)
    .switchMap(() => {
      return this.router.navigate(['/dashboard'])
    })

  constructor(private actions$: Actions, private http: Http, public router: Router) {}
}

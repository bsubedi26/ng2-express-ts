import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FEED_ADD, FEED_REMOVE, FEED_ADD_COMMENT } from '../store/feed/feed.actions';
import { USER_TRY_LOGIN, USER_TRY_REGISTER } from '../store/profile/profile.actions';
import { IAppState } from '../store';
import { Http } from "@angular/http";


@Injectable()
export class HttpService {

  profile$: Observable<{}>;

  constructor(public http: Http, public fb: FormBuilder, public store: Store<IAppState>) {
    this.profile$ = store.select('profile');
  }

  dispatchProfileLogin(form): void {
    this.store.dispatch({
        type: USER_TRY_LOGIN,
        payload: form
    });
  }

  dispatchProfileRegister(form) {
    this.store.dispatch({
        type: USER_TRY_REGISTER,
        payload: form
    });
  }

}
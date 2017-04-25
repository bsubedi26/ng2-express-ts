import { store } from './../store/index';
import { HttpService } from './../services/HttpService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FEED_ADD, FEED_REMOVE, FEED_ADD_COMMENT } from '../store/feed/feed.actions';
import { USER_TRY_LOGIN } from '../store/profile/profile.actions';
import { IAppState } from '../store';
import { Http } from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  profile$: Observable<{}>;

  constructor(public http: Http, public fb: FormBuilder, public store: Store<IAppState>, public loginService: HttpService) {
    this.profile$ = store.select('profile');
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    // this.profile$.subscribe(response => {
    //   console.log('LOGIN RESPONSE ', response)
    // })
   
  }

  submitLogin(): void {

    if (this.form.valid) {
      this.loginService.dispatchProfileLogin(this.form.value)
      this.form.reset();
    }
  }

}

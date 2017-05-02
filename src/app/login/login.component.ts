import { SocketService } from './../services/SocketService';
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
// import * as io from 'socket.io-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  profile$: Observable<{}>;
  socket: any;

  constructor(public http: Http, public fb: FormBuilder, public store: Store<IAppState>, public loginService: HttpService, public sockSvc: SocketService) {
    this.profile$ = store.select('profile');
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    console.log("service socket ",sockSvc)
    // sockSvc.send('ellooo')

    // this.socket = io('http://localhost:8000');
    // console.log(this.socket)
    // this.socket.emit('message', 'hello')
    // let listener = Observable.of(this.socket, 'message'); 
    // listener.subscribe((payload) => { 
    //   console.log(payload); 
    // })    
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

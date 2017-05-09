import { HttpService } from '../../services/HttpService';
import { SocketService } from '../../services/SocketService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FEED_ADD, FEED_REMOVE, FEED_ADD_COMMENT } from '../../store/feed/feed.actions';
import { USER_TRY_LOGIN, USER_TRY_REGISTER } from '../../store/profile/profile.actions';
import { IAppState } from '../../store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  profile$: Observable<{}>;

  constructor(private sockSvc: SocketService,public fb: FormBuilder, public store: Store<IAppState>, public registerService: HttpService) {

    this.profile$ = store.select('profile');

    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {

  }

  submitLogin(): void {

    if (this.form.valid) {

      this.registerService.dispatchProfileRegister(this.form.value)

      this.form.reset();
    }
  }

}

import { SocketService } from './../services/SocketService';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FEED_ADD, FEED_REMOVE, FEED_ADD_COMMENT } from '../store/feed/feed.actions';
import { IAppState } from '../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  form: FormGroup;

  feeds$: Observable<{}>;
  profile$: Observable<{}>;
  test$
  constructor(public fb: FormBuilder, public store: Store<IAppState>, private sockSvc: SocketService) {

    
    this.profile$ = store.select('profile');
    this.feeds$ = store.select('feed');

    this.form = fb.group({
      text: ['', Validators.required],
      name: ['', Validators.required]
    });

    
    this.test$ = store.select(state => {
      console.log('test subscribe ', state)
      return state
    })
  }

  submitFeed(): void {

    if (this.form.valid) {

      this.store.dispatch({
        type: FEED_ADD,
        payload: this.form.value
      });

      this.form.reset();
    }
  }

  submitCommentOnFeed(id: string, commentForm: FormGroup): void {

    if (commentForm.valid) {

      this.store.dispatch({
        type: FEED_ADD_COMMENT,
        payload: {
          id,
          comment: commentForm.value
        }
      });

      commentForm.reset();
    }

  }

  removeFeed(feed: {}): void {

    this.store.dispatch({
      type: FEED_REMOVE,
      payload: feed
    });

  }
}

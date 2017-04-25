import { Observable } from 'rxjs/Observable';
import { IAppState } from './../store/index';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';


@Injectable()
export class StoreService {
  constructor(public store: Store<IAppState>) {

  }

  getProfile(): Observable<any> {
    return this.store.select('profile')
  }
}
import { Action, ActionReducer } from '@ngrx/store';
import { USER_GET_SUCCESS, USER_TRY_LOGIN_SUCCESS, USER_TRY_LOGIN, USER_GET_FAIL } from './profile.actions';

export interface IProfile {
  name: string;
  username: string;
  email: string;
  isFetching: boolean;
  
}

export const profileReducer: ActionReducer<IProfile> = (state: IProfile, action: Action): IProfile => {

  switch (action.type) {

    case USER_GET_SUCCESS:

      return Object.assign({}, state, action.payload);

    case USER_TRY_LOGIN:
      return Object.assign({}, state, {
        isFetching: true
      })

    case USER_TRY_LOGIN_SUCCESS:

      return Object.assign({}, state, {
        isFetching: false
      });

    case USER_GET_FAIL:

      return Object.assign({}, state, {
        isFetching: false
      });
      
    default:
      return state;
  }
};

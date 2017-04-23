import { Action, ActionReducer } from '@ngrx/store';
import { USER_GET_SUCCESS, USER_TRY_LOGIN_SUCCESS, USER_TRY_LOGIN, USER_GET_FAIL, USER_TRY_REGISTER_SUCCESS } from './profile.actions';

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

    case USER_TRY_REGISTER_SUCCESS:
      console.log('GET SUCCESS!')

      return Object.assign({}, state, {
        isFetching: false
      });

    case USER_GET_FAIL:

      console.log('GET FAILED!')
      return Object.assign({}, state, {
        isFetching: false
      });
      
    default:
      return state;
  }
};

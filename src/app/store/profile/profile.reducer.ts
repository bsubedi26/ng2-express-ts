import { Action, ActionReducer } from '@ngrx/store';
import { USER_TRY_REGISTER_FAIL, USER_TRY_LOGIN_FAIL, USER_GET_SUCCESS, USER_TRY_LOGIN_SUCCESS, USER_TRY_LOGIN, USER_TRY_REGISTER, USER_TRY_REGISTER_SUCCESS } from './profile.actions';

export interface IProfile {
  isFetching: boolean;
  payload: Object;
}

const initState = {
  isFetching: false,
  payload: {}
}

export const profileReducer: ActionReducer<IProfile> = (state: IProfile = initState, action: Action): IProfile => {

  switch (action.type) {

    case USER_TRY_LOGIN:
      return {
        ...state,
        isFetching: true
      }

    case USER_TRY_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        payload: action.payload
      }
    
    case USER_TRY_LOGIN_FAIL:
      console.log('LOGIN FAILED!')
      return {
        ...state,
        isFetching: false,
        payload: action.payload
      }

    case USER_TRY_REGISTER:
      return {
        ...state,
        isFetching: true
      }

    case USER_TRY_REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        payload: action.payload
      }

    case USER_TRY_REGISTER_FAIL:
      return {
        ...state,
        isFetching: false,
        payload: action.payload
      }

    default:
      return state;
  }
};

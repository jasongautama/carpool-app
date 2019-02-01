import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types'; 
export const emailChanged = (text) => {
  return {
      type: EMAIL_CHANGED,
      payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({email, password}) => {
  // as this is an async function, we can use the "dispatch" 
  //after it gets respond back
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    // not allowing user to create account
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch))
  };
}

const loginUserFail = (dispatch) => {
  dispatch({type: LOGIN_USER_FAIL});
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user});

  Actions.main(); //Router.js, key="name" --> Actions.name();
};

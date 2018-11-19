import firebase from 'firebase';
import {Actions} from 'react-native-router-flux'; //Router
import _ from 'lodash';
import {MEMBER_CREATE, 
MEMBER_UPDATE,
MEMBERS_FETCH_SUCCESS,
MEMBERS_FETCH,
MEMBER_SAVE_SUCCESS
} from './types'


// todo: CHANGE THE PATH of database ref(`/users/${currentUser.uid}/members`);

export const memberCreate = ({name, phone, address, driving}) => {
  //const {currentUser} = firebase.auth();
  
  console.log(`drive(T/F):${driving} `);

  return (dispatch) => {
    dispatch({type: MEMBER_CREATE});
    
    Actions.memberList({type: 'reset'}); //route back to memberList Scene and reset the content
    
    
    firebase.database().ref(`/users/nsc/members`)
      .push({name, phone, address, driving})
      .then(() => {
          dispatch({type: MEMBER_CREATE});
          Actions.memberList({type: 'reset'}); //route back to memberList Scene and reset the content
    
      }); //reset in order to remove back button 
    
    };

};

export const memberUpdate = ({prop, value}) => {
  
  return {
    type: MEMBER_UPDATE,
    payload: {prop, value}
  }
};

// any time new value comes, it will automatically call this function
export const membersFetch = () => {
  const {currentUser} = firebase.auth();

  return (dispatch) => {
    dispatch({type: MEMBERS_FETCH}); // change the state where it sets loading:true in MemberReducer

    firebase.database().ref(`/users/nsc/members/`)
    .on('value', snapshot => {
      dispatch({type: MEMBERS_FETCH_SUCCESS, payload: snapshot.val()});
    })
    
  }
};

export const memberSave = ({name, phone, address, driving, uid}) => {

  return(dispatch) => {
    firebase.database().ref(`/users/nsc/members/${uid}`)
      .set({name, phone, address, driving})
      .then(() => {
        dispatch({type: MEMBER_SAVE_SUCCESS})
        Actions.memberList({type: 'reset'});
      })
  }
};

export const clearMemberForm = () => {
  return(dispatch) => {
    dispatch({type: MEMBER_CREATE})
  }
}

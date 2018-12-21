import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import MemberList from './components/MemberList';
import MemberCreate from './components/MemberCreate';
import MemberEdit from './components/MemberEdit';
import NavigationForm from './components/NavigationForm';
import NavigationSummary from './components/NavigationSummary';
const RouterComponent = () => {
  return (
    /*
    change the order before deploy
    order:
      1. auth
      2. main
    */
  <Router>
    <Scene key="root" hideNavBar>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Care Group TransApp"  initial/>
      </Scene>

      <Scene key="main">
        <Scene key="memberList" 
        rightTitle="Add"
        onRight={() => Actions.memberCreate()}
        component={MemberList} 
        title="Member's List" 
        initial
        />  
        <Scene key="memberCreate"
        component={MemberCreate}
        title="Add Member" 
        />
        <Scene key="memberEdit"
        component={MemberEdit}
        title="Edit Member" 
        />
        <Scene key="navigationForm"
        component={NavigationForm}
        title="Enter Location"
        />
        <Scene key="navigationSummary"
        component={NavigationSummary}
        title="Trip Summary"
        />
      </Scene>

    </Scene>
  </Router>
  );
};

export default RouterComponent;

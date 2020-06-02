import React from 'react';
import { BrowserRouter as Router,
         Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import LoginPage from '../Login';
import UserPage from '../UserTest';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () =>  (
    <Router>
        <div>
            <Navigation />

            <hr />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
            <Route path={ROUTES.LOG_IN} component={LoginPage}/>
            <Route path={ROUTES.USER_TEST} component={UserPage}/>
        </div>
    </Router>
);
    

export default withAuthentication(App);
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router,
         Route, Redirect
} from 'react-router-dom';
import { withFirebase } from '../Firebase';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import LoginPage from '../Login';
import UserPage from '../UserTest';
import QuizPage from '../QuizExample';
import TopBar from '../TopBar'
import Feed from '../Feed';
import Dashboard from '../Dashboard';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { AuthUserContext } from '../Session';
import './app.css'
import UserHomepage from '../UserHomepage';

function App(props)  {


    const[authUser,setAuthUser] = useState([]);

    useEffect( () => {
        props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? setAuthUser({authUser})
                : setAuthUser({authUser : null});
        });

    },[])

    return(
        <div>
            <Router>
                    <div className="navigation-container">
                        <TopBar />
                    </div>
                    <div className="app-container" id = "course-prep-content">
                        <Route exact path={ROUTES.LANDING} render={()=>(
                            !AuthUserContext._currentValue ? <LandingPage/> : (<Redirect to={ROUTES.DASH}/>)
                        )} />
                        <Route path={ROUTES.DASH} render={()=>(
                            AuthUserContext._currentValue ? <Dashboard/> : (<Redirect to={ROUTES.LANDING}/>)
                        )}/>
                        <Route path={ROUTES.FEED} render={()=>(
                            AuthUserContext._currentValue ? <Feed/> : (<Redirect to={ROUTES.LANDING}/>)
                        )}/>
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                        <Route path={ROUTES.LOG_IN} component={LoginPage}/>
                        <Route path={ROUTES.QUIZ_TEST} component={QuizPage}/>
                        <Route path={ROUTES.USER_TEST} component={UserPage}/>
                        <Route path={ROUTES.USER_HOMEPAGE} component={UserHomepage}/>
                    </div>
            </Router>
        </div>
    );
    
}
    

export default withAuthentication(App);
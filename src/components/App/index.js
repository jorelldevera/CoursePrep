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
import { AuthUserContext } from '../Session'
function App(props)  {


    const[authUser,setAuthUser] = useState([]);

    useEffect( () => {
        props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? setAuthUser({authUser})
                : setAuthUser({authUser : null});
        });

    },[])

    console.log(AuthUserContext)

    if(AuthUserContext._currentValue){
        console.log("yes")
    }
    else{
        console.log("no")
    }

    return(
        <Router>
            <div>
                <div className="navigation-container">
                    <TopBar />
                </div>
                <div className="app-container">
                {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
                <Route exact path={ROUTES.LANDING} render={()=>(
                    !AuthUserContext._currentValue ? <LandingPage/> : (<Redirect to={ROUTES.DASH}/>)
                )} />
                {/* <Route path={ROUTES.DASH} component={Dashboard}/> */}
                <Route path={ROUTES.DASH} render={()=>(
                    AuthUserContext._currentValue ? <Dashboard/> : (<Redirect to={ROUTES.LANDING}/>)
                )}/>
                {/* <Route path={ROUTES.FEED} component={Feed} /> */}
                <Route path={ROUTES.FEED} render={()=>(
                    AuthUserContext._currentValue ? <Feed/> : (<Redirect to={ROUTES.LANDING}/>)
                )}/>
                <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                <Route path={ROUTES.LOG_IN} component={LoginPage}/>
                <Route path={ROUTES.QUIZ_TEST} component={QuizPage}/>
                <Route path={ROUTES.USER_TEST} component={UserPage}/>
                </div>
            </div>
        </Router>
    );
    
}
    

export default withAuthentication(App);
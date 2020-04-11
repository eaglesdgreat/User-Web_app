import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'

class MainRouter extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/singup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/user/:userId" component={Profile}/>
                </Switch>
            </div>
        )
    }
}
export default MainRouter
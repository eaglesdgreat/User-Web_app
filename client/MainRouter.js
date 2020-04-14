import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import Menu from './core/Menu'

class MainRouter extends React.Component {
    componentDidMount(){
        const jssStyles = document.getElementById('jss-server-side')
        if(jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }
    
    render() {
        return (
            <div>
                <Menu/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/singup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                    <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
                    <Route path="/user/:userId" component={Profile}/>
                </Switch>
            </div>
        )
    }
}
export default MainRouter
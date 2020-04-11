import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'

class MainRouter extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/singup" component={Signup}/>
                </Switch>
            </div>
        )
    }
}
export default MainRouter
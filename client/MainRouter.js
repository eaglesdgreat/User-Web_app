import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import User from './user/User'

class MainRouter extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/user" component={Users}/>
                </Switch>
            </div>
        )
    }
}
export default MainRouter
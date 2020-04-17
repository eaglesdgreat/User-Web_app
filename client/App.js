import React from 'react'
import {hot} from 'react-hot-loader'
import {MuiThemeProvider} from 'material-ui/styles'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import theme from './../theme'

class App extends React.Component {
    componentDidMount(){
        const jssStyles = document.getElementById('jss-server-side')
        if(jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }
    
    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <MainRouter/>
                </MuiThemeProvider>
            </BrowserRouter>
        )
    }
}

export default hot(module)(App)     
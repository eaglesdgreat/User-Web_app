import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const renderMethods = module.hot ? ReactDOM.render : ReactDOM.hydrate

renderMethods(
    <App/>,
    document.getElementById('root')
)
import React from 'react'
import auth from './auth-helpers'
import {signin} from './api-auth'
import {Redirect} from 'react-router-dom'
import Card, {CardContent, CardActions} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from  'material-ui/Button'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'

const styles = theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2
    }
})

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            redirectToReferer: false
        }
        this.clickSubmit = this.clickSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    clickSubmit() {
        const user = {
            email: this.state.email || undefined,
            password: this.state.password || undefined
        }
        
        signin(user).then((data) => {
            if(!data) {
                this.setState({error: true})
            }else{
                auth.authenticate(data, () => {
                    this.setState({redirectToReferer: true})
                })
            }
        })
    }

    handleChange(event) {
        this.setState({[name]: event.target.value});
    }

    // handleChange(event) {
    //     this.setState({[name]: event.target.value});
    // }

    render() {
        const {classes} = this.props
        const {from} = this.props.location.state || {from: {pathname: '/'}}
        const {redirectToReferer} = this.state
        if(redirectToReferer) {
            return (<Redirect to={from}/>)
        }
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h1" className={classes.title}>Sign In</Typography>
                        <TextField id="email" label="Email" type="email" value={this.state.email} onChange={this.handleChange}
                            className={classes.textField} margin="normal"/><br/>
                        <TextField id="password" label="Password" type="password" value={this.state.password} onChange={this.handleChange}
                            className={classes.textField} margin="normal"/><br/>
                        {this.state.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                        </Typography> )}
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        )
    }
}

Signin.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signin)
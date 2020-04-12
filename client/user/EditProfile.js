import React from 'react'
import {read, update} from './api-user'
import auth from './../auth/auth-helpers'
import {Redirect} from 'react-router-dom'
import Card, {CardContent, CardActions} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import {wiyhStyles} from 'material-ui/styles'
import { withStyles } from 'material-ui'

const styles = theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2
    },
    title: {
      margin: theme.spacing.unit * 2,
      color: theme.palette.protectedTitle
    },
    error: {
      verticalAlign: 'middle'
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

class EditProfile extends React.Component {
    constructor(props, {match}) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            redirectToProfile: false,
            error: '',
        }
        this.match = match
        this.clickSubmit = this.clickSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const jwt = auth.isAuthenticated()
        read({
            userId: this.match.params.userId
        }, {t: jwt.token}).then((data) => {
            if(data.error) {
                this.setState({error: data.error})
            }else {
                this.setState({
                    name: data.name,
                    email: data.email
                })
            }
        })
    }

    clickSubmit() {
        const jwt = auth.isAuthenticated()
        const user = {
            name: this.state.name || undefined,
            email: this.state.email || undefined,
            password: this.state.password || undefined
        }
        update({
            userId: this.match.params.userId
        }, {t: jwt.token}, user).then((data) => {
            if(data.error) {
                this.setState({error: data.error})
            }else{
                this.setState({
                    userId: data._id,
                    redirectToProfile: true
                })
            }
        })
    }

    handleChange(event) {
        const {value} = event.target
        this.setState({[name]: value})
    }

    render() {
        const {classes} = this.props
        const {redirectToProfile} = this.state
        if(redirectToProfile) {
            return (<Redirect to={'/user/' + this.state.userId}/>)
        }
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h2" className={classes.title}>Edit Profile</Typography>
                        <TextField id="name" label="Name" className={classes.textField} onChange={this.handleChange('name')} margin="normal"/><br/>
                        <TextField id="email" type="email" label="Email" className={classes.textField} onChange={this.handleChange('email')} margin="normal"/><br/>
                        <TextField id="password" type="password" label="Password" className={classes.textField} onChange={this.handleChange('password')}
                            margin="normal"/><br/>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="raised" className={classes.submit} onClick={this.clickSubmit}>Submit</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

EditProfile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)
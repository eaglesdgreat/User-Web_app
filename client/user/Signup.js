import React from 'react'
import {create} from './api-user'
import {withStyles} from 'material-ui'
import Card, {CardContent, CardActions} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import Dialog, {DialogTitle, DialogContent, DialogContentText, DialogActions} from 'material-ui/Dialog'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const styles = theme => ({
    card: {
        maxWidth: 600,
        textAlign: 'center',
        margin: 'auto',
        marginTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 2
    },
    error: {
        verticalAllign: 'middle'
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

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            erorr: '',
            open: false
        }
        this.handleChange = this.handleChange.bind(this)
        // this.handleChange = this.handleChangeEmail.bind(this)
        // this.handleChange = this.handleChangePassword.bind(this)
        this.clickSubmit = this.clickSubmit.bind(this)
    }
    
    clickSubmit() {
        const user = {
            name: this.state.name || undefined,
            password: this.state.password || undefined,
            email: this.state.email || undefined
        }
        
        create(user).then((data) => {
            if(data.error) {
                this.setState({error: data.error})
            }else{
                this.setState({error: '', open: true})
            }
        })
    }

    handleChange(event) {
        this.setState({[name]: event.target.value})
    }

    // handleChange(event) {
    //     this.setState({[name]: event.target.value})
    // }

    // handleChange(event) {
    //     this.setState({[name]: event.target.value})
    // }

    render() {
        const {classes} = this.props 
        const {name, email, password, error, open} = this.state
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h1" className={classes.title}>Sign Up</Typography>
                            <TextField id="name" label="Name" className={classes.textField} value={name} onChange={this.handleChange}
                                margin="normal"/><br/>
                            <TextField id="email" label="Email" type="email" className={classes.textField} value={email}
                                onChange={this.handleChange} margin="normal"/><br/>
                            <TextField id="password" label="Password" type="password" className={classes.textField} value={password}
                                onChange={this.handleChange} margin="normal"/><br/>
                            {this.state.error && ( <Typography component="p" color="error">
                                <Icon color="error" className={classes.error}>error</Icon>
                                {error}
                            </Typography>)}
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
                    </CardActions>
                </Card>
                <Dialog open={open} disableBackDropClick={true}>
                    <DialogTitle>New Account</DialogTitle>
                    <DialogContent>
                        <DialogContentText>New Account Successfully Created</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/signin">
                            <Button color="primary" autoFocus="autoFocus" variant="raised">Sign In</Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)
import React from 'react'
import auth from './../auth/auth-helpers'
import {read} from './api-user'
import {Redirect, Link} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction} from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Person from 'material-ui-icons/Person'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui-icons/Edit'
import DeleteUser from './DeleteUser'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 5
    }),
    title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.protectedTitle
    }
  })

class Profile extends React.Component {
    constructor({match}, props) {
        super(props)
        this.state = {
            user: '',
            redirectToSignIn: false
        }
        this.match = match
        this.init = this.init.bind(this)
    }

    init(userId) {
        const jwt = auth.isAuthenticated()
        read({userId: userId}, {t: jwt.token}).then((data) => {
            if(data.error) {
                this.setState({redirectToSignIn: true})
            }else{
                this.setState({user: data})
            }
        })
    }

    componentWillReceiveProps(props) {
        this.init(props.match.params.userId)
    }

    componentDidMount() {
        this.init(this.match.params.userId)
    }

    render() {
        const {classes} = this.props
        const {redirectToSignIn} = this.state
        if(redirectToSignIn) {
            return (<Redirect to="/signin"/>)
        }
        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                    <Typography type="title" className={classes.title}>Profile</Typography>
                    <List dense>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={this.state.user.name} secondary={this.state.user.email}/>{
                                auth.isAuthenticated().user && auth.isAuthenticated().user._id == this.state.user._id && (
                                    <ListItemSecondaryAction>
                                        <Link to={"/user/edit" + this.state.user._id}>
                                            <IconButton color="primary">
                                                <Edit/>
                                            </IconButton>
                                        </Link>
                                        <DeleteUser userId={this.state.user._id}/>
                                    </ListItemSecondaryAction>
                                )
                            }
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary={"Joined: " + (new Date(this.state.user.created)).toDateString()}/>
                        </ListItem>
                    </List>
                </Paper>
            </div>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
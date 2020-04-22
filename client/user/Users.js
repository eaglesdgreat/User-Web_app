import React from 'react'
import {list} from './api-user'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction} from 'material-ui/List'
import Typography from 'material-ui/Typography'
import {Link} from 'react-router-dom'
import { Avatar } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Person from 'material-ui-icons/Person'
import IconButton from 'material-ui/IconButton'
import ArrowForword from 'material-ui-icons/ArrowForward'
import PropTypes from 'prop-types'

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing.unit,
        margin: theme.spacing.unit * 5
    }),
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
        color: theme.palette.openTitle
    }
})

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {users: []}
    }
    componentDidMount() {
        list().then((data) => {
            if(data.error) {
                console.log(data.error)
            }else {
                this.setState({users: data})
            }
        })
    }
    render() {
        const {users} = this.state
        const {classes} = this.props
        return (
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>All Users</Typography>
                <List dense>
                    {users.map(function (item, i) {
                        <Link to={"/user/" + item._id} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name}/>
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForword/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    })}
                </List>
            </Paper>
        )
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Users)
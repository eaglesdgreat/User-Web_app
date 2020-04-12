import React from 'react'
import auth from './../auth/auth-helpers'
import {remove} from './api-user'
import {signout} from './../auth/api-auth'
import {Redirect} from 'react-router-dom'
import IconButton from 'material-ui/IconButton' 
import DeleteIcon from 'material-ui-icons/Delete'
import Dialog, {DialogTitle, DialogContent, DialogContentText, DialogActions} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'

class DeleteUser extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            redirect: false,
            open: false
        }
        this.clickButton = this.clickButton.bind(this)
        this.handleRequestClose = this.handleRequestClose.bind(this)
    }

    clickButton() {
        this.setState({open: true})
    }

    handleRequestClose() {
        this.setState({open: false})
    }

    deleteAccount() {
        const jwt = auth.isAuthenticated()
        remove({userId: this.props.userId}, {t:jwt.token}).then((data) => {
            if(data.error) {
                console.log(data.error)
            }else{
                signout(() => console.log('deleted'))
                this.setState({redirect: true})
            }
        })
    }

    render() {
        const {redirect} = this.state
        if(redirect) {
            return (<Redirect to="/"/>)
        }
        return (
            <span>
                <IconButton arial-label="Delete" onClick={this.clickButton} color="secondary">
                    <DeleteIcon/>
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleRequestClose}>
                    <DialogTitle>{"Delete Account"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Confirm To Delete Your Account</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">Cancel</Button>
                        <Button onClick={this.deleteAccount} color="secondary">Confirm</Button>
                    </DialogActions>
                </Dialog>
            </span>
        )
    }
}

DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
}

export default DeleteUser
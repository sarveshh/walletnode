import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
const CustomSnackbar = ({ open, setOpen, content }) => {
    const classes = useStyles()
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity={"success"} elevation={6} variant="filled">
                    {content}
                </MuiAlert>
            </Snackbar>
        </div >
    )
}

export default CustomSnackbar

import React, { useRef, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../../../context/AuthContext'
import PageTitle from '../../layout/pagetitle';
import logo from '../../../assets/download.png'
import { Select, MenuItem, FormHelperText } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { auth, storage } from '../../../firebase';
import Snackbar from '../../snackbar'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: "none"
    },
    imageContainer: {
        maxWidth: "250px",
        maxHeight: "250px",
        position: "relative",
    },
    hideInput: {
        display: "none",
    },
    customFileUpload: {
        border: "none",
        cursor: "pointer",
        position: "absolute",
        display: "block",
        lineHeight: "inherit",
        top: "%",
        left: "50%"
    },
    opacity: {
        opacity: "0.2"
    },

}));

export default function UpdateProfile() {
    const classes = useStyles();
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [isHovered, setHover] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("")
    const [progress, setProgress] = useState(0)


    function verifyEmail(e) {
        e.preventDefault()
        auth.currentUser.sendEmailVerification()
        setOpen(true)
    }


    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError("Failed to update account detailss")
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    // `${currentUser.uid}/profilePicture/${image.name}`
    const handleUpload = () => {
        const uploadTask = storage.ref(`${currentUser.uid}/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            error => { console.log(error) },
            () => {
                storage.ref(currentUser.uid)
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        setUrl(url);
                    })
            }
        )
    }

    useEffect(() => {
        storage.ref(currentUser.uid)
            .listAll().then(function (result) {
                result.items.forEach(function (imageRef) {
                    imageRef
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            setUrl(url);
                        })
                })
            })
    }, [])

    return (
        <Container component="main">
            <CssBaseline />
            <Snackbar open={open} setOpen={setOpen} content="Please check your registered email" />
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <PageTitle title="Update Profile" />
                <Link to="/app/dashboard" variant="body2" className={classes.link}>
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                    >
                        Go Back
                    </Button>
                </Link>
            </Box>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Box display="flex" justifyContent="space-around">
                    <Box className={classes.imageContainer} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} display="flex" justifyContent="center" flexDirection="column">
                        <img src={url ? url : logo} className={classes.avatarImage, isHovered == true ? classes.opacity : null} />
                        {isHovered && (
                            <>
                                <label htmlFor="file-upload" className={classes.customFileUpload}><EditIcon /></label>
                                <input id="file-upload" type="file" className={classes.hideInput} onChange={handleChange} />
                            </>
                        )}
                        <progress value={progress} max="100" />
                        <Button onClick={handleUpload}>Upload</Button>

                    </Box>
                    <Box mr={4}>
                        <Box mb={1}>
                            <Typography color="textSecondary">Name</Typography>
                            <TextField
                                variant="standard"
                                id="name"
                                name="name"
                                autoComplete="Name"
                                defaultValue={currentUser.displayName}
                                InputProps={{ disableUnderline: true }}
                                disabled
                            />
                            <Button
                                color="primary"
                                startIcon={<EditIcon />}
                            >
                                Edit
                            </Button>
                        </Box>
                        <Box mb={1}>
                            <Typography color="textSecondary">Email Address</Typography>
                            <Box display="flex" alignItems="flex-start">
                                <TextField
                                    variant="standard"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    defaultValue={currentUser.email}
                                    inputRef={emailRef}
                                    InputProps={{ disableUnderline: true }}
                                    disabled
                                />
                                {currentUser.emailVerified == false ?
                                    <Button
                                        color="secondary"
                                        startIcon={<CheckCircleRoundedIcon />}
                                        onClick={verifyEmail}
                                    >
                                        Verify
                                    </Button> : null
                                }
                                <Button
                                    color="primary"
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Typography color="textSecondary">Your Currency</Typography>
                        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper">
                            <MenuItem>Dollar</MenuItem>
                        </Select>
                        <FormHelperText>for new expenses only</FormHelperText>
                    </Box>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={passwordRef}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                            inputRef={confirmPasswordRef}
                        />
                    </Grid>
                </Grid>
                {error && <p>{error}</p>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                >
                    Update Password
                </Button>
            </form>
            <Box mt={2}>
                <Copyright />
            </Box>
            {/* 
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
             */}
        </Container>
    );
}
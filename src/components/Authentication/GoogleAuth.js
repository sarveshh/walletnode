import React from 'react'
import { googleProvider, socialMediaAuth } from '../../firebase'
import { FcGoogle } from 'react-icons/fc'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { IconContext } from "react-icons";

const GoogleAuth = ({ loading }) => {
    const history = useHistory()
    const handleGooogleAuth = async (provider) => {
        await socialMediaAuth(provider)
        history.push("/app/dashboard")
    }
    return (
        <Button fullWidth
            variant="contained"
            color="inherit"
            onClick={() => handleGooogleAuth(googleProvider)}
            disabled={loading}>
            <IconContext.Provider value={{ size: "2.3em", style: { marginRight: "10px" } }}>
                <FcGoogle />
            </IconContext.Provider>
            Sign Up with google
        </Button >
    )
}

export default GoogleAuth

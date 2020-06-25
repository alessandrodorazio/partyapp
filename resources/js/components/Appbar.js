import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";
import constants from "../constants/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const Appbar = ({ logged, setLogged, setOpenAuth }) => {
    const classes = useStyles();
    const history = useHistory();

    const logout = async () => {
        const logoutRequest = {
            url: APIs.auth.logout,
            method: "POST"
        };
        const logout = await fetchApi(logoutRequest);

        localStorage.removeItem(constants.TOKEN);
        setLogged(false);
        history.push("/");
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Party App
                    </Typography>
                    {logged ? (
                        <Fragment>
                            <Button color="inherit" onClick={() => history.push("/profile")}>
                                <Typography>Profilo</Typography>
                            </Button>
                            <Button color="inherit" onClick={logout}>
                                <Typography>Logout</Typography>
                            </Button>
                        </Fragment>
                    ) : (
                        <Button color="inherit" onClick={() => setOpenAuth(true)}>
                            <Typography>Login/Registrati</Typography>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Appbar;

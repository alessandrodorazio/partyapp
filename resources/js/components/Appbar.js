import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";
import constants from "../constants/constants";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        color: "white !important",
        flexGrow: 1,
        textDecoration: "none",
        "&:visited, &:active": {
            color: "white"
        }
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
                    <Typography variant="h6" className={classes.title}>
                        <a href="/" className={classes.title}>
                            Party App
                        </a>
                    </Typography>
                    {logged ? (
                        <div>
                            <Button color="inherit" onClick={() => history.push("/profile")}>
                                <Typography>
                                    <AccountCircleIcon />
                                </Typography>
                            </Button>
                            <Button color="inherit" onClick={logout}>
                                <Typography>
                                    <ExitToApp />
                                </Typography>
                            </Button>
                        </div>
                    ) : (
                        <Button color="inherit" onClick={() => setOpenAuth(true)}>
                            <Typography>
                                <AccountCircleIcon />
                            </Typography>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Appbar;

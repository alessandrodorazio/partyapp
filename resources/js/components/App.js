import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../views/Home";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "../../app.css";
import Profile from "../views/Profile";

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

function App(props) {
    const classes = useStyles();

    const [openAuth, setOpenAuth] = useState(false);

    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Party App
                        </Typography>
                        <Button color="inherit" onClick={() => setOpenAuth(true)}>
                            <Typography>Login</Typography>
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
            <Switch>
                <Route exact path="/" render={() => <Home openAuth={openAuth} setOpenAuth={setOpenAuth} />} />
                <Route exact path="/profile" component={Profile} />
            </Switch>
        </Router>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}

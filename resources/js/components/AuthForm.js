import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";
import constants from "../constants/constants";
import { InputAdornment, FormControl, InputLabel, Grid } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CancelIcon from "@material-ui/icons/Cancel";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LockIcon from "@material-ui/icons/Lock";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { red } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500
    },
    bigInput: {
        marginTop: "20px",
        marginBottom: "20px",
        width: "100%"
    },
    dialogContent: {
        paddingTop: 0,
        background: red
    }
}));

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

const AuthForm = ({ open, setOpen, toProfile, setLogged }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const register = async () => {
        const body = {
            username: username,
            email: email,
            password: password
        };

        const response = await fetchApi({
            url: APIs.auth.register,
            method: "POST",
            body: body
        });

        if (response.ok) {
            localStorage.setItem(constants.TOKEN, response.body.access_token);
            setLogged(true);
            toProfile();
            alert("registrazione effettuata con successo");
        } else {
            alert("si è verificato un problema durante la registrazione");
        }

        handleClose();
    };

    const login = async () => {
        const body = {
            email: email,
            password: password
        };

        const response = await fetchApi({
            url: APIs.auth.login,
            method: "POST",
            body: body
        });

        if (response.ok) {
            localStorage.setItem(constants.TOKEN, response.body.access_token);
            setLogged(true);
            toProfile();
        } else {
            alert("si è verificato un problema durante il login");
        }

        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent style={{ borderRadius: "10px", paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
                <div className={classes.root}>
                    <AppBar position="static" color="default" style={{ borderRadius: "10px 10px 0 0" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Login" {...a11yProps(0)} />
                            <Tab label="Registrati" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <div className="create-party-container">
                                <TextField
                                    id="outlined-basic"
                                    label="E-mail"
                                    placeholder="La tua e-mail"
                                    variant="outlined"
                                    type={"email"}
                                    value={email}
                                    className={classes.bigInput}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    fullWidth
                                />

                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    placeholder={"La tua password"}
                                    variant="outlined"
                                    type="password"
                                    value={password}
                                    className={classes.bigInput}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    fullWidth
                                />
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <div className="create-party-container">
                                <TextField
                                    id="outlined-basic"
                                    label="Username"
                                    placeholder="Scegli il tuo nickname!"
                                    variant="outlined"
                                    className={classes.bigInput}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AssignmentIndIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    fullWidth
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="E-mail"
                                    placeholder="Qual è la tua migliore email?"
                                    variant="outlined"
                                    className={classes.bigInput}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    fullWidth
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    placeholder="scegli una password"
                                    variant="outlined"
                                    type="password"
                                    className={classes.bigInput}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    fullWidth
                                />
                            </div>
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </DialogContent>
            <DialogActions>
                <Grid container>
                    <Grid item xs={6}>
                        <Button onClick={handleClose} color="primary">
                            <CancelIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "right" }}>
                        {value === 0 ? (
                            <Button onClick={login} color="primary" autoFocus>
                                <VpnKeyIcon />
                            </Button>
                        ) : (
                            <Button onClick={register} color="primary" autoFocus>
                                <PersonAddIcon />
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default AuthForm;

import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import UserList from "./userList";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";

const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;

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
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        height: 500
    }
}));

const FollowBox = () => {
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [users, setUsers] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    useEffect(() => {
        if (value === 0) {
            return;
        }
        (async () => {
            const userRequest = {
                url: value === 1 ? APIs.users.following : APIs.users.followers,
                method: "GET",
                csrf: csrfToken
            };
            const userResponse = await fetchApi(userRequest);
            console.log(userResponse.body);
            if (userResponse.ok) {
                setUsers(userResponse.body.users);
            } else {
                alert(userResponse.status);
            }
        })();
    }, [value]);

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Cerca utenti" {...a11yProps(0)} />
                    <Tab label="Seguiti" {...a11yProps(1)} />
                    <Tab label="Seguaci" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log("adsadas");
                        }}
                    >
                        <TextField
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            label="cerca un utente"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment component={"div"} position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <UserList users={users} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <UserList users={users} />
                </TabPanel>
            </SwipeableViews>
        </div>
    );
};

export default FollowBox;

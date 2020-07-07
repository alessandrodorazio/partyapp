import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import { fetchApi } from "../utilities/functions";
import { APIs } from "../constants/requests";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        color: "white"
    }
}));

const UserList = ({ value, searched }) => {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers([]);
        if (value === 0 && searched && searched[0]) {
            setUsers(searched);
            return;
        } else if (value === 0) {
            return;
        }
        (async () => {
            const userRequest = {
                url: value === 1 ? APIs.users.following : APIs.users.followers,
                method: "GET"
            };
            const userResponse = await fetchApi(userRequest);
            if (!userResponse.ok) {
                alert(userResponse.status);
                return;
            }
            setUsers(userResponse.body.following.data);
        })();
    }, [value, searched]);

    useEffect(() => {
        if (value === 1 && users && users[0]) {
            let check = [];
            users.forEach((u) => check.push(u.id));
            setChecked(check);
        }
    }, [users]);

    console.log("render");

    const handleToggle = (value) => async () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            const body = {
                following: value
            };
            const request = {
                url: `${APIs.users.follows}`,
                method: "POST",
                body: body
            };
            const response = await fetchApi(request);
            newChecked.push(value);
        } else {
            const request = {
                url: `${APIs.users.follows}`,
                method: "DELETE"
            };
            const response = await fetchApi(request);
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List className={classes.root}>
            {users &&
                users[0] &&
                users.map((u) => (
                    <ListItem key={u.id} divider={true}>
                        <ListItemText id={"switch-list-label-" + u.id} primary={u.email} />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                onChange={handleToggle(u.id)}
                                checked={checked.indexOf(u.id) !== -1}
                                inputProps={{ "aria-labelledby": "switch-list-label-" + u.id }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
        </List>
    );
};

export default UserList;

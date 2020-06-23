import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import { fetchApi } from "../utilities/functions";
import { APIs } from "../constants/requests";

const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

const UserList = ({ value, searched }) => {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers([]);
        if (value === 0 && searched[0]) {
            console.log("ciao");
            setUsers(searched);
            return;
        } else if (value === 0) {
            return;
        }
        (async () => {
            const userRequest = {
                url: value === 1 ? APIs.users.following : APIs.users.followers,
                method: "GET",
                csrf: csrfToken
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
        if (value === 1 && users[0]) {
            let check = [];
            users.forEach((u) => check.push(u.id));
            setChecked(check);
        }
    }, [users]);

    console.log("render");

    const handleToggle = (value) => () => {
        console.log(value);
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List className={classes.root}>
            {users[0] &&
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

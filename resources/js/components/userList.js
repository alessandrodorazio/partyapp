import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

const UserList = ({ users }) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const handleToggle = (value) => () => {
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
            {users &&
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

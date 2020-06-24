import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper
    }
}));

const RenderRow = ({ index, style, items }) => {
    const item = items[index];

    return (
        <ListItem button style={style} key={item.user_id}>
            <ListItemText primary={item.username} />
        </ListItem>
    );
};

const PartyUsersList = ({ users }) => {
    const classes = useStyles();

    return (
        <Fragment>
            {users && (
                <div className={classes.root}>
                    <FixedSizeList
                        height={users.length < 4 ? users.length * 46 : 184}
                        width={300}
                        itemSize={46}
                        className="list"
                        itemCount={users.length}
                    >
                        {(props) => <RenderRow {...props} items={users} />}
                    </FixedSizeList>
                </div>
            )}
        </Fragment>
    );
};

export default PartyUsersList;

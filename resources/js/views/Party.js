import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Player from "../components/Player";

const users = [
    {
        user_id: 0,
        username: "nome0"
    },
    {
        user_id: 1,
        username: "nome1"
    },
    {
        user_id: 2,
        username: "nome2"
    },
    {
        user_id: 3,
        username: "nome3"
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
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
const Party = () => {
    const classes = useStyles();
    const { partyId } = useParams();

    //const [users, setUsers] = useState([]);

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
            <Player />
        </div>
    );
};

export default Party;

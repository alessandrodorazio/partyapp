import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Player from "../components/Player";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";

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
    const [users, setUsers] = useState([]);
    const [playlist, setPlaylist] = useState({});
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        (async () => {
            const participantsRequest = {
                url: `${APIs.parties.all}/${partyId}`,
                method: "GET"
            };

            const participantsResponse = await fetchApi(participantsRequest);

            const playlistRequest = {
                url: `${APIs.playlists.all}/${participantsResponse.body.party.playlist_id}`
            };

            const playlistResponse = await fetchApi(playlistRequest);

            setPlaylist(playlistResponse.body.playlist);
            setSongs(playlistResponse.body.songs);

            setUsers(participantsResponse.body.participants);
        })();
    }, [partyId]);

    useEffect(() => console.log(users.length * 46), [users]);

    //const [users, setUsers] = useState([]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: users.length < 4 ? users.length * 46 : 184
            }}
        >
            {users[0] && (
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

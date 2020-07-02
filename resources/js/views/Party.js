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
    const [queue, setQueue] = useState([]);
    const [startAt, setStartAt] = useState();

    const getStartTime = (startedAt) => {
        const timeArray = Array.from(startedAt);
        const minutes = parseInt(timeArray[3] + timeArray[4], 10);
        const seconds = parseInt(timeArray[6] + timeArray[7], 10);
        const date = Array.from(new Date().toLocaleTimeString());
        const minutesNow = parseInt(`${date[3] + date[4]}`, 10);
        const secondsNow = parseInt(`${date[6] + date[7]}`, 10);

        return (minutesNow - minutes) * 60 + (secondsNow - seconds);
    };

    useEffect(() => {
        (async () => {
            const participantsRequest = {
                url: `${APIs.parties.all}/${partyId}`,
                method: "GET"
            };

            const participantsResponse = await fetchApi(participantsRequest);

            const playlistRequest = {
                url: `${APIs.playlists.all}/${participantsResponse.body.party.playlist_id}`,
                method: "GET"
            };

            const playlistResponse = await fetchApi(playlistRequest);

            const queueRequest = {
                url: `${APIs.parties.all}/${partyId}/queue`,
                method: "GET"
            };

            const queueResponse = await fetchApi(queueRequest);

            if (queueResponse.ok) {
                if (queueResponse.body.previousSong && queueResponse.nextSong) {
                    setQueue([queueResponse.body.previousSong, queueResponse.body.nextSong]);
                } else {
                    setQueue([queueResponse.body.previousSong]);
                }
            }

            setPlaylist(playlistResponse.body.playlist);

            setUsers(participantsResponse.body.participants);
        })();
    }, [partyId]);

    useEffect(() => {
        const regexp = /[0-9]{2}:[0-9]{2}:[0-9]{2}/;
        if (queue && queue[0]) {
            let time = queue[0].pivot.start.match(regexp)[0];
            setStartAt(getStartTime(time));
        }
    }, [queue]);

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
            {queue[0] && (
                <Player song={queue[0].link.replace("https://www.youtube.com/watch?v=", "")} startAt={startAt} />
            )}
        </div>
    );
};

export default Party;

import React, { useState, Fragment, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PartyCard from "../components/partyCard";
import PartyDialogForm from "../components/partyDialogForm";
import PlaylistDialogForm from "../components/playlistDialogForm";
import { fetchApi } from "../utilities/functions";
import { APIs } from "../constants/requests";
import PlaylistList from "../components/playlistList";

const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch"
        }
    },
    addPartyButton: {
        marginTop: 15
    }
}));

const Profile = () => {
    const classes = useStyles();
    const [openParty, setOpenParty] = useState(false);
    const [openPlaylist, setOpenPlaylist] = useState(false);
    const [playlist, setPlaylist] = useState({});
    const [state, setState] = useState({
        moods: [],
        parties: [],
        playlists: []
    });

    useEffect(() => {
        (async () => {
            const moodRequest = {
                url: APIs.moods,
                method: "GET",
                csrf: csrfToken
            };
            const moodResponse = await fetchApi(moodRequest);

            const partyRequest = {
                url: APIs.parties,
                method: "GET",
                csrf: csrfToken
            };
            const partyResponse = await fetchApi(partyRequest);

            const playlistRequest = {
                url: APIs.playlists,
                method: "GET",
                csrf: csrfToken
            };
            const playlistResponse = await fetchApi(playlistRequest);

            if (partyResponse.ok && moodResponse.ok && playlistResponse.ok) {
                setState((prevState) => {
                    return {
                        ...prevState,
                        moods: moodResponse.body.party_moods,
                        parties: partyResponse.body.parties.data,
                        playlists: playlistResponse.body.playlists.data
                    };
                });
            } else {
                alert("errore");
            }
        })();
    }, []);

    const handlePlaylistClick = (p) => {
        setPlaylist(p);
        setOpenPlaylist(true);
    };

    return (
        <Fragment>
            <div className="profile-container">
                <div className="party-panel-container">
                    <PartyCard parties={state.parties} />
                    <Button
                        variant="outlined"
                        className={classes.addPartyButton}
                        onClick={() => setOpenParty(true)}
                        color="primary"
                    >
                        Aggiungi un party
                    </Button>
                </div>
                <div className="playlist-panel-container">
                    <PlaylistList playlists={state.playlists} changePlaylistClick={handlePlaylistClick} />
                    <Button
                        variant="outlined"
                        className={classes.addPartyButton}
                        onClick={() => setOpenPlaylist(true)}
                        color="primary"
                    >
                        Aggiungi una playlist
                    </Button>
                </div>
            </div>
            <PartyDialogForm open={openParty} setOpen={setOpenParty} moods={state.moods} partyCreated={null} />
            <PlaylistDialogForm open={openPlaylist} setOpen={setOpenPlaylist} playlist={playlist} />
        </Fragment>
    );
};

export default Profile;

import React, { useState, Fragment, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PartyCard from "../components/partyCard";
import PartyDialogForm from "../components/partyDialogForm";
import PlaylistDialogForm from "../components/playlistDialogForm";
import { fetchApi } from "../utilities/functions";
import { APIs } from "../constants/requests";
import PlaylistList from "../components/playlistList";
import FollowBox from "../components/FollowBox";

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
    const [found, setFound] = useState({
        parties: true,
        playlists: true
    });
    const [partyCreated, setPartyCreated] = useState(false);
    const [playlistCreated, setPlaylistCreated] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if (partyCreated || playlistCreated || firstRender) {
            //vedi se puoi fare promise.race
            (async () => {
                const moodRequest = {
                    url: APIs.moods,
                    method: "GET",
                    csrf: csrfToken
                };
                const moodResponse = await fetchApi(moodRequest);

                if (moodResponse.ok) {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            moods: moodResponse.body.party_moods
                        };
                    });
                }

                const partyRequest = {
                    url: APIs.parties.my,
                    method: "GET",
                    csrf: csrfToken
                };
                const partyResponse = await fetchApi(partyRequest);

                if (partyResponse.ok) {
                    if (partyResponse.body.parties.data.length === 0) {
                        setFound((prevState) => {
                            return {
                                ...prevState,
                                parties: false
                            };
                        });
                    } else {
                        setState((prevState) => {
                            return {
                                ...prevState,
                                parties: partyResponse.body.parties.data
                            };
                        });
                    }
                }
                const playlistRequest = {
                    url: APIs.playlists.my,
                    method: "GET",
                    csrf: csrfToken
                };
                const playlistResponse = await fetchApi(playlistRequest);

                if (playlistResponse.ok) {
                    console.log(playlistResponse.body.playlists);
                    if (playlistResponse.body.playlists.data.length === 0) {
                        setFound((prevState) => {
                            return {
                                ...prevState,
                                playlists: false
                            };
                        });
                    } else {
                        setState((prevState) => {
                            return {
                                ...prevState,
                                playlists: playlistResponse.body.playlists.data
                            };
                        });
                    }
                }
                setPartyCreated(false);
                setPlaylistCreated(false);
            })();
            setFirstRender(false);
        }
    }, [partyCreated, playlistCreated]);

    const handlePlaylistClick = (p) => {
        setPlaylist(p);
        setOpenPlaylist(true);
    };

    return (
        <div>
            <div className="profile-container">
                <div className="party_playlist">
                    <div className="party-panel-container">
                        <PartyCard parties={state.parties} found={found.parties} />
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
                        <PlaylistList
                            playlists={state.playlists}
                            changePlaylistClick={handlePlaylistClick}
                            found={found.playlists}
                        />
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
                <FollowBox />
            </div>
            <PartyDialogForm
                open={openParty}
                setOpen={setOpenParty}
                moods={state.moods}
                playlists={state.playlists}
                setCreated={setPartyCreated}
            />
            <PlaylistDialogForm
                open={openPlaylist}
                setOpen={setOpenPlaylist}
                playlist={playlist}
                setCreated={setPlaylistCreated}
            />
        </div>
    );
};

export default Profile;

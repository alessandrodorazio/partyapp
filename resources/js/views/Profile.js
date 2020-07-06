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
import { Paper, Box, Typography, Grid, Container } from "@material-ui/core";

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
                    method: "GET"
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
                    method: "GET"
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
                    method: "GET"
                };
                const playlistResponse = await fetchApi(playlistRequest);
                if (playlistResponse.ok) {
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
        <Box pt={3}>
            <Container>
                <Grid container spacing={5}>
                    <Grid item md={4}>
                        <Paper variant={"outlined"}>
                            <Box p={3}>
                                <Typography component={"h2"} variant={"h5"}>
                                    I tuoi party
                                </Typography>
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
                            </Box>
                        </Paper>
                        <Paper variant={"outlined"} style={{ marginTop: "10px" }}>
                            <Box p={3}>
                                <Typography component={"h2"} variant={"h5"}>
                                    Le tue playlist
                                </Typography>
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
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item md={8}>
                        <FollowBox />
                    </Grid>
                </Grid>
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
            </Container>
        </Box>
    );
};

export default Profile;

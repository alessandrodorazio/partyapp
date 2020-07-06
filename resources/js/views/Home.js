import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useHistory } from "react-router-dom";
import { Container, Grid, Box, Typography, Paper, Card, CardContent, CardActions } from "@material-ui/core";
import { useState } from "react";
import PlaylistList from "../components/playlistList";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";
import LogoImg from "../images/logo.png";
const Home = ({ openAuth, setOpenAuth, setLogged }) => {
    const history = useHistory();

    const handlePlaylistClick = (p) => {
        setPlaylist(p);
        setOpenPlaylist(true);
    };

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

    useEffect(() => {
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
        })();
    }, []);

    return (
        <div>
            <AuthForm
                open={openAuth}
                setOpen={setOpenAuth}
                setLogged={setLogged}
                toProfile={() => history.push("/profile")}
            />
            <Box pt={5}>
                <Container>
                    <Grid container spacing={5}>
                        <Grid item md={2}>
                            <img src={LogoImg} width={"100%"} />
                        </Grid>
                        <Grid item md={6}>
                            <Paper>
                                <Box p={3}>
                                    <Box pb={3}>
                                        <Typography component={"h1"} variant={"h5"}>
                                            Party che stanno per iniziare
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item md={4}>
                            <Paper>
                                <Box p={3}>
                                    <Box pb={3}>
                                        <Typography component={"h2"} variant={"h5"}>
                                            Le tue playlist
                                        </Typography>
                                    </Box>
                                    <PlaylistList
                                        playlists={state.playlists}
                                        deleteIcon={false}
                                        found={found.playlists}
                                    />
                                </Box>
                            </Paper>

                            <Box pt={3}>
                                <Paper>
                                    <Box p={3}>
                                        <Box pb={3}>
                                            <Typography component={"h2"} variant={"h5"}>
                                                Le info su di te
                                            </Typography>
                                        </Box>
                                        <Typography component={"h4"} variant={"h6"}>
                                            Nome cognome
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default Home;

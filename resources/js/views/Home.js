import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useHistory } from "react-router-dom";
import { Container, Grid, Box, Typography, Paper, Card, CardContent, CardActions } from "@material-ui/core";
import { useState } from "react";
import PlaylistList from "../components/playlistList";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";
import LogoImg from "../images/logo.png";
import PartyCard from "../components/partyCard";

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
        partiesStarted: [],
        playlists: [],
        me: {}
    });
    const [found, setFound] = useState({
        parties: true,
        partiesStarted: true,
        playlists: true,
        me: false
    });

    useEffect(() => {
        (async () => {
            const partyRequest = {
                url: APIs.parties.upcomingParties,
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

            const partyStartedRequest = {
                url: APIs.parties.startedParties,
                method: "GET"
            };
            const partyStartedResponse = await fetchApi(partyStartedRequest);

            if (partyStartedResponse.ok) {
                if (partyStartedResponse.body.parties.data.length === 0) {
                    setFound((prevState) => {
                        return {
                            ...prevState,
                            partiesStarted: false
                        };
                    });
                } else {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            partiesStarted: partyStartedResponse.body.parties.data
                        };
                    });
                }
            }

            const meRequest = {
                url: APIs.auth.me,
                method: "GET"
            };
            const meResponse = await fetchApi(meRequest);

            if (meResponse.ok) {
                console.log(meResponse.body);
                setFound((prevState) => {
                    return {
                        ...prevState,
                        me: true
                    };
                });
                setState((prevState) => {
                    return {
                        ...prevState,
                        me: meResponse.body
                    };
                });
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
                                        <Box mt={3}>
                                            <PartyCard parties={state.parties} found={found.parties} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>

                            <Box mt={3}>
                                <Paper>
                                    <Box p={3}>
                                        <Box pb={3}>
                                            <Typography component={"h1"} variant={"h5"}>
                                                Party già iniziati
                                            </Typography>
                                            <Box mt={3}>
                                                <PartyCard
                                                    parties={state.partiesStarted}
                                                    found={found.partiesStarted}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>
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
                                                Le tue info
                                            </Typography>
                                        </Box>
                                        <Typography component={"h4"} variant={"h6"}>
                                            {state.me.hasOwnProperty("username")
                                                ? "Ciao, " + state.me.username
                                                : "Ciao!"}
                                        </Typography>
                                        <Typography component={"h6"} variant={"body1"}>
                                            {state.me.hasOwnProperty("title")
                                                ? "Hai " +
                                                  state.me.points +
                                                  " punti, il tuo titolo è: " +
                                                  state.me.title
                                                : ""}
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

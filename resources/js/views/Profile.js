import React, { useState, Fragment, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PartyCard from "../components/partyCard";
import DialogForm from "../components/dialogForm";
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
    const [open, setOpen] = useState(false);
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
            //bisogna implementare una api per prendere le playlist dato un utente
            // const playlistRequest = {
            //     url: APIs.playlists,
            //     method: "GET",
            //     csrf: csrfToken
            // };
            // const playlistResponse = await fetchApi(playlistRequest);
            // console.log(playlistResponse);

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

    const handleClickOpen = () => {
        console.log(state);
        setOpen(true);
    };

    const addPartyClick = () => {
        console.log("ciao");
    };

    return (
        <Fragment>
            <div className="profile-container">
                <div className="party-panel-container">
                    <PartyCard parties={state.parties} />
                    <Button
                        variant="outlined"
                        className={classes.addPartyButton}
                        onClick={handleClickOpen}
                        color="primary"
                    >
                        Aggiungi un party
                    </Button>
                </div>
                <div className="playlist-panel-container">
                    <PlaylistList playlists={state.playlists} />
                    <Button
                        variant="outlined"
                        className={classes.addPartyButton}
                        onClick={addPartyClick}
                        color="primary"
                    >
                        Aggiungi una playlist
                    </Button>
                </div>
            </div>
            <DialogForm
                open={open}
                setOpen={setOpen}
                moods={state.moods}
                partyCreated={(party) => {
                    setState((prevState) => {
                        parties = prevState.parties.push(party);
                        return {
                            ...prevState,
                            parties: parties
                        };
                    });
                }}
            />
        </Fragment>
    );
};

export default Profile;

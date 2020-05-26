import React, { useState, Fragment, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PartyCard from "../components/partyCard";
import DialogForm from "../components/dialogForm";
import { fetchApi } from "../utilities/functions";
import { APIs } from "../constants/requests";

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
        parties: []
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
            setState((prevState) => {
                return {
                    ...prevState,
                    moods: moodResponse.party_moods,
                    parties: partyResponse.parties
                };
            });
        })();
    }, []);

    const handleClickOpen = () => {
        console.log(state);
        setOpen(true);
    };

    return (
        <Fragment>
            <div className="party-panel-container">
                <PartyCard parties={state.parties} />
                <Button variant="outlined" className={classes.addPartyButton} onClick={handleClickOpen} color="primary">
                    Aggiungi un party
                </Button>
            </div>
            <DialogForm open={open} setOpen={setOpen} moods={state.moods} />
        </Fragment>
    );
};

export default Profile;

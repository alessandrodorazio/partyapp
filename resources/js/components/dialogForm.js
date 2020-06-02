import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import Slide from "@material-ui/core/Slide";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;

//array creati per simulare risposte dalle api
const playlists = [
    {
        value: "0",
        label: "Genera una playlist"
    },
    {
        value: "1",
        label: "Only despacito"
    },
    {
        value: "2",
        label: "Nightcore"
    },
    {
        value: "3",
        label: "Random"
    }
];

const useStyles = makeStyles((theme) => ({
    selector: {
        width: 300
    },
    bigInput: {
        width: "100%"
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DialogForm = ({ open, setOpen, moods, partyCreated }) => {
    const classes = useStyles();

    const [mood, setMood] = useState(0);
    const [radio, setRadio] = useState("1");
    const [playlist, setPlaylist] = useState("0");
    const [isPrivate, setIsPrivate] = useState(false);
    const [partyName, setPartyName] = useState("");
    const [canCreate, setCanCreate] = useState(false);

    useEffect(() => {
        if (partyName.trim() !== "" && mood !== 0) {
            setCanCreate(true);
        } else {
            setCanCreate(false);
        }
    }, [mood, partyName]);

    const handlePartyNameChange = (event) => {
        setPartyName(event.target.value);
    };

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    };

    const handlePlaylistChange = (event) => {
        setPlaylist(event.target.value);
    };

    const handleRadioChange = (event) => {
        setRadio(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePrivateChange = (event) => {
        setIsPrivate(event.target.checked);
    };

    const submitParty = async () => {
        const body = {
            name: partyName,
            party_type: parseInt(radio, 10),
            private_party: isPrivate ? 1 : 0,
            owner_id: 1,
            mood_id: mood
        };

        const response = await fetchApi({
            url: APIs.parties,
            method: "POST",
            csrf: csrfToken,
            body: body
        });

        if (response.ok) {
            console.log("ok");
        } else {
            alert("errore durante la creazione del party");
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            className={classes.createParty}
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle id="alert-dialog-slide-title">Nuovo party</DialogTitle>
            <DialogContent>
                <div className="create-party-container">
                    <TextField
                        id="outlined-basic"
                        label="Nome"
                        variant="outlined"
                        className={classes.bigInput}
                        value={partyName}
                        onChange={handlePartyNameChange}
                    />
                    <TextField
                        id="outlined-select-mood"
                        select
                        label="Mood"
                        value={mood}
                        onChange={handleMoodChange}
                        variant="outlined"
                        className={classes.selector}
                    >
                        <MenuItem key={0} value={0}>
                            Scegli un mood
                        </MenuItem>
                        {moods.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-select-playlist"
                        select
                        label="Playlist"
                        value={playlist}
                        onChange={handlePlaylistChange}
                        variant="outlined"
                        className={classes.selector}
                    >
                        {playlists.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <div className="party-type">
                        <FormLabel component="legend">Tipo party</FormLabel>
                        <RadioGroup name="partyType" value={radio} onChange={handleRadioChange}>
                            <FormControlLabel value="1" control={<Radio />} label="Battle" />
                            <FormControlLabel value="2" control={<Radio />} label="Democracy" />
                        </RadioGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isPrivate}
                                    onChange={handlePrivateChange}
                                    name="private"
                                    color="primary"
                                />
                            }
                            label="party privato"
                        />
                    </div>
                </div>
                <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Annulla
                </Button>
                <Button color="primary" disabled={!canCreate} onClick={submitParty}>
                    Crea
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogForm;

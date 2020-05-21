import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import { APIs } from "../constants/requests";
import * as axios from "axios";

const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;

//array creati per simulare risposte dalle api
const moods = [
    {
        value: "0",
        label: "Scegli un mood"
    },
    {
        value: "1",
        label: "70s"
    },
    {
        value: "2",
        label: "Raggaeton"
    },
    {
        value: "3",
        label: "Random"
    }
];

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
    root: {
        width: "100%",
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch"
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    addPartyButton: {
        marginTop: 15
    },
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

const Profile = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [mood, setMood] = useState("0");
    const [radio, setRadio] = useState("1");
    const [playlist, setPlaylist] = useState("0");
    const [isPrivate, setIsPrivate] = useState(false);
    const [partyName, setPartyName] = useState("");

    const handlePartyNameChange = (event) => {
        setPartyName(event.target.value);
    };

    const handlePanelChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
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

    const handleClickOpen = () => {
        setOpen(true);
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
        // const response = await fetch("http://127.0.0.1:8000/api/parties", {
        //     method: "POST",
        //     headers: { "X-CSRF-TOKEN": csrfToken, "Content-Type": "application/json" },
        //     credentials: "same-origin",
        //     body: body
        // });
        console.log(body);
    };

    return (
        <Fragment>
            <div className="party-panel-container">
                <ExpansionPanel
                    className={classes.panel}
                    expanded={expanded === "panel1"}
                    onChange={handlePanelChange("panel1")}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>Test party</Typography>
                        <Typography className={classes.secondaryHeading}>tipo party/mood</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            descrizione del party, codice di adesione, bottone per modificare il party e bottone per
                            rimuoverlo
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Button variant="outlined" className={classes.addPartyButton} onClick={handleClickOpen} color="primary">
                    Aggiungi un party
                </Button>
            </div>
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
                            {moods.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
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
                    <Button color="primary" onClick={submitParty}>
                        Crea
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default Profile;

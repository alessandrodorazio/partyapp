import React, { useState, useEffect } from "react";
import { APIs } from "../constants/requests";
import { fetchApi, convertTime } from "../utilities/functions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    songlist: {
        backgroundColor: theme.palette.background.paper
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const EditPlaylist = ({ open, setOpen, playlistId, setCreated }) => {
    const [songName, setSongName] = useState("");
    const [songs, setSongs] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        setSongName("");
        setSongs([]);
    }, [playlistId]);

    const addSong = async () => {
        const request = {
            url: APIs.songs.youtube,
            method: "POST",
            body: {
                param: songName
            }
        };

        const response = await fetchApi(request);

        if (response.ok) {
            setSongs((prev) => {
                return [...prev, response.body];
            });
            setSongName("");
        }
    };

    const handleClose = () => {
        setSongName("");
        setSongs([]);
        setOpen(false);
    };

    const submitPlaylist = async () => {
        const songsIds = songs.map((song) => song.id);

        const body = {
            songs: JSON.stringify(songsIds)
        };

        const response = await fetchApi({
            url: `${APIs.playlists.all}/${playlistId}/songs/add`,
            method: "POST",
            body: body
        });

        if (response.ok) {
            setCreated(true);
        } else {
            alert("errore durante la creazione dela playlist");
        }

        setOpen(false);
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
            <DialogTitle id="alert-dialog-slide-title">Modifica playlist</DialogTitle>
            <DialogContent>
                <div className="create-party-container">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <TextField
                            id="outlined-basic-song"
                            label="add song"
                            variant="outlined"
                            className={classes.bigInput}
                            value={songName}
                            onChange={(event) => setSongName(event.target.value)}
                        />
                        <IconButton onClick={addSong}>
                            <PlaylistAddIcon />
                        </IconButton>
                    </div>
                    <div className={classes.songlist}>
                        <List dense={false}>
                            {songs[0] &&
                                songs.map((song) => (
                                    <ListItem>
                                        <ListItemText primary={song.title} secondary={convertTime(song.duration)} />
                                    </ListItem>
                                ))}
                        </List>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Annulla
                </Button>
                <Button color="primary" onClick={submitPlaylist}>
                    Modifica
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPlaylist;

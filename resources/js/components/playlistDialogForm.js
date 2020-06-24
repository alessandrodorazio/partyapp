import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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

const PlaylistDialogForm = ({ open, setOpen, playlist, handlePlaylistClick, setCreated }) => {
    const classes = useStyles();

    const [canCreate, setCanCreate] = useState(true);
    const [genre, setGenre] = useState(-1);
    const [playlistName, setPlaylistName] = useState("");
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        (async () => {
            const genreRequest = {
                url: APIs.genres,
                method: "GET"
            };
            const genreResponse = await fetchApi(genreRequest);

            if (genreResponse.ok) {
                setGenres(genreResponse.body.genres);
            } else {
                alert("niente generi");
            }
        })();
    }, []);

    const submitPlaylist = async () => {
        const body = {
            genre_id: genre,
            name: playlistName
        };
        const response = await fetchApi({
            url: APIs.playlists.all,
            method: "POST",
            csrf: csrfToken,
            body: body
        });

        if (response.ok) {
            setCreated(true);
        } else {
            alert("errore durante la creazione dela playlist");
        }

        setOpen(false);
    };

    const handleClose = () => {
        setGenre(-1);
        setPlaylistName("");
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
                    <TextField
                        id="outlined-basic"
                        label="Nome"
                        variant="outlined"
                        className={classes.bigInput}
                        value={playlistName}
                        onChange={(event) => setPlaylistName(event.target.value)}
                    />
                    <TextField
                        id="outlined-select-mood"
                        select
                        label="Genre"
                        value={genre}
                        onChange={(event) => setGenre(event.target.value)}
                        variant="outlined"
                        className={classes.selector}
                    >
                        <MenuItem key={-1} value={-1}>
                            Scegli un genere
                        </MenuItem>
                        {genres.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Annulla
                </Button>
                <Button color="primary" disabled={!canCreate} onClick={submitPlaylist}>
                    Crea
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PlaylistDialogForm;

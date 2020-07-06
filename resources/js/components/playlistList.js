import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { ReactSVG } from "react-svg";
import IconButton from "@material-ui/core/IconButton";
import music from "../../assets/svg/music.svg";
import { Typography, Card, CardHeader, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752
    },
    demo: {
        backgroundColor: theme.palette.background.paper
    },
    title: {
        margin: theme.spacing(4, 0, 2)
    }
}));

const PlaylistList = ({ playlists, changePlaylistClick, found, deleteIcon = true }) => {
    const classes = useStyles();

    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    return (
        <div className={classes.demo}>
            {found ? (
                playlists[0] ? (
                    <List dense={dense}>
                        {playlists.map((playlist) => (
                            <Card className={classes.root} key={playlist.id}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            aria-label="recipe"
                                            onClick={() => changePlaylistClick(playlist)}
                                            style={{ background: "#" + (((1 << 24) * Math.random()) | 0).toString(16) }}
                                        >
                                            {playlist.name[0]}
                                        </Avatar>
                                    }
                                    action={
                                        deleteIcon == true ? (
                                            <IconButton aria-label="settings">
                                                <DeleteIcon />
                                            </IconButton>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    title={playlist.name}
                                    subheader={playlist.genre.name + ", " + playlist.songsCount + " canzoni totali"}
                                />
                            </Card>
                        ))}
                    </List>
                ) : (
                    <LinearProgress />
                )
            ) : (
                <Typography>Nessuna playlist trovata. Controlla se hai effettuato l'accesso!</Typography>
            )}
        </div>
    );
};

export default PlaylistList;

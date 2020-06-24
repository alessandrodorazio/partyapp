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
import { Typography } from "@material-ui/core";

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

const PlaylistList = ({ playlists, changePlaylistClick, found }) => {
    const classes = useStyles();

    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    return (
        <div className={classes.demo}>
            {found ? (
                playlists[0] ? (
                    <List dense={dense}>
                        {playlists.map((playlist) => (
                            <ListItem key={playlist.id}>
                                <ListItemAvatar>
                                    <Avatar onClick={() => changePlaylistClick(playlist)}>
                                        <ReactSVG
                                            src={music}
                                            style={{
                                                width: 25,
                                                height: 25
                                            }}
                                        />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={playlist.name + " / " + playlist.genre.name + " / " + playlist.songsCount}
                                    secondary={secondary ? "Secondary text" : null}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography style={{ backgroundColor: "#f5f5f5" }}>caricamento delle playlist</Typography>
                )
            ) : (
                <Typography style={{ backgroundColor: "#f5f5f5" }}>non hai creato playlist</Typography>
            )}
        </div>
    );
};

export default PlaylistList;
